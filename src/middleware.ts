import { defineMiddleware } from 'astro:middleware';

// Cloudflare Workers exposes dashboard variables via context.locals.runtime.env,
// but Keystatic reads them from process.env internally.
// This middleware bridges the gap before Keystatic's route handlers run.
export const onRequest = defineMiddleware((context, next) => {
  if (typeof process !== 'undefined') {
    // Try Cloudflare Workers runtime env (most reliable)
    const runtimeEnv = (context.locals as any)?.runtime?.env;
    if (runtimeEnv) {
      if (runtimeEnv.KEYSTATIC_GITHUB_CLIENT_ID)
        process.env['KEYSTATIC_GITHUB_CLIENT_ID'] = runtimeEnv.KEYSTATIC_GITHUB_CLIENT_ID;
      if (runtimeEnv.KEYSTATIC_GITHUB_CLIENT_SECRET)
        process.env['KEYSTATIC_GITHUB_CLIENT_SECRET'] = runtimeEnv.KEYSTATIC_GITHUB_CLIENT_SECRET;
      if (runtimeEnv.KEYSTATIC_SECRET)
        process.env['KEYSTATIC_SECRET'] = runtimeEnv.KEYSTATIC_SECRET;
    }
  }
  return next();
});
