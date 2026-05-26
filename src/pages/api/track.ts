// src/pages/api/track.ts
//
// Endpoint on-demand (NO prerenderizado) que recibe los beacons de atribucion
// y los escribe, aplanados a columnas, en una hoja de Google Sheets.
//
// =====================================================================
// v2 — event stream (pageview / cta_click / pagehide)
// =====================================================================
// Cambios vs v1:
//   - El cliente emite varios beacons por visita. Una fila por beacon.
//   - 9 columnas nuevas al final del row:
//       event_id, session_id, event_type, variant,
//       cta_name, ctas_clicked, dwell_ms, dwell_ms_active, scroll_pct
//   - Total de columnas pasa de 17 (A:Q) a 26 (A:Z).
//   - Default range pasa de "Registros!A:Q" a "Registros!A:Z".
//
// Migracion de la hoja:
//   Agregar 9 encabezados nuevos en columnas R..Z (ver orden en el comentario
//   de flatten() abajo) y, si la env var GOOGLE_SHEETS_RANGE estaba seteada,
//   ampliarla a A:Z.
//
// Si dejas la hoja con A:Q los beacons v2 igual se aceptan (no truena el
// endpoint), pero las 9 columnas nuevas no aterrizan.
//
// Requisitos en Astro 6 (sin cambios vs v1):
//   1) Adaptador:       npx astro add vercel
//   2) Dependencia:     npm i google-auth-library
//   3) Output:          static por default; este archivo se vuelve funcion
//                       gracias a `export const prerender = false`.

import type { APIRoute } from "astro";
import { JWT } from "google-auth-library";

export const prerender = false;

// Filtro de bots barato sobre user-agent
const BOT_RE = /bot|crawl|spider|slurp|headless|preview|monitor|curl|wget|python-requests|axios/i;

// Tipos de evento aceptados. Cualquier otro valor se normaliza a "pageview"
// para que el endpoint nunca falle por un cliente mal armado.
const VALID_EVENTS = new Set(["pageview", "cta_click", "pagehide"]);

// NOTA DE PRIVACIDAD: la IP se guarda en crudo por decision explicita.
// Bajo la LFPDPPP la IP es dato personal — declararlo en el aviso, base
// legitima para el tratamiento, y proteger la tabla destino. Para anonimizar,
// hashear `ip` antes de guardar.

// ---- APLANADO A COLUMNAS --------------------------------------------------
// Convierte el record anidado en una fila de 26 valores, en el MISMO orden
// que los encabezados de la hoja.
//
// Orden de columnas (A..AB):
//   A vid                 K referrer            U variant
//   B first_source        L landing             V cta_name
//   C first_medium        M lang                W ctas_clicked
//   D first_campaign      N tz                  X dwell_ms          (wall)
//   E first_ts            O screen              Y dwell_ms_active   (sin background)
//   F current_source      P ip                  Z scroll_pct        (max % de pagina visto)
//   G current_medium      Q ts_server          AA scroll_px_max     (max scrollY observado, px)
//   H current_campaign    R event_id           AB vertical          (vertical/path: home, dentistas, ...)
//   I current_content     S session_id
//   J click_id            T event_type

type Touch = Record<string, string | number> | null | undefined;

function fmtDate(ms: number | null | undefined): string {
  if (!ms) return "";
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ` +
         `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`;
}

function pickClickId(t: Touch): string {
  if (!t) return "";
  return String(t.gclid ?? t.fbclid ?? t.ttclid ?? t.msclkid ?? "");
}

function normalizeEvent(e: unknown): string {
  const s = typeof e === "string" ? e : "";
  return VALID_EVENTS.has(s) ? s : "pageview";
}

// Numero entero no negativo y razonable (cap a 24h en ms). Devuelve "" si no
// es valido — Sheets respeta el blank como celda vacia.
function safeNonNegMs(v: unknown, capMs = 86_400_000): number | "" {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0 || n > capMs) return "";
  return Math.round(n);
}
// Numero entero 0..100. Devuelve "" si no es valido.
function safePct(v: unknown): number | "" {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0 || n > 100) return "";
  return Math.round(n);
}
// Entero no negativo, sin tope alto (para conteo de CTAs en la visita).
function safeNonNegInt(v: unknown): number | "" {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) return "";
  return Math.round(n);
}

function flatten(r: any): (string | number)[] {
  const cur: Touch = r.currentTouch ?? {};
  const first: Touch = r.firstTouch ?? null;
  const screen = r.screen ? `${r.screen.w}x${r.screen.h}` : "";
  return [
    r.vid ?? "",                                  // A  vid
    first?.utm_source ?? "",                      // B  first_source
    first?.utm_medium ?? "",                      // C  first_medium
    first?.utm_campaign ?? "",                    // D  first_campaign
    fmtDate(first?.ts as number),                 // E  first_ts
    cur?.utm_source ?? "",                        // F  current_source
    cur?.utm_medium ?? "",                        // G  current_medium
    cur?.utm_campaign ?? "",                      // H  current_campaign
    cur?.utm_content ?? "",                       // I  current_content
    pickClickId(cur),                             // J  click_id
    r.referrer ?? "",                             // K  referrer
    r.landing ?? "",                              // L  landing
    r.lang ?? "",                                 // M  lang
    r.tz ?? "",                                   // N  tz
    screen,                                       // O  screen
    r.ip ?? "",                                   // P  ip
    fmtDate(r.tsServer as number),                // Q  ts_server
    r.eventId ?? "",                              // R  event_id
    r.sessionId ?? "",                            // S  session_id
    r.eventType ?? "pageview",                    // T  event_type
    r.variant ?? "",                              // U  variant
    r.ctaName ?? "",                              // V  cta_name
    r.ctasClicked ?? "",                          // W  ctas_clicked
    r.dwellMs ?? "",                              // X  dwell_ms
    r.dwellMsActive ?? "",                        // Y  dwell_ms_active
    r.scrollPct ?? "",                            // Z  scroll_pct
    r.scrollPxMax ?? "",                          // AA scroll_px_max
    r.vertical ?? "",                             // AB vertical
  ];
}

// ---- ADAPTADOR DE STORAGE: GOOGLE SHEETS ----------------------------------
let sheetsClient: JWT | null = null;
function getClient(): JWT {
  if (sheetsClient) return sheetsClient;
  sheetsClient = new JWT({
    email: import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (import.meta.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return sheetsClient;
}

async function persist(record: Record<string, unknown>): Promise<void> {
  const id = import.meta.env.GOOGLE_SHEETS_ID;
  // Default range A:AB (28 cols, incluye scroll_px_max y vertical).
  // Si tu env var sigue en A:Z, A:AA o A:Q, ampliar.
  const range = import.meta.env.GOOGLE_SHEETS_RANGE ?? "Registros!A:AB";

  if (!id) {
    console.log("[attribution]", JSON.stringify(record));
    return;
  }

  const client = getClient();
  await client.request({
    url:
      `https://sheets.googleapis.com/v4/spreadsheets/${id}` +
      `/values/${encodeURIComponent(range)}:append` +
      `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    method: "POST",
    data: { values: [flatten(record)] },
  });

  // --- Otros destinos posibles (referencia) ---
  // Vercel KV:       await kv.lpush("attribution:hits", JSON.stringify(record));
  // Vercel Postgres: INSERT ... (guarda objeto anidado, sin flatten)
  // Supabase:        await sb.from("attribution_hits").insert(record);
}
// ---------------------------------------------------------------------------

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ua = request.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) {
    return new Response(null, { status: 204 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "bad json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!body || typeof body.vid !== "string") {
    return new Response(JSON.stringify({ error: "missing vid" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // IP real: clientAddress (adaptador de Vercel) con fallback al header.
  let ip = "";
  try { ip = clientAddress || ""; } catch { ip = ""; }
  if (!ip) {
    ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  }

  // Sanitizacion / coercion de campos v2.
  const eventType = normalizeEvent(body.eventType);
  const eventId = typeof body.eventId === "string" && body.eventId.length <= 64
    ? body.eventId : null;
  const sessionId = typeof body.sessionId === "string" && body.sessionId.length <= 64
    ? body.sessionId : null;
  const variant = typeof body.variant === "string" && body.variant.length <= 32
    ? body.variant : null;
  const ctaName = typeof body.ctaName === "string" && body.ctaName.length <= 80
    ? body.ctaName : null;
  const ctasClicked = safeNonNegInt(body.ctasClicked);
  const dwellMs = safeNonNegMs(body.dwellMs);
  const dwellMsActive = safeNonNegMs(body.dwellMsActive);
  const scrollPct = safePct(body.scrollPct);
  // scroll_px_max: pixels scrolled. Cap at 10M (any value bigger is a bug).
  const scrollPxMax = safeNonNegMs(body.scrollPxMax, 10_000_000);
  // vertical: primer segmento del path (home, dentistas, veterinarias, ...).
  // Cap a 64 chars como salvavidas — los slugs reales son <30.
  const vertical = typeof body.vertical === "string" && body.vertical.length <= 64
    ? body.vertical : null;

  const record = {
    vid: body.vid,
    currentTouch: body.currentTouch ?? {},
    firstTouch: body.firstTouch ?? null,
    referrer: body.referrer ?? null,
    landing: body.landing ?? null,
    host: body.host ?? null,
    lang: body.lang ?? null,
    tz: body.tz ?? null,
    screen: body.screen ?? null,
    ip: ip || null,
    ua,
    tsClient: body.tsClient ?? null,
    tsServer: Date.now(),
    // v2
    eventId,
    sessionId,
    eventType,
    variant,
    ctaName,
    ctasClicked,
    dwellMs,
    dwellMsActive,
    scrollPct,
    scrollPxMax,
    vertical,
  };

  try {
    await persist(record);
  } catch (err) {
    console.error("[attribution] persist error", err);
  }

  return new Response(null, { status: 204 });
};

// sendBeacon es same-origin, asi que normalmente no necesitas CORS.
// Si algun dia sirves el landing en otro dominio, maneja el preflight:
export const OPTIONS: APIRoute = () =>
  new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
