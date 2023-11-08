const common = [
  'npx cross-env TS_NODE_PROJECT=tsconfig.json',
  // '--import tsconfig-paths/register', // Load TS Config Paths module
  // '--import ts-node/register/transpile-only', // Load TypeScript module
];

export const mooc_backend = [
  ...common,
  'tests/apps/mooc/backend/features/**/*.feature', // Specify our feature files
  '--import tests/apps/mooc/backend/features/step_definitions/*.steps.ts',  // Load step definitions
  // '--publish-quiet',
  '--format progress-bar', // Load custom formatter
].join(' ');

export const backoffice_backend = [
  ...common,
  'tests/apps/backoffice/backend/features/**/*.feature', // Specify our feature files
  '--import tests/apps/backoffice/backend/features/step_definitions/*.steps.ts', // Load step definitions
  // '--publish-quiet',
  '--format progress-bar', // Load custom formatter
].join(' ');


export default {
  mooc_backend,
  backoffice_backend
};
