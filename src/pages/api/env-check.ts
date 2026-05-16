export const prerender = false;

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ locals }) => {
  const runtimeEnv = (locals as any)?.runtime?.env ?? {};

  return Response.json({
    runtime_env_keys: Object.keys(runtimeEnv),
    has_client_id: !!(runtimeEnv.KEYSTATIC_GITHUB_CLIENT_ID || import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID),
    has_client_secret: !!(runtimeEnv.KEYSTATIC_GITHUB_CLIENT_SECRET || import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET),
    has_secret: !!(runtimeEnv.KEYSTATIC_SECRET || import.meta.env.KEYSTATIC_SECRET),
    process_env_client_id: !!process.env['KEYSTATIC_GITHUB_CLIENT_ID'],
    import_meta_client_id: !!import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID,
  });
};
