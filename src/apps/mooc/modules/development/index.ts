import 'reflect-metadata'

import { ContainerBuilder } from 'diod'

import { registeredModules } from '@/Contexts/Shared/domain'

import { CourseModule } from './CourseModule'
import { CoursesCounterModule } from './CoursesCounterModule'
import { SharedModule } from './SharedModule'
import { StatusModule } from './StatusModule'

export const modules = [SharedModule, StatusModule, CourseModule, CoursesCounterModule]
export const builder = new ContainerBuilder()

const containerBuilder = (registers: any[]) => {
  modules.forEach((mod) => mod(builder))
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
