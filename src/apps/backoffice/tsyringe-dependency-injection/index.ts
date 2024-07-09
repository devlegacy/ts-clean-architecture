import {
  config,
} from '#@/src/Contexts/Backoffice/Shared/infrastructure/index.js'

// eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-require-imports
require(`./container/${config.get('app.env')}.ts`)
