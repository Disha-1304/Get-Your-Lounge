/**
 * emailService.js
 * ────────────────────────────────────────────────────────────
 * Thin wrapper around Resend for transactional booking emails.
 *
 * All functions are fire-and-forget safe:
 *   - They return a Promise but callers should .catch() it externally
 *     so a failed send never crashes the booking flow.
 *
 * Swap provider: replace the `resend.emails.send()` calls with your
 * own provider SDK (SendGrid, Mailgun, Nodemailer, etc.) — the
 * template functions and exported API stay the same.
 *
 * ENV vars required:
 *   RESEND_API_KEY  — from resend.com dashboard
 *   EMAIL_FROM      — verified sender address (e.g. noreply@yourdomain.com)
 */

const { Resend } = require('resend');

let resend;

function getClient() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('[emailService] RESEND_API_KEY not set — emails will be skipped');
      return null;
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

const FROM = () => process.env.EMAIL_FROM || 'noreply@getyourlounge.com';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}

// ─── Email Templates ──────────────────────────────────────────────────────────

function pendingEmailHtml({ booking, lounge, user }) {
  const name = user.name || user.email;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
    .header { background: #1a1a2e; color: #fff; padding: 28px 32px; }
    .header h1 { margin: 0; font-size: 22px; }
    .header p  { margin: 6px 0 0; opacity: .7; font-size: 14px; }
    .body { padding: 32px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; }
    .detail-row:last-child { border-bottom: none; }
    .label { color: #888; }
    .code-box { background: #f8f8f8; border: 1px dashed #ccc; border-radius: 6px; padding: 14px 20px; text-align: center; margin: 24px 0; }
    .code-box .code { font-size: 20px; font-weight: bold; letter-spacing: 2px; color: #1a1a2e; }
    .footer { background: #f8f8f8; padding: 18px 32px; font-size: 12px; color: #aaa; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Received ✈️</h1>
      <p>Get Your Lounge — Request Confirmation</p>
    </div>
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>We've received your lounge booking request. It is currently <strong>pending review</strong>. You'll receive another email once it's confirmed.</p>

      <div class="detail-row"><span class="label">Lounge</span><span>${lounge.name}</span></div>
      <div class="detail-row"><span class="label">Airport</span><span>${lounge.airportCode}${lounge.terminal ? ' — ' + lounge.terminal : ''}</span></div>
      <div class="detail-row"><span class="label">Visit Date</span><span>${formatDate(booking.visitDate)}</span></div>
      <div class="detail-row"><span class="label">Guests</span><span>${booking.numberOfGuests}</span></div>
      <div class="detail-row"><span class="label">Total</span><span>${formatPrice(booking.totalPrice, booking.currency)}</span></div>
      ${booking.flightNumber ? `<div class="detail-row"><span class="label">Flight</span><span>${booking.flightNumber}</span></div>` : ''}

      <div class="code-box">
        <div style="font-size:12px;color:#888;margin-bottom:6px;">Your Booking Reference</div>
        <div class="code">${booking.confirmationCode}</div>
      </div>

      <p style="font-size:13px;color:#888;">Keep this reference number handy — you'll need it if you contact us about your booking.</p>
    </div>
    <div class="footer">Get Your Lounge &bull; <a href="mailto:support@getyourlounge.com">support@getyourlounge.com</a></div>
  </div>
</body>
</html>`;
}

function confirmationEmailHtml({ booking, lounge, user }) {
  const name = user.name || user.email;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
    .header { background: #0f5132; color: #fff; padding: 28px 32px; }
    .header h1 { margin: 0; font-size: 22px; }
    .header p  { margin: 6px 0 0; opacity: .7; font-size: 14px; }
    .body { padding: 32px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; }
    .detail-row:last-child { border-bottom: none; }
    .label { color: #888; }
    .code-box { background: #f0fff4; border: 2px solid #0f5132; border-radius: 6px; padding: 14px 20px; text-align: center; margin: 24px 0; }
    .code-box .code { font-size: 22px; font-weight: bold; letter-spacing: 2px; color: #0f5132; }
    .policy { background: #fafafa; border-left: 3px solid #ccc; padding: 12px 16px; margin-top: 24px; font-size: 13px; color: #666; line-height: 1.6; }
    .footer { background: #f8f8f8; padding: 18px 32px; font-size: 12px; color: #aaa; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Confirmed ✅</h1>
      <p>Get Your Lounge — Confirmation Receipt</p>
    </div>
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>Great news — your lounge booking has been <strong>confirmed</strong>! Present your confirmation code at the lounge entrance.</p>

      <div class="detail-row"><span class="label">Lounge</span><span>${lounge.name}</span></div>
      <div class="detail-row"><span class="label">Airport</span><span>${lounge.airportCode}${lounge.terminal ? ' — ' + lounge.terminal : ''}</span></div>
      <div class="detail-row"><span class="label">Visit Date</span><span>${formatDate(booking.visitDate)}</span></div>
      <div class="detail-row"><span class="label">Guests</span><span>${booking.numberOfGuests}</span></div>
      <div class="detail-row"><span class="label">Total Paid</span><span>${formatPrice(booking.totalPrice, booking.currency)}</span></div>
      ${booking.flightNumber ? `<div class="detail-row"><span class="label">Flight</span><span>${booking.flightNumber}</span></div>` : ''}

      <div class="code-box">
        <div style="font-size:12px;color:#0f5132;margin-bottom:6px;font-weight:600;">CONFIRMATION CODE</div>
        <div class="code">${booking.confirmationCode}</div>
      </div>

      <div class="policy">
        <strong>Cancellation Policy</strong><br>
        Free cancellation up to 24 hours before your visit date. Cancellations within 24 hours may be subject to a fee. To cancel, contact us with your confirmation code at <a href="mailto:support@getyourlounge.com">support@getyourlounge.com</a>.<br>
        <em>— Final cancellation policy copy to be updated —</em>
      </div>
    </div>
    <div class="footer">Get Your Lounge &bull; <a href="mailto:support@getyourlounge.com">support@getyourlounge.com</a></div>
  </div>
</body>
</html>`;
}

function cancellationEmailHtml({ booking, lounge, user }) {
  const name = user.name || user.email;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.1); }
    .header { background: #842029; color: #fff; padding: 28px 32px; }
    .header h1 { margin: 0; font-size: 22px; }
    .header p  { margin: 6px 0 0; opacity: .7; font-size: 14px; }
    .body { padding: 32px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 15px; }
    .label { color: #888; }
    .footer { background: #f8f8f8; padding: 18px 32px; font-size: 12px; color: #aaa; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Cancelled</h1>
      <p>Get Your Lounge — Cancellation Notice</p>
    </div>
    <div class="body">
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your booking has been <strong>cancelled</strong>. If you did not request this cancellation or have any questions, please contact us immediately.</p>
      <div class="detail-row"><span class="label">Lounge</span><span>${lounge.name}</span></div>
      <div class="detail-row"><span class="label">Airport</span><span>${lounge.airportCode}</span></div>
      <div class="detail-row"><span class="label">Visit Date</span><span>${formatDate(booking.visitDate)}</span></div>
      <div class="detail-row"><span class="label">Ref Code</span><span>${booking.confirmationCode}</span></div>
      <p style="margin-top:24px;">We hope to see you at one of our lounges in the future.</p>
    </div>
    <div class="footer">Get Your Lounge &bull; <a href="mailto:support@getyourlounge.com">support@getyourlounge.com</a></div>
  </div>
</body>
</html>`;
}

// ─── Exported Send Functions ──────────────────────────────────────────────────

/**
 * Send a PENDING confirmation email right after booking creation.
 * Never throws — failures are logged and swallowed.
 */
async function sendPendingEmail(booking, lounge, user) {
  const client = getClient();
  if (!client) return;

  try {
    const result = await client.emails.send({
      from:    FROM(),
      to:      [user.email],
      subject: `Booking Received — ${lounge.name} (${lounge.airportCode})`,
      html:    pendingEmailHtml({ booking, lounge, user }),
    });
    console.log(`[emailService] Pending email sent to ${user.email}:`, result.id);
  } catch (err) {
    console.error(`[emailService] Failed to send pending email to ${user.email}:`, err.message);
    throw err; // rethrow so caller can .catch() if needed
  }
}

/**
 * Send a CONFIRMED receipt email when booking status → CONFIRMED.
 */
async function sendConfirmationEmail(booking, lounge, user) {
  const client = getClient();
  if (!client) return;

  try {
    const result = await client.emails.send({
      from:    FROM(),
      to:      [user.email],
      subject: `Booking Confirmed ✅ — ${lounge.name} | Ref: ${booking.confirmationCode}`,
      html:    confirmationEmailHtml({ booking, lounge, user }),
    });
    console.log(`[emailService] Confirmation email sent to ${user.email}:`, result.id);
  } catch (err) {
    console.error(`[emailService] Failed to send confirmation email to ${user.email}:`, err.message);
    throw err;
  }
}

/**
 * Send a CANCELLED notice email.
 */
async function sendCancellationEmail(booking, lounge, user) {
  const client = getClient();
  if (!client) return;

  try {
    const result = await client.emails.send({
      from:    FROM(),
      to:      [user.email],
      subject: `Booking Cancelled — ${lounge.name} | Ref: ${booking.confirmationCode}`,
      html:    cancellationEmailHtml({ booking, lounge, user }),
    });
    console.log(`[emailService] Cancellation email sent to ${user.email}:`, result.id);
  } catch (err) {
    console.error(`[emailService] Failed to send cancellation email to ${user.email}:`, err.message);
    throw err;
  }
}

module.exports = { sendPendingEmail, sendConfirmationEmail, sendCancellationEmail };
