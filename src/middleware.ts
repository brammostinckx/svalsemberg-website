import { defineMiddleware } from 'astro:middleware';

// Cloudflare Workers exposes dashboard variables via import.meta.env,
// but Keystatic reads them from process.env internally.
// This middleware bridges the gap.
export const onRequest = defineMiddleware((_context, next) => {
  if (typeof process !== 'undefined') {
    if (import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID)
      process.env['KEYSTATIC_GITHUB_CLIENT_ID'] = import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID;
    if (import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET)
      process.env['KEYSTATIC_GITHUB_CLIENT_SECRET'] = import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
    if (import.meta.env.KEYSTATIC_SECRET)
      process.env['KEYSTATIC_SECRET'] = import.meta.env.KEYSTATIC_SECRET;
  }
  return next();
});
