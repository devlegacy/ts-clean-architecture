import config from '@/Contexts/Backoffice/Shared/infrastructure/config'

// eslint-disable-next-line security/detect-non-literal-require
require(`./container/${config.get('app.env')}.ts`)
