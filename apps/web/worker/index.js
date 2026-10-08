// The site's only server code. Cloudflare serves every page and file straight
// from ./dist; this Worker runs for /api/* only (see wrangler.jsonc).
//
// POST /api/enquiry-notify
//   Called by the Supabase database each time a row is added to `enquiries`
//   (supabase/migrations/…_enquiry_notifications.sql). It tells the team by
//   email and by WhatsApp. Each channel is sent only if its settings exist, so
//   a missing key never breaks the enquiry itself: the row is already saved.
//
// Settings (Cloudflare dashboard > Worker > Settings > Variables and Secrets,
// or `npx wrangler secret put NAME`):
//   ENQUIRY_WEBHOOK_SECRET   shared with the database; proves who is calling
//   Email (Resend):          RESEND_API_KEY, NOTIFY_EMAIL_TO, NOTIFY_EMAIL_FROM
//   WhatsApp, either of:
//     Meta Cloud API:        WHATSAPP_TOKEN, WHATSAPP_PHONE_NUMBER_ID,
//                            NOTIFY_WHATSAPP_TO, WHATSAPP_TEMPLATE (optional)
//     CallMeBot:             CALLMEBOT_API_KEY, NOTIFY_WHATSAPP_TO

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

/** Constant-time comparison, so the secret can't be guessed a character at a time. */
function sameSecret(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const clean = (value, max = 500) => (value == null ? '' : String(value).replace(/\s+/g, ' ').trim().slice(0, max));

function describe(record) {
  const lines = [
    ['Name', record.name],
    ['Phone / WhatsApp', record.phone],
    ['Email', record.email],
    ['Event type', record.event_type],
    ['Event date', record.event_date],
    ['Guests', record.guests],
    ['Venue or area', record.area],
    ['Budget', record.budget],
    ['Message', clean(record.message, 2000)],
    ['Wants updates', record.marketing_consent ? 'Yes' : ''],
    ['Sent from', record.page],
  ];
  return lines.filter(([, value]) => clean(value)).map(([label, value]) => `${label}: ${clean(value, 2000)}`).join('\n');
}

async function sendEmail(env, record) {
  if (!env.RESEND_API_KEY || !env.NOTIFY_EMAIL_TO) return 'skipped (not set up)';
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.NOTIFY_EMAIL_FROM || 'Talk Events website <enquiries@talkevents.ng>',
      to: env.NOTIFY_EMAIL_TO.split(',').map((address) => address.trim()).filter(Boolean),
      // Replying to the alert replies to the person who enquired.
      ...(clean(record.email) ? { reply_to: clean(record.email) } : {}),
      subject: `New enquiry: ${clean(record.name, 80)}${clean(record.event_type) ? ` (${clean(record.event_type, 60)})` : ''}`,
      text: `A new enquiry came in from talkevents.ng.\n\n${describe(record)}\n\nIt is saved in Supabase, in the "enquiries" table.`,
    }),
  });
  return response.ok ? 'sent' : `failed (${response.status})`;
}

async function sendWhatsApp(env, record) {
  const to = clean(env.NOTIFY_WHATSAPP_TO).replace(/[^\d]/g, '');
  if (!to) return 'skipped (not set up)';

  // Official route. A business may only start a conversation with a template
  // that Meta has approved; this one takes five text values.
  if (env.WHATSAPP_TOKEN && env.WHATSAPP_PHONE_NUMBER_ID) {
    const values = [record.name, record.phone, record.event_type || 'Not given', record.event_date || 'Not given', record.guests || 'Not given'];
    const response = await fetch(`https://graph.facebook.com/v21.0/${env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: { authorization: `Bearer ${env.WHATSAPP_TOKEN}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: env.WHATSAPP_TEMPLATE || 'new_enquiry',
          language: { code: env.WHATSAPP_TEMPLATE_LANGUAGE || 'en' },
          components: [{ type: 'body', parameters: values.map((value) => ({ type: 'text', text: clean(value, 200) || 'Not given' })) }],
        },
      }),
    });
    return response.ok ? 'sent' : `failed (${response.status})`;
  }

  // Simple route for a personal number. CallMeBot is a third party, so the
  // message carries only who and what, not the visitor's full message.
  if (env.CALLMEBOT_API_KEY) {
    const text = `New Talk Events enquiry\n${clean(record.name, 80)} (${clean(record.phone, 40)})\n${clean(record.event_type, 60) || 'Event type not given'}${clean(record.event_date) ? `, ${clean(record.event_date)}` : ''}`;
    const url = `https://api.callmebot.com/whatsapp.php?phone=${to}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(env.CALLMEBOT_API_KEY)}`;
    const response = await fetch(url);
    return response.ok ? 'sent' : `failed (${response.status})`;
  }

  return 'skipped (not set up)';
}

async function notify(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!env.ENQUIRY_WEBHOOK_SECRET || !sameSecret(request.headers.get('x-webhook-secret'), env.ENQUIRY_WEBHOOK_SECRET)) {
    return json({ error: 'Not authorised' }, 401);
  }

  let record;
  try {
    record = (await request.json()).record;
  } catch {
    return json({ error: 'Body must be JSON' }, 400);
  }
  if (!record || !clean(record.name) || !clean(record.phone)) return json({ error: 'No enquiry in the request' }, 400);

  const attempt = async (send) => {
    try {
      return await send(env, record);
    } catch {
      return 'failed (could not reach the service)';
    }
  };
  const [email, whatsapp] = await Promise.all([attempt(sendEmail), attempt(sendWhatsApp)]);
  return json({ ok: true, email, whatsapp });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/enquiry-notify') return notify(request, env);
    if (pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404);
    return env.ASSETS.fetch(request);
  },
};
