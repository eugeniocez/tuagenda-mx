# agendallena

Landing principal de [agendallena.mx](https://agendallena.mx) — el sistema que confirma tu agenda por ti.

## Stack

- Astro 6 con adapter Vercel (`@astrojs/vercel`) — sitio estático con prerender selectivo
- CSS3 vanilla en `src/styles/global.css`
- Plus Jakarta Sans vía Google Fonts (única familia tipográfica)
- `google-auth-library` para escribir a Google Sheets desde `/api/track`
- Hosted en Vercel

## Prerequisitos

- Node.js ≥ 18 (Vercel corre en Node 24 LTS por default)

## Estructura

```
.
├── src/
│   ├── pages/
│   │   ├── index.astro            Landing principal
│   │   ├── [vertical].astro       Páginas dinámicas por vertical
│   │   ├── soporte.astro          Centro de ayuda
│   │   ├── privacidad.astro       Aviso de privacidad LFPDPPP
│   │   ├── terminos.astro         Términos de servicio
│   │   └── api/
│   │       └── track.ts           Endpoint de atribución → Google Sheets
│   ├── components/
│   │   ├── AttributionTracker.astro   Captura UTMs/click IDs, cookies first-party
│   │   ├── HeroIndex.astro            11 variantes A/B (A, B, D, E, F, I, J, L, O, P, Q)
│   │   └── …                          11+ secciones como componentes
│   ├── content/verticals/             Copy por vertical (17 archivos .ts)
│   ├── layouts/Base.astro             Head, header, footer, GTM, script A/B
│   └── styles/global.css              Variables y estilos globales
├── docs/
│   ├── brand/                     Plantilla y system prompt para PDFs
│   ├── ab-matrix/                 Matriz histórica de variantes A/B
│   ├── marketing/                 Documentos de marketing (HTML)
│   └── seo/                       Plan SEO
├── public/
│   ├── assets/                    Imágenes
│   └── llms.txt                   Manifiesto para AI search
├── CLAUDE.md                      Contexto completo del proyecto (leer antes de editar)
└── README.md
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:4321`.

## Scripts

| Comando                   | Descripción                                       |
| ------------------------- | ------------------------------------------------- |
| `npm run dev`             | Servidor de desarrollo en `http://localhost:4321` |
| `npm run build`           | Genera `dist/` con HTML estático                  |
| `npm run preview`         | Vista previa del build antes de deploy            |
| `npm run build:brand-pdf` | Genera PDF de brand guidelines en `docs/`         |
| `npm run ab:matrix`       | Actualiza la matriz histórica de variantes A/B    |
| `npm run lint`            | ESLint                                            |
| `npm run format`          | Prettier                                          |
| `npm test`                | Playwright                                        |

## Páginas

### Principales
| Ruta          | Descripción                      |
| ------------- | -------------------------------- |
| `/`           | Landing principal multi-vertical |
| `/soporte`    | Centro de ayuda                  |
| `/privacidad` | Aviso de privacidad (LFPDPPP)    |
| `/terminos`   | Términos de servicio             |

### Verticales (17)
`/dentistas` · `/consultorios-medicos` · `/psicologos` · `/terapistas` · `/quiropracticos` · `/nutriologos` · `/veterinarias` · `/salones-de-belleza` · `/barberias` · `/salones-de-unas` · `/spas` · `/tatuadores` · `/estudios-de-yoga` · `/entrenadores-personales` · `/despachos-legales` · `/talleres-mecanicos`

Todas usan el mismo template; el copy de cada una vive en `src/content/verticals/[slug].ts`.

### API
| Ruta         | Tipo                 | Descripción                                 |
| ------------ | -------------------- | ------------------------------------------- |
| `/api/track` | Vercel Function (SSR) | Recibe beacon de atribución y lo escribe a Google Sheets |

## A/B test del hero

La landing principal sirve 11 variantes con distribución uniforme (~9.09% c/u). Cada variante prueba un ángulo de copy distinto.

| Variante | Ángulo | H1 |
|---|---|---|
| A (control) | Tagline directo | "Tu agenda, confirmada." |
| B | Económico | "Confirmaciones automáticas. Tu agenda siempre llena." |
| D | Reemplazo de hábito | "Deja de hacerlo tú. agendallena lo hace solo." |
| E | Pérdida cuantificada | "3 de cada 10 citas no llegan. eso son más de $8,000 al mes." |
| F | Peer pressure | "Tu competencia ya confirmó las citas de mañana." |
| I | Autoridad / #1 | "El sistema #1 de recordatorios" |
| J | Retención de cliente | "Tu agenda. Siempre llena." |
| L | Identidad / nunca falla | "Tu agenda no falla. Nunca." |
| O | Mecanismo secuencial | "Un SMS. Un WhatsApp. Una llamada. Cita confirmada." |
| P | Liberación del esfuerzo | "Deja de perseguir. Empieza a confirmar." |
| Q | Pérdida personalizada | "¿Cuánto perdiste esta semana en citas que no llegaron?" |

- **Asignación:** script inline en `<head>` de `Base.astro` — escribe `ag_ab_hero` en `localStorage`, setea `data-ab-hero` en `<html>` y expone `window.__lpVariant` para el tracker, todo antes del primer paint
- **Distribución:** `Math.random()` con 10 umbrales equidistantes (múltiplos de 1/11 ≈ 0.0909)
- **Componente:** `src/components/HeroIndex.astro` — 11 bloques `[data-hero-variant]`, CSS muestra solo el activo
- **Tracking GTM:** `ab_hero_assign` al cargar + parámetro `ab_hero` en cada `cta_click`
- **Tracking server-side:** AttributionTracker captura la variante en la columna `variant` del Sheet (vía `window.__lpVariant`)

Forzar variante en consola del browser:
```js
localStorage.clear(); location.reload();                       // nueva asignación aleatoria
localStorage.setItem('ag_ab_hero', 'B'); location.reload();    // forzar variante específica
```

## Tracking de atribución (v2)

`AttributionTracker.astro` corre antes del primer paint y emite **hasta 3 beacons por visita** contra `/api/track`, distinguidos por `event_type`:

| event_type | Cuándo | Campos extra |
|---|---|---|
| `pageview` | Al cargar (o al restaurar desde bfcache) | `variant` |
| `cta_click` | Al clickear cualquier `[data-track-cta]` | `cta_name` |
| `pagehide` | Al cerrar / navegar fuera / mandar a background | `dwell_ms`, `dwell_ms_active`, `scroll_pct`, `ctas_clicked` |

Los 3 beacons comparten `vid` (cookie 2 años) y `session_id` (cookie 1 día, rota tras 30 min de inactividad). Cada beacon tiene su `event_id` único para dedup downstream.

**Datos capturados por beacon:**
- `vid`, `session_id`, `event_id`, `event_type`, `variant`
- `firstTouch` (UTMs + ts del primer hit, cookie `att_first`)
- `currentTouch` (UTMs + click IDs: `gclid`, `fbclid`, `ttclid`, `msclkid`)
- `referrer`, `landing`, `host`, `lang`, `tz`, `screen`
- IP en crudo (capturada server-side, declarada en `/privacidad`)

**CTAs marcados con `data-track-cta`** (ver `cta_name` en el Sheet):
- `header_primary` (header sticky, todos los layouts)
- `hero_primary` (las 11 variantes del hero index + verticales)
- `how_primary` (CTA al final de "Cómo funciona")
- `pricing_primary` (CTA del pricing)
- `final_primary` y `final_demo` (CTAs de la sección final)

**Env vars requeridas en Vercel:**
- `GOOGLE_SHEETS_ID` — id de la hoja
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` — `client_email` del Service Account JSON
- `GOOGLE_PRIVATE_KEY` — `private_key` del JSON (con `\n` escapados)
- `GOOGLE_SHEETS_RANGE` — opcional, default `Registros!A:Z`

**Headers del Sheet (fila 1, columnas A..Z):**

```
A vid               K referrer          R event_id
B first_source      L landing           S session_id
C first_medium      M lang              T event_type
D first_campaign    N tz                U variant
E first_ts          O screen            V cta_name
F current_source    P ip                W ctas_clicked
G current_medium    Q ts_server         X dwell_ms
H current_campaign                      Y dwell_ms_active
I current_content                       Z scroll_pct
J click_id
```

**Cookies first-party del tracker:**
| Cookie | Vigencia | Función |
|---|---|---|
| `att_vid` | 2 años | UUID anónimo del visitante |
| `att_first` | 2 años | UTMs + ts del primer hit con UTMs |
| `att_sid` + `att_sid_ts` | 1 día | session_id + marca de actividad (rota a 30 min idle) |
| `att_variant` | 7 días | variante A/B cacheada para consistencia entre beacons |

**Volumen / límites.** Sheets API ~60 escrituras/min. v2 emite 2-3 beacons por visita → techo efectivo ~20 visitas/min. Para volúmenes mayores, migrar `persist()` en `track.ts` a una BD (Postgres / Supabase).

### Cierre de loop con Smartlook

`AttributionTracker` llama `window.smartlook("identify", vid, { ...currentTouch, variant, session_id })` para etiquetar la sesión de Smartlook con el mismo `vid` + variante + sesión, permitiendo unir grabaciones contra la tabla de atribución sin adivinar.

### Para extender el tracking (agregar columnas nuevas)

1. Agregar el campo al `payload` en `AttributionTracker.astro` (dato cliente) o derivarlo en `track.ts` (server-side)
2. Agregar la propiedad al `record` en `track.ts`
3. Agregar la celda correspondiente en `flatten()`
4. Agregar el header en la fila 1 del Sheet
5. Si rebasa la columna Z, actualizar `GOOGLE_SHEETS_RANGE`
6. Si el dato es PII: actualizar `/privacidad`

## Stack de marketing actual

- **GTM:** `GTM-KW72MQ8X` (corre en landing y app)
- **GA4:** vía GTM
- **Google Ads:** UTMs hardcodeados a nivel campaña (no a nivel cuenta — los tokens `{campaignname}`/`{adgroupname}` no existen en ValueTrack)
- **Meta Ads:** `utm_content={{ad.name}}` en parámetros de URL del Ads Manager
- **Meta Pixel:** activo
- **Smartlook:** activo, identificado con `vid` propio
- **Vercel Analytics:** activo
- **Conversiones Google Ads:** "Registro Completado" (principal) en Page View `/inicio` del app + "Registro - Empezar gratis" (secundaria) en clic CTA landing

## Deploy

Cada push a `main` deploya automáticamente en Vercel. El sitio es mayormente estático; solo `/api/track` corre como Function (gracias a `export const prerender = false`).

## Antes de hacer cambios

Lee [`CLAUDE.md`](./CLAUDE.md). Contiene el sistema visual, voz de marca, decisiones de diseño cerradas, y lo que no se debe modificar.
