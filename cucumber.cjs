const common = [
  'npx cross-env TS_NODE_PROJECT=tsconfig.json',
  '--require-module tsconfig-paths/register', // Load TS Config Paths module
  '--require-module ts-node/register/transpile-only',    // Load TypeScript module
];

const mooc_backend = [
  ...common,
  'tests/apps/mooc/backend/features/**/*.feature', // Specify our feature files
  '--require tests/apps/mooc/backend/features/step_definitions/*.steps.ts', // Load step definitions
  '--publish-quiet',
  '--format progress-bar', // Load custom formatter
].join(' ');

const backoffice_backend = [
  ...common,
  'tests/apps/backoffice/backend/features/**/*.feature', // Specify our feature files
  '--require tests/apps/backoffice/backend/features/step_definitions/*.steps.ts', // Load step definitions
  '--publish-quiet',
  '--format progress-bar', // Load custom formatter
].join(' ');


module.exports = {
  mooc_backend,
  backoffice_backend
};
