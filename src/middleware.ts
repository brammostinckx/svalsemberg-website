import { defineMiddleware } from 'astro:middleware';

// @keystatic/astro uses Astro.locals.runtime.env internally (old Astro v5 API).
// In Astro v6 with @astrojs/cloudflare, this API was removed.
// This middleware restores it using the new cloudflare:workers module,
// so Keystatic can find the environment variables it needs.
export const onRequest = defineMiddleware(async (context, next) => {
  try {
    // Dynamically import cloudflare:workers so local dev doesn't break
    const cloudflare = await import('cloudflare:workers').catch(() => null);
    if (cloudflare?.env) {
      const cfEnv = cloudflare.env as Record<string, string>;
      // Restore locals.runtime.env that @keystatic/astro expects
      (context.locals as any).runtime = { env: cfEnv };
      // Also copy to process.env for Keystatic's internal env reading
      if (typeof process !== 'undefined' && process.env) {
        if (cfEnv.KEYSTATIC_GITHUB_CLIENT_ID)
          process.env.KEYSTATIC_GITHUB_CLIENT_ID = cfEnv.KEYSTATIC_GITHUB_CLIENT_ID;
        if (cfEnv.KEYSTATIC_GITHUB_CLIENT_SECRET)
          process.env.KEYSTATIC_GITHUB_CLIENT_SECRET = cfEnv.KEYSTATIC_GITHUB_CLIENT_SECRET;
        if (cfEnv.KEYSTATIC_SECRET)
          process.env.KEYSTATIC_SECRET = cfEnv.KEYSTATIC_SECRET;
      }
    }
  } catch {
    // Never crash the site - silently ignore any errors
  }
  return next();
});
