import 'reflect-metadata'

import { ContainerBuilder } from 'diod'

import { registeredModules } from '@/Contexts/Shared/domain/Common'

import { BlockModule } from './BlockModule'
import { LotModule } from './LotModule'
import { SharedModule } from './SharedModule'

// DEBT: It can be change by glob loader
const modules = [SharedModule, BlockModule, LotModule]
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
