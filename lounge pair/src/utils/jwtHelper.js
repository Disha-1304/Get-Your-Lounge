/**
 * jwtHelper.js
 * ────────────────────────────────────────────────────────────
 * Client-side HS256 JWT builder for Parent App identity handoff.
 * Uses native Web Crypto API (supported in all modern browsers).
 */

export async function createParentAppJwt(user, secret = 'parent_app_jwt_secret_dev_key') {
  const userId = user?.id || user?.userId || `user_${(user?.email || 'guest').replace(/[^a-zA-Z0-9]/g, '_')}`;
  const email  = user?.email || 'passenger@example.com';
  const name   = user?.name  || 'Passenger';
  const phone  = user?.phone || user?.fullPhone || '';

  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    userId,
    email,
    name,
    phone,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (3600 * 24), // 24 hour expiry
  };

  const base64UrlEncode = (obj) => {
    const str = JSON.stringify(obj);
    const base64 = btoa(unescape(encodeURIComponent(str)));
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };

  const encodedHeader  = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const dataToSign     = `${encodedHeader}.${encodedPayload}`;

  const encoder     = new TextEncoder();
  const keyData     = encoder.encode(secret);
  const messageData = encoder.encode(dataToSign);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const signatureArray = Array.from(new Uint8Array(signature));
  const signatureBase64Url = btoa(String.fromCharCode.apply(null, signatureArray))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${dataToSign}.${signatureBase64Url}`;
}
