import {
  type Container,
} from 'diod'

import config from '#@/src/Contexts/Land/Shared/infrastructure/config/index.js'

const {
  container,
// eslint-disable-next-line security/detect-non-literal-require, @typescript-eslint/no-require-imports
} = require(`./${config.get('app.env')}/`) as { container: Container }

export {
  container
}
