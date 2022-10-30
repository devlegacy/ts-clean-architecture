import config from '@/Contexts/Mooc/Shared/infrastructure/config'

import { TYPES } from './types'

// let containerInstance: DependencyContainer | null = null

const containerBuilder = async () => {
  //   if (containerInstance) return containerInstance
  // !String(process.env.npm_lifecycle_event).includes('tests')
  await import(`./container/${config.get('app.env')}.ts`)
  // container.dispose()
  // containerInstance = container
  // return containerInstance
}

export default containerBuilder

export {
  // containerBuilder
  TYPES
}
