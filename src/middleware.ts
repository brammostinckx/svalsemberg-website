import { defineMiddleware } from 'astro:middleware';

// Keystatic reads env vars from process.env internally.
// On Cloudflare Workers, dashboard variables are only available as runtime bindings.
// This middleware safely copies them to process.env before Keystatic routes run.
export const onRequest = defineMiddleware((context, next) => {
  try {
    const r = (context.locals as any)?.runtime?.env;
    if (r && typeof process !== 'undefined' && process.env) {
      if (r.KEYSTATIC_GITHUB_CLIENT_ID)
        process.env.KEYSTATIC_GITHUB_CLIENT_ID = r.KEYSTATIC_GITHUB_CLIENT_ID;
      if (r.KEYSTATIC_GITHUB_CLIENT_SECRET)
        process.env.KEYSTATIC_GITHUB_CLIENT_SECRET = r.KEYSTATIC_GITHUB_CLIENT_SECRET;
      if (r.KEYSTATIC_SECRET)
        process.env.KEYSTATIC_SECRET = r.KEYSTATIC_SECRET;
    }
  } catch {
    // Never crash the site - silently ignore if anything goes wrong
  }
  return next();
});
