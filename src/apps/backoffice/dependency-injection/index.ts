import config from '@/Contexts/Backoffice/Shared/infrastructure/config'

// eslint-disable-next-line security/detect-non-literal-require
export default require(`./container/${config.get('app.env')}.ts`)
