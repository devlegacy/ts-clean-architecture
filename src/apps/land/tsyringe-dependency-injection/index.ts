import config from '#@/src/Contexts/Land/Shared/infrastructure/config/index.js'

// eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-require-imports
require(`./${config.get('app.env')}/`)
