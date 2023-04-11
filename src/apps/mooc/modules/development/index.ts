import 'reflect-metadata'

import { ContainerBuilder } from 'diod'

import { Class, registeredModules } from '@/Contexts/Shared/domain'

import { CourseModule } from './CourseModule'
import { CoursesCounterModule } from './CoursesCounterModule'
import { SharedModule } from './SharedModule'
import { StatusModule } from './StatusModule'

// DEBT: It can be change by glob loader
const modules = [SharedModule, StatusModule, CourseModule, CoursesCounterModule]
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
