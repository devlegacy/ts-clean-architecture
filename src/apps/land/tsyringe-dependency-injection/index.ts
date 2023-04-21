import config from '@/Contexts/Land/Shared/infrastructure/config'

// eslint-disable-next-line security/detect-non-literal-require
require(`./${config.get('app.env')}/`)
