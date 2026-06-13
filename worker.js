// Cloudflare Worker — proxy for ready-set-vote.
// Holds the Google Civic + FEC API keys (set as Worker secrets) and proxies the
// specific endpoints the app uses, so the keys never reach the browser.
//
// Secrets required:
//   npx wrangler secret put FEC_API_KEY
//   npx wrangler secret put GOOGLE_CIVIC_API_KEY
//
// Hardening vs. the original:
//   1. CORS restricted to the app's own origin (was '*').
//   2. The ?fec= path is whitelisted to the two endpoints the app actually
//      calls, so this can't be used as a general FEC proxy on your key.

const ALLOWED_ORIGINS = [
  'https://samiprehn.github.io',
  'http://localhost',
  'http://127.0.0.1',
];

// Only these FEC v1 paths may be proxied (query string after the path is free).
const FEC_ALLOWED_PATHS = [
  '/candidates/search/',
  '/schedules/schedule_a/',
];

function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allowed = ALLOWED_ORIGINS.some((o) => origin.startsWith(o));
  return {
    'Access-Control-Allow-Origin': allowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const headers = corsHeaders(request);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers });
    }

    try {
      const fecPath = url.searchParams.get('fec');

      if (fecPath) {
        // FEC API request — only the whitelisted endpoints are allowed.
        const pathOnly = fecPath.split('?')[0];
        if (!FEC_ALLOWED_PATHS.includes(pathOnly)) {
          return new Response(JSON.stringify({ error: 'Endpoint not allowed' }), { status: 403, headers });
        }
        const FEC_KEY = env.FEC_API_KEY;
        const fecUrl = `https://api.open.fec.gov/v1${fecPath}&api_key=${FEC_KEY}`;
        const response = await fetch(fecUrl);
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: response.status, headers });
      } else {
        // Google Civic API request
        const address = url.searchParams.get('address');
        if (!address) {
          return new Response(JSON.stringify({ error: 'Missing address parameter' }), { status: 400, headers });
        }
        const GOOGLE_KEY = env.GOOGLE_CIVIC_API_KEY;
        const apiUrl = `https://www.googleapis.com/civicinfo/v2/voterinfo?key=${GOOGLE_KEY}&address=${encodeURIComponent(address)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return new Response(JSON.stringify(data), { status: response.status, headers });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers,
      });
    }
  },
};
