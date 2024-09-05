import {
  env,
} from 'node:process'
import {
  styleText,
} from 'node:util'

env.SWCRC = true
env.TS_NODE_PROJECT = 'tsconfig.json'
env.FASTIFY_AUTOLOAD_TYPESCRIPT ??= 1
// process.env.NODE_OPTIONS = '--import @swc-node/register/esm-register'
// process.env.NODE_OPTIONS = '--loader ts-node/esm'

// eslint-disable-next-line no-console
console.log(styleText(
  'green',
  JSON.stringify(
    {
      // Node.js environment variables
      NODE_ENV: env.NODE_ENV || null,
      NODE_OPTIONS: env.NODE_OPTIONS || null,
      TZ: env.TZ || null,

      // TypeScript environment variables
      SWCRC: env.SWCRC || null,
      TS_NODE_PROJECT: env.TS_NODE_PROJECT || null,
      FASTIFY_AUTOLOAD_TYPESCRIPT: env.FASTIFY_AUTOLOAD_TYPESCRIPT || null,

      // Custom environment variables
      APP_ENV: env.APP_ENV || null,
    },
    null,
    2,
  ),
))

// 'npx cross-env TS_NODE_PROJECT=tsconfig.json',
// '--import tsconfig-paths/register', // Load TS Config Paths module
// '--import ts-node/register/transpile-only', // Load TypeScript module
// '--loader @swc-node/register/esm-register',
// REVIEW: In Github CI. Cannot use 'progress-bar' formatter for output to 'stdout' as not a TTY. Switching to 'progress' formatter.
// '--format progress-bar',
const common = []

export const mooc_backend = [
  ...common,
  'tests/apps/mooc/backend/features/**/*.feature', // Specify our feature files
  '--import tests/apps/mooc/backend/features/step_definitions/*.steps.ts', // Load step definitions
  // '--publish-quiet',
  '--format progress-bar', // Load custom formatter
].join(' ')

export const backoffice_backend = [
  ...common,
  'tests/apps/backoffice/backend/features/**/*.feature', // Specify our feature files
  '--import tests/apps/backoffice/backend/features/step_definitions/*.steps.ts', // Load step definitions
  // '--publish-quiet',
  '--format progress-bar', // Load custom formatter
].join(' ')

export default {
  mooc_backend,
  backoffice_backend,
}
