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
│   │   ├── HeroIndex.astro            4 variantes A/B (A/B/C/D)
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

La landing principal sirve 4 variantes (A/B/C/D) con distribución 25/25/25/25.

- Asignación: script inline en `<head>` de `Base.astro`, escribe en `localStorage` y setea `data-ab-hero` en `<html>` antes del primer paint
- Componente: `src/components/HeroIndex.astro` — 4 bloques `[data-hero-variant]`
- Tracking: GTM pushea `ab_hero_assign` al cargar y enriquece cada `cta_click` con `ab_hero`

Forzar variante en consola del browser:
```js
localStorage.clear(); location.reload();                       // nueva asignación aleatoria
localStorage.setItem('ag_ab_hero', 'B'); location.reload();    // forzar variante específica
```

## Tracking de atribución

`AttributionTracker.astro` corre antes del primer paint y dispara un beacon a `/api/track` con:

- `vid` (UUID propio en cookie first-party `att_vid`, 2 años)
- `firstTouch` (UTMs + ts del primer hit con UTMs, en cookie `att_first`)
- `currentTouch` (UTMs + click IDs de la URL actual: `gclid`, `fbclid`, `ttclid`, `msclkid`)
- `referrer`, `landing`, `host`, `lang`, `tz`, `screen`
- IP en crudo (capturada server-side, declarada en aviso de privacidad)

El endpoint aplana a 17 columnas y hace `values.append` a Google Sheets vía Service Account.

**Env vars requeridas en Vercel:**
- `GOOGLE_SHEETS_ID` — id de la hoja
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` — `client_email` del Service Account JSON
- `GOOGLE_PRIVATE_KEY` — `private_key` del JSON (con `\n` escapados)
- `GOOGLE_SHEETS_RANGE` — opcional, default `Registros!A:Q`

**Headers del Sheet (fila 1):**
`vid | first_source | first_medium | first_campaign | first_ts | current_source | current_medium | current_campaign | current_content | click_id | referrer | landing | lang | tz | screen | ip | ts_server`

Para agregar una columna nueva, ver el flujo de 6 pasos en la sección "Para extender el tracking" del proyecto.

### Cierre de loop con Smartlook

`AttributionTracker` llama `window.smartlook("identify", vid, currentTouch)` para etiquetar la sesión de Smartlook con el mismo `vid`, permitiendo unir grabaciones contra la tabla de atribución sin adivinar.

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
