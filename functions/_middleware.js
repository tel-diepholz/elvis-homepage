// www.einsatzleitwagen.app → einsatzleitwagen.app (dauerhaft, Pfad und Query bleiben erhalten)
const CANONICAL = 'einsatzleitwagen.app';

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === `www.${CANONICAL}`) {
    url.hostname = CANONICAL;
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
