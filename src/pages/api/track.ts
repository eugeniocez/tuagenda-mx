// src/pages/api/track.ts
//
// Endpoint on-demand (NO prerenderizado) que recibe el beacon de atribucion
// y lo escribe, aplanado a columnas, en una hoja de Google Sheets.
//
// Requisitos en Astro 6:
//   1) Instalar el adaptador:  npx astro add vercel
//      (import correcto: "@astrojs/vercel", NO "@astrojs/vercel/serverless")
//   2) output queda en 'static' por default; este archivo se vuelve funcion
//      gracias a la linea prerender = false de abajo.
//   3) Para escribir a Sheets:  npm i google-auth-library
//
// Setup de Google Sheets (una sola vez):
//   a) En Google Cloud, crear un Service Account y descargar su JSON.
//   b) Habilitar la Google Sheets API en ese proyecto.
//   c) Compartir la hoja de calculo (boton Compartir) con el email del
//      service account (xxx@xxx.iam.gserviceaccount.com) como Editor.
//   d) Poner en la PRIMERA fila de la hoja los encabezados, en este orden:
//      vid | first_source | first_medium | first_campaign | first_ts |
//      current_source | current_medium | current_campaign | current_content |
//      click_id | referrer | landing | lang | tz | screen | ip | ts_server
//   e) Definir estas env vars en Vercel:
//      GOOGLE_SHEETS_ID            -> el id que aparece en la URL de la hoja
//      GOOGLE_SERVICE_ACCOUNT_EMAIL-> el client_email del JSON
//      GOOGLE_PRIVATE_KEY          -> el private_key del JSON (con los \n)
//      GOOGLE_SHEETS_RANGE         -> opcional, default "Registros!A:Q"

import type { APIRoute } from "astro";
import { JWT } from "google-auth-library";

export const prerender = false;

// Filtro de bots barato sobre user-agent
const BOT_RE = /bot|crawl|spider|slurp|headless|preview|monitor|curl|wget|python-requests|axios/i;

// NOTA DE PRIVACIDAD: se guarda la IP en crudo por decision explicita.
// Bajo la LFPDPPP la IP es dato personal, asi que esto exige declararlo en el
// aviso de privacidad del landing, tener base para el tratamiento y proteger
// la tabla donde aterriza. Si en algun momento se quiere volver a anonimizar,
// basta con hashear ip antes de guardarla.

// ---- APLANADO A COLUMNAS --------------------------------------------------
// Convierte el record anidado en una fila de 17 valores, en el MISMO orden
// que los encabezados de la hoja (ver setup arriba).

type Touch = Record<string, string | number> | null | undefined;

// fecha legible en UTC: "YYYY-MM-DD HH:MM"
function fmtDate(ms: number | null | undefined): string {
  if (!ms) return "";
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())} ` +
         `${p(d.getUTCHours())}:${p(d.getUTCMinutes())}`;
}

// toma el primer click id que exista, sin importar la plataforma
function pickClickId(t: Touch): string {
  if (!t) return "";
  return String(t.gclid ?? t.fbclid ?? t.ttclid ?? t.msclkid ?? "");
}

function flatten(r: any): (string | number)[] {
  const cur: Touch = r.currentTouch ?? {};
  const first: Touch = r.firstTouch ?? null;
  const screen = r.screen ? `${r.screen.w}x${r.screen.h}` : "";
  return [
    r.vid ?? "",                                  // vid
    first?.utm_source ?? "",                       // first_source
    first?.utm_medium ?? "",                       // first_medium
    first?.utm_campaign ?? "",                     // first_campaign
    fmtDate(first?.ts as number),                  // first_ts
    cur?.utm_source ?? "",                         // current_source
    cur?.utm_medium ?? "",                         // current_medium
    cur?.utm_campaign ?? "",                       // current_campaign
    cur?.utm_content ?? "",                        // current_content
    pickClickId(cur),                              // click_id
    r.referrer ?? "",                              // referrer
    r.landing ?? "",                               // landing
    r.lang ?? "",                                  // lang
    r.tz ?? "",                                    // tz
    screen,                                        // screen
    r.ip ?? "",                                    // ip
    fmtDate(r.tsServer as number),                 // ts_server
  ];
}

// ---- ADAPTADOR DE STORAGE: GOOGLE SHEETS ----------------------------------
// Reusa un solo cliente JWT entre invocaciones calientes (lazy init).
let sheetsClient: JWT | null = null;
function getClient(): JWT {
  if (sheetsClient) return sheetsClient;
  sheetsClient = new JWT({
    email: import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    // En Vercel la private key llega con los saltos escapados como \n;
    // hay que devolverlos a saltos reales o la firma falla.
    key: (import.meta.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return sheetsClient;
}

async function persist(record: Record<string, unknown>): Promise<void> {
  const id = import.meta.env.GOOGLE_SHEETS_ID;
  const range = import.meta.env.GOOGLE_SHEETS_RANGE ?? "Registros!A:Q";

  if (!id) {
    // sin config aun: dejamos rastro en los logs de Vercel y salimos
    console.log("[attribution]", JSON.stringify(record));
    return;
  }

  const client = getClient();
  // values.append agrega la fila al final sin pisar nada.
  // USER_ENTERED hace que Sheets interprete fechas y numeros como tales.
  await client.request({
    url:
      `https://sheets.googleapis.com/v4/spreadsheets/${id}` +
      `/values/${encodeURIComponent(range)}:append` +
      `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    method: "POST",
    data: { values: [flatten(record)] },
  });

  // --- Otros destinos posibles (dejados como referencia) ---
  // Vercel KV:      await kv.lpush("attribution:hits", JSON.stringify(record));
  // Vercel Postgres: INSERT ... (guarda el objeto anidado, no necesita flatten)
  // Supabase:       await sb.from("attribution_hits").insert(record);
}
// ---------------------------------------------------------------------------

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // user-agent + filtro de bots
  const ua = request.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) {
    return new Response(null, { status: 204 }); // ignoramos bots en silencio
  }

  // parseo defensivo del cuerpo
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

  // IP real: clientAddress (lo expone el adaptador de Vercel) con fallback al header
  let ip = "";
  try {
    ip = clientAddress || "";
  } catch {
    ip = "";
  }
  if (!ip) {
    ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim();
  }

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
  };

  try {
    await persist(record);
  } catch (err) {
    console.error("[attribution] persist error", err);
    // 204 igual: no queremos que un fallo de storage rompa el landing
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
