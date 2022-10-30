import config from '@/Contexts/Mooc/Shared/infrastructure/config'

import { TYPES } from './types'

// let containerInstance: DependencyContainer | null = null

//   if (containerInstance) return containerInstance
// !String(process.env.npm_lifecycle_event).includes('tests')
// eslint-disable-next-line security/detect-non-literal-require
require(`./container/${config.get('app.env')}.ts`)
// container.dispose()
// containerInstance = container
// return containerInstance

export {
  // containerBuilder
  TYPES
}
