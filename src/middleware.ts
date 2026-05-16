import { defineMiddleware } from 'astro:middleware';

// @keystatic/astro uses Astro.locals.runtime.env (removed in Astro v6).
// Astro v6 defines locals.runtime with configurable:false, so we can't replace it.
// BUT the individual getters on that runtime object ARE configurable.
// We redefine the env getter to return real Cloudflare env bindings.
export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const cloudflare = await import('cloudflare:workers').catch(() => null);
    if (cloudflare?.env) {
      const cfEnv = cloudflare.env as Record<string, string>;

      // Redefine the throwing env getter with one that returns real env
      const runtime = (context.locals as any).runtime;
      if (runtime) {
        Object.defineProperty(runtime, 'env', {
          configurable: true,
          enumerable: true,
          get() { return cfEnv; },
        });
      }

      // Also copy to process.env for Keystatic's internal reading
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
    // Never crash the site
  }
  return next();
});
