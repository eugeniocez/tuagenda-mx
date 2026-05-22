#!/usr/bin/env node
/**
 * Regenera docs/ab-matrix/history.json y docs/ab-matrix/ab-matrix.html
 * leyendo copy desde HeroIndex.astro y performance desde el analytics dashboard.
 *
 * Uso:
 *   npm run ab:matrix               — solo sincroniza copy (analytics opcional)
 *   Con analytics corriendo en :3000 — también actualiza métricas de GA4
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const HERO_PATH = path.join(ROOT, 'src/components/HeroIndex.astro')
const HISTORY_PATH = path.join(ROOT, 'docs/ab-matrix/history.json')
const OUTPUT_PATH = path.join(ROOT, 'docs/ab-matrix/ab-matrix.html')
const AB_COPY_PATH = path.join(ROOT, '../agendallena-analytics/src/data/ab-copy.json')
// Etiquetas y ángulos canónicos por variante — actualizar al agregar nuevas
const VARIANT_META = {
  A: { label: 'control — tagline directo',                    angle: 'control' },
  B: { label: 'ángulo económico — confirmaciones auto',       angle: 'automation-benefit' },
  C: { label: 'resultado directo — agenda se confirma sola',  angle: 'automation-benefit' },
  D: { label: 'reemplazo de hábito — deja de confirmar',      angle: 'habit-replacement' },
  E: { label: 'pérdida cuantificada — 3/10 citas = $8,000',  angle: 'loss-quantified' },
  F: { label: 'peer pressure — tu competencia ya confirmó',   angle: 'social-proof-urgency' },
  G: { label: 'reframe precio — cita perdida > $199',         angle: 'price-reframe' },
  H: { label: 'challenge medible — cuenta las citas perdidas', angle: 'challenge' },
  I: { label: 'recordatorios #1 — sistema líder en México',  angle: 'authority-positioning' },
  J: { label: 'agenda siempre llena — retención de clientes', angle: 'abundance-outcome' },
  K: { label: '10x citas — elimina plantones',                angle: 'hyperbolic-outcome' },
  L: { label: 'identidad — tu agenda no falla nunca',         angle: 'identity' },
  M: { label: 'certeza — sabes exactamente quién llega',      angle: 'certainty' },
  N: { label: 'resultado financiero positivo — menos inasistencias más ingresos', angle: 'positive-financial-outcome' },
}

const ANALYTICS_URLS = process.env.ANALYTICS_PORT
  ? [`http://localhost:${process.env.ANALYTICS_PORT}/api/ab-export`]
  : [
      'http://localhost:3000/api/ab-export',
      'http://localhost:3001/api/ab-export',
      'http://localhost:3002/api/ab-export',
      'http://localhost:3003/api/ab-export',
      'https://agendallena-analytics.vercel.app/api/ab-export',
    ]

// ─── 1. Parse HeroIndex.astro ────────────────────────────────────────────────

function parseHeroVariants(src) {
  const variants = {}

  // Split by variant blocks using the comment markers or the attribute itself
  // Each block: from data-hero-variant="X"> to the next data-hero-variant or </section>
  const blockRe = /data-hero-variant="([A-Z])">([\s\S]*?)(?=\s*<\/div>\s*(?:\n\s*<!--|\n\s*<\/div>))/g
  // Simpler: split the whole file on the variant divs
  const parts = src.split(/(?=<div data-hero-variant=")/)

  for (const part of parts) {
    const letterMatch = part.match(/^<div data-hero-variant="([A-Z])"/)
    if (!letterMatch) continue
    const letter = letterMatch[1]

    // eyebrow
    const eyebrowMatch = part.match(/class="section-eyebrow[^"]*"[^>]*>\s*([^<]+)\s*</)
    const eyebrow = eyebrowMatch ? eyebrowMatch[1].trim() : ''

    // h1 — strip tags, collapse whitespace
    const h1Match = part.match(/class="hero-title"[^>]*>([\s\S]*?)<\/h1>/)
    const h1Raw = h1Match
      ? h1Match[1].replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      : ''

    // accent span
    const accentMatch = part.match(/class="accent"[^>]*>([^<]+)</)
    const h1Accent = accentMatch ? accentMatch[1].trim() : ''

    // subtitle — strip brand spans but keep text
    const subtitleMatch = part.match(/class="hero-subtitle"[^>]*>([\s\S]*?)<\/p>/)
    const subtitle = subtitleMatch
      ? subtitleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      : ''

    // CTA button — Astro formats multiline: class="..."[\n  ]>text</a[\n]>
    const ctaMatch = part.match(/class="btn btn-primary-lg([^"]*)"[\s\S]*?>\s*([^\n<]+?)\s*<\/a/)
    const ctaText = ctaMatch ? ctaMatch[2].trim() : ''
    const ctaColor = ctaMatch && ctaMatch[1].includes('btn-verde') ? 'verde' : 'default'

    // trust signals — text after </svg> in each hero-meta-item
    const trustSignals = []
    const metaItemRe = /class="hero-meta-item"[^>]*>([\s\S]*?)<\/div>/g
    let mMatch
    while ((mMatch = metaItemRe.exec(part)) !== null) {
      const item = mMatch[1]
      // Remove SVG block, then get remaining text
      const text = item.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
      if (text) trustSignals.push(text)
    }

    variants[letter] = { eyebrow, h1: h1Raw, h1Accent, subtitle, ctaText, ctaColor, trustSignals }
  }

  return variants
}

// ─── 2. Fetch GA4 performance ─────────────────────────────────────────────────

async function fetchPerformance() {
  for (const url of ANALYTICS_URLS) {
    try {
      const isRemote = url.startsWith('https')
      const res = await fetch(url, { signal: AbortSignal.timeout(isRemote ? 8000 : 3000) })
      if (!res.ok) continue
      const json = await res.json()
      if (!json.data) continue
      const source = isRemote ? 'vercel.app' : url.match(/:(\d+)\//)[1]
      console.log(`  ✔ Analytics encontrado en ${source}`)
      const perf = {}
      for (const row of json.data) {
        const letter = row.variant.split(' ')[0]
        const rate = row.assignments > 0 ? (row.ctaClicks / row.assignments) * 100 : 0
        perf[letter] = {
          assignments: row.assignments,
          ctaClicks: row.ctaClicks,
          conversionRate: Math.round(rate * 100) / 100,
          lastUpdated: json.generatedAt,
        }
      }
      return perf
    } catch {
      continue
    }
  }
  return null
}

// ─── 3. Merge history ─────────────────────────────────────────────────────────

function mergeHistory(history, parsedCopy, perfData, today) {
  const activeLetters = new Set(Object.keys(parsedCopy))

  // Update active variants with fresh copy
  for (const [letter, copy] of Object.entries(parsedCopy)) {
    if (!history[letter]) {
      const meta = VARIANT_META[letter] || { label: copy.h1.slice(0, 50), angle: 'unknown' }
      history[letter] = {
        letter,
        label: meta.label,
        angle: meta.angle,
        status: 'active',
        addedDate: today,
        killedDate: null,
        copy,
        performance: { assignments: 0, ctaClicks: 0, conversionRate: 0, lastUpdated: null },
      }
      console.log(`  ✚ Nueva variante detectada: ${letter} — ${meta.label}`)
    } else {
      // Actualizar label/angle si están en VARIANT_META y el historial tiene valores viejos
      if (VARIANT_META[letter]) {
        history[letter].label = VARIANT_META[letter].label
        history[letter].angle = VARIANT_META[letter].angle
      }
      history[letter].copy = copy
      history[letter].status = 'active'
    }
  }

  // Mark removed variants as killed
  for (const letter of Object.keys(history)) {
    if (!activeLetters.has(letter) && history[letter].status === 'active') {
      history[letter].status = 'killed'
      history[letter].killedDate = today
      console.log(`  ✖ Variante marcada como KILLED: ${letter}`)
    }
  }

  // Update performance if available
  if (perfData) {
    for (const [letter, perf] of Object.entries(perfData)) {
      if (history[letter]) {
        history[letter].performance = perf
      }
    }
    console.log(`  ✔ Performance actualizado desde GA4`)
  }

  return history
}

// ─── 4. Generate signals ──────────────────────────────────────────────────────

function generateSignals(history) {
  const active = Object.values(history).filter((v) => v.status === 'active')
  const withData = active.filter((v) => v.performance.assignments > 50)

  if (withData.length < 2) {
    return [
      'No hay suficiente tráfico todavía para detectar señales (mínimo 50 asignaciones por variante).',
      'Ejecuta <code>npm run ab:matrix</code> con el analytics corriendo para actualizar métricas.',
    ]
  }

  const sorted = [...withData].sort((a, b) => b.performance.conversionRate - a.performance.conversionRate)
  const best = sorted[0]
  const worst = sorted[sorted.length - 1]
  const control = history['A']
  const signals = []

  signals.push(
    `Variante <strong>${best.letter}</strong> lidera con <strong>${best.performance.conversionRate}%</strong> de conversión — "${best.label}".`
  )

  if (control && control.performance.assignments > 50) {
    const lift = best.performance.conversionRate - control.performance.conversionRate
    const sign = lift >= 0 ? '+' : ''
    signals.push(
      `Vs control (A): <strong>${sign}${lift.toFixed(2)}pp</strong> de diferencia.`
    )
  }

  // Angle analysis
  const byAngle = {}
  for (const v of withData) {
    if (!byAngle[v.angle]) byAngle[v.angle] = []
    byAngle[v.angle].push(v.performance.conversionRate)
  }
  const angleAvg = Object.entries(byAngle).map(([angle, rates]) => ({
    angle,
    avg: rates.reduce((a, b) => a + b, 0) / rates.length,
  })).sort((a, b) => b.avg - a.avg)

  if (angleAvg.length >= 2) {
    signals.push(
      `Ángulo con mejor promedio: <strong>${angleAvg[0].angle}</strong> (${angleAvg[0].avg.toFixed(2)}%) vs ${angleAvg[angleAvg.length - 1].angle} (${angleAvg[angleAvg.length - 1].avg.toFixed(2)}%).`
    )
  }

  signals.push(
    `Variante con menor conversión: <strong>${worst.letter}</strong> con ${worst.performance.conversionRate}% — "${worst.label}". Candidata a matar.`
  )

  return signals
}

// ─── 5. Generate HTML ─────────────────────────────────────────────────────────

function generateHTML(history, updatedAt) {
  const all = Object.values(history).sort((a, b) => a.letter.localeCompare(b.letter))
  const active = all
    .filter((v) => v.status === 'active')
    .sort((a, b) => b.performance.conversionRate - a.performance.conversionRate)
  const killed = all
    .filter((v) => v.status === 'killed')
    .sort((a, b) => b.performance.conversionRate - a.performance.conversionRate)
  const withPerf = active.filter((v) => v.performance.assignments > 0)
  const bestPerformer = withPerf.length
    ? withPerf.reduce((best, v) =>
        v.performance.conversionRate > best.performance.conversionRate ? v : best
      )
    : null
  const leaderByAssignments = withPerf.length
    ? withPerf.reduce((best, v) =>
        v.performance.assignments > best.performance.assignments ? v : best
      )
    : null
  const signals = generateSignals(history)

  const fmt = (n) => n.toLocaleString('es-MX')
  const fmtRate = (r) => (r > 0 ? `${r.toFixed(2)}%` : '—')

  function variantRow(v, isKilled = false) {
    const p = v.performance
    const isLeader = bestPerformer && v.letter === bestPerformer.letter
    const rowClass = isKilled ? 'row-killed' : isLeader ? 'row-leader' : ''

    return `
    <tr class="${rowClass}">
      <td class="cell-letter">
        <span class="variant-badge ${isKilled ? 'badge-killed' : isLeader ? 'badge-leader' : ''}">${v.letter}</span>
        ${isLeader ? '<span class="tag-leader">líder</span>' : ''}
        ${isKilled ? `<span class="tag-killed">killed ${v.killedDate ?? ''}</span>` : ''}
      </td>
      <td class="cell-angle"><span class="angle-tag">${v.angle}</span></td>
      <td class="cell-copy">${v.copy.eyebrow ? `<span class="copy-eyebrow">${esc(v.copy.eyebrow)}</span>` : '<span class="copy-empty">—</span>'}</td>
      <td class="cell-copy cell-h1">${esc(v.copy.h1)}</td>
      <td class="cell-copy">${esc(v.copy.subtitle)}</td>
      <td class="cell-cta">
        <span class="cta-pill ${v.copy.ctaColor === 'verde' ? 'cta-verde' : 'cta-default'}">${esc(v.copy.ctaText)}</span>
      </td>
      <td class="cell-trust">${v.copy.trustSignals.map((s) => `<div class="trust-item">${esc(s)}</div>`).join('')}</td>
      <td class="cell-num">${p.assignments > 0 ? fmt(p.assignments) : '—'}</td>
      <td class="cell-num">${p.ctaClicks > 0 ? fmt(p.ctaClicks) : '—'}</td>
      <td class="cell-rate ${p.conversionRate > 0 ? (isLeader ? 'rate-best' : '') : ''}">${fmtRate(p.conversionRate)}</td>
    </tr>`
  }

  function esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  }

  const tableHead = `
  <thead>
    <tr>
      <th>Variante</th>
      <th>Ángulo</th>
      <th>Eyebrow</th>
      <th>H1</th>
      <th>Subtítulo</th>
      <th>CTA</th>
      <th>Trust signals</th>
      <th>Asignaciones</th>
      <th>Clics CTA</th>
      <th>Conversión</th>
    </tr>
  </thead>`

  const lastUpdatedPerf = active.find((v) => v.performance.lastUpdated)?.performance.lastUpdated
  const perfDate = lastUpdatedPerf
    ? new Date(lastUpdatedPerf).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
    : 'nunca — ejecuta con analytics corriendo'

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Matriz A/B — agendallena</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --tinta: #0A0A0B;
      --hueso: #FAFAF7;
      --verde: #0F7B3F;
      --verde-hover: #0C6633;
      --verde-tenue: #E8F5EE;
      --verde-superficie: #245C32;
      --verde-acento: #4ADE80;
      --grafito: #6B6B6B;
      --gris-claro: #F1EFE8;
      --gris-borde: #E8E6DE;
    }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--hueso);
      color: var(--tinta);
      font-size: 14px;
      line-height: 1.5;
    }

    /* ── Header ── */
    .doc-header {
      background: var(--tinta);
      color: var(--hueso);
      padding: 32px 40px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 24px;
    }
    .doc-header-left { flex: 1; }
    .doc-eyebrow {
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--verde-acento);
      margin-bottom: 8px;
    }
    .doc-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--hueso);
      letter-spacing: -0.02em;
      line-height: 1.1;
    }
    .doc-title span { color: var(--verde-acento); }
    .doc-meta {
      font-size: 12px;
      color: rgba(250,250,247,0.5);
      margin-top: 8px;
    }
    .doc-meta strong { color: rgba(250,250,247,0.8); }
    .doc-stats {
      display: flex;
      gap: 24px;
      flex-shrink: 0;
    }
    .stat-box {
      text-align: center;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 16px 20px;
      min-width: 100px;
    }
    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: var(--hueso);
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.03em;
    }
    .stat-value.green { color: var(--verde-acento); }
    .stat-label {
      font-size: 11px;
      color: rgba(250,250,247,0.5);
      margin-top: 2px;
      font-weight: 500;
    }

    /* ── Signals ── */
    .signals-section {
      background: var(--verde-tenue);
      border-bottom: 1px solid var(--gris-borde);
      padding: 20px 40px;
    }
    .signals-heading {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--verde);
      margin-bottom: 10px;
    }
    .signals-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .signal-item {
      font-size: 13px;
      color: var(--tinta);
      padding-left: 16px;
      position: relative;
    }
    .signal-item::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--verde);
      font-weight: 600;
    }

    /* ── Tables ── */
    .section {
      padding: 32px 40px;
    }
    .section-heading {
      font-size: 13px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--grafito);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-heading .count {
      background: var(--gris-claro);
      color: var(--tinta);
      border-radius: 99px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 600;
    }
    .section-heading.killed-heading { color: #999; }
    .table-wrap { overflow-x: auto; border-radius: 12px; border: 1px solid var(--gris-borde); }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12.5px;
    }
    thead { background: var(--gris-claro); }
    th {
      padding: 10px 12px;
      text-align: left;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--grafito);
      white-space: nowrap;
      border-bottom: 1px solid var(--gris-borde);
    }
    td {
      padding: 12px 12px;
      border-bottom: 1px solid var(--gris-borde);
      vertical-align: top;
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: rgba(15,123,63,0.03); }

    /* Row states */
    .row-leader td { background: rgba(15,123,63,0.04); }
    .row-killed td { opacity: 0.6; background: var(--gris-claro); }
    .row-killed:hover td { background: var(--gris-claro); }

    /* Variant badge */
    .variant-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: var(--tinta);
      color: var(--hueso);
      font-weight: 700;
      font-size: 13px;
    }
    .badge-leader { background: var(--verde); }
    .badge-killed { background: var(--gris-borde); color: var(--grafito); }

    .tag-leader {
      display: inline-block;
      font-size: 10px;
      font-weight: 600;
      background: var(--verde-tenue);
      color: var(--verde);
      border-radius: 99px;
      padding: 2px 6px;
      margin-left: 6px;
      vertical-align: middle;
    }
    .tag-killed {
      display: block;
      font-size: 10px;
      color: var(--grafito);
      margin-top: 4px;
    }

    /* Angle tag */
    .angle-tag {
      display: inline-block;
      font-size: 10.5px;
      font-weight: 500;
      background: var(--gris-claro);
      color: var(--tinta);
      border-radius: 6px;
      padding: 3px 7px;
      white-space: nowrap;
    }

    /* Copy cells */
    .cell-copy { max-width: 200px; }
    .cell-h1 { max-width: 220px; font-weight: 600; color: var(--tinta); }
    .copy-eyebrow { font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; color: var(--verde); }
    .copy-empty { color: var(--gris-borde); }

    /* CTA pill */
    .cta-pill {
      display: inline-block;
      padding: 5px 12px;
      border-radius: 99px;
      font-size: 11.5px;
      font-weight: 600;
      white-space: nowrap;
    }
    .cta-verde { background: var(--verde); color: white; }
    .cta-default { background: var(--tinta); color: var(--hueso); }

    /* Trust signals */
    .trust-item {
      font-size: 11.5px;
      color: var(--grafito);
      padding: 2px 0;
    }
    .trust-item::before { content: '✓ '; color: var(--verde); font-weight: 600; }

    /* Numbers */
    .cell-num {
      text-align: right;
      font-variant-numeric: tabular-nums;
      color: var(--tinta);
      white-space: nowrap;
    }
    .cell-rate {
      text-align: right;
      font-variant-numeric: tabular-nums;
      font-weight: 600;
      white-space: nowrap;
    }
    .rate-best { color: var(--verde); }

    /* Footer */
    .doc-footer {
      padding: 24px 40px;
      border-top: 1px solid var(--gris-borde);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 11px;
      color: var(--grafito);
    }
    .update-cmd {
      font-family: monospace;
      background: var(--gris-claro);
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 11px;
      color: var(--tinta);
    }
    .cell-letter { white-space: nowrap; }

    @media (max-width: 900px) {
      .doc-header { flex-direction: column; padding: 24px 20px; }
      .section { padding: 24px 20px; }
      .signals-section { padding: 16px 20px; }
      .doc-stats { flex-wrap: wrap; }
    }
  </style>
</head>
<body>

<header class="doc-header">
  <div class="doc-header-left">
    <div class="doc-eyebrow">agendallena — A/B testing</div>
    <h1 class="doc-title">Matriz de variantes <span>hero</span></h1>
    <div class="doc-meta">
      Generado: <strong>${updatedAt}</strong> &nbsp;·&nbsp;
      Performance GA4: <strong>${perfDate}</strong>
    </div>
  </div>
  <div class="doc-stats">
    <div class="stat-box">
      <div class="stat-value">${active.length}</div>
      <div class="stat-label">activas</div>
    </div>
    <div class="stat-box">
      <div class="stat-value">${all.length}</div>
      <div class="stat-label">total probadas</div>
    </div>
    ${bestPerformer && bestPerformer.performance.conversionRate > 0 ? `
    <div class="stat-box">
      <div class="stat-value green">${bestPerformer.performance.conversionRate.toFixed(1)}%</div>
      <div class="stat-label">mejor CTR (${bestPerformer.letter})</div>
    </div>` : ''}
    ${leaderByAssignments && leaderByAssignments.performance.assignments > 0 ? `
    <div class="stat-box">
      <div class="stat-value">${leaderByAssignments.letter}</div>
      <div class="stat-label">más asignaciones</div>
    </div>` : ''}
  </div>
</header>

<div class="signals-section">
  <div class="signals-heading">Señales detectadas</div>
  <div class="signals-list">
    ${signals.map((s) => `<div class="signal-item">${s}</div>`).join('\n    ')}
  </div>
</div>

<section class="section">
  <div class="section-heading">
    Variantes activas
    <span class="count">${active.length}</span>
  </div>
  <div class="table-wrap">
    <table>
      ${tableHead}
      <tbody>
        ${active.map((v) => variantRow(v, false)).join('')}
      </tbody>
    </table>
  </div>
</section>

${killed.length > 0 ? `
<section class="section">
  <div class="section-heading killed-heading">
    Variantes archivadas (killed)
    <span class="count">${killed.length}</span>
  </div>
  <div class="table-wrap">
    <table>
      ${tableHead}
      <tbody>
        ${killed.map((v) => variantRow(v, true)).join('')}
      </tbody>
    </table>
  </div>
</section>
` : ''}

<footer class="doc-footer">
  <span>agendallena — matriz A/B hero · historial en <code>docs/ab-matrix/history.json</code></span>
  <span>Actualizar: <span class="update-cmd">npm run ab:matrix</span></span>
</footer>

</body>
</html>`
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const today = new Date().toISOString().split('T')[0]
  const updatedAt = new Date().toLocaleString('es-MX', { dateStyle: 'long', timeStyle: 'short' })

  console.log('\n🔄 Actualizando matriz A/B...')

  // 1. Parse copy from source
  const heroSrc = fs.readFileSync(HERO_PATH, 'utf8')
  const parsedCopy = parseHeroVariants(heroSrc)
  console.log(`  ✔ ${Object.keys(parsedCopy).length} variantes en HeroIndex.astro`)

  // 2. Fetch performance
  console.log(`  … buscando analytics (localhost → vercel.app)`)
  const perfData = await fetchPerformance()
  if (!perfData) {
    console.log('  ⚠ Analytics no disponible — performance no actualizado')
    console.log('    Para actualizar métricas: corre el analytics en :3000 y ejecuta de nuevo')
  }

  // 3. Merge with history
  const history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'))
  const updated = mergeHistory(history, parsedCopy, perfData, today)
  fs.writeFileSync(HISTORY_PATH, JSON.stringify(updated, null, 2))
  console.log(`  ✔ history.json actualizado`)

  // 4. Generate HTML
  const html = generateHTML(updated, updatedAt)
  fs.writeFileSync(OUTPUT_PATH, html)
  console.log(`  ✔ ab-matrix.html generado`)

  // 5. Write ab-copy.json for analytics dashboard
  try {
    fs.writeFileSync(AB_COPY_PATH, JSON.stringify(updated, null, 2))
    console.log(`  ✔ ab-copy.json escrito en agendallena-analytics`)
  } catch {
    console.log(`  ⚠ No se pudo escribir ab-copy.json (¿existe ../agendallena-analytics?)`)
  }

  console.log(`\n✅ Listo → docs/ab-matrix/ab-matrix.html\n`)
}

main().catch((err) => {
  console.error('Error:', err)
  process.exit(1)
})
