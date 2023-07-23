import { ContainerBuilder } from 'diod'

import { registeredModules } from '@/Contexts/Shared/domain/Common'

import { SharedModule } from './SharedModule'
import { UserModule } from './UserModule'

const modules = [SharedModule, UserModule]
const builder = new ContainerBuilder()

const containerBuilder = (registers: Class<unknown>[]) => {
  modules.forEach((register) => register(builder))
  registers.forEach((register) => builder.registerAndUse(register))

  // key, registeredModule
  for (const [key, registeredModule] of registeredModules) {
    for (const element of registeredModule) {
      console.log(key, registeredModule, element)
      // builder.registerAndUse(element).addTag(key)
    }
  }
  return builder.build()
}
export const container = containerBuilder([])
