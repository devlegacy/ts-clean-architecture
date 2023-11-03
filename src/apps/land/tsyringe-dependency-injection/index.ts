import config from '@/Contexts/Land/Shared/infrastructure/config/index.js'

// eslint-disable-next-line security/detect-non-literal-require
require(`./${config.get('app.env')}/`)
