import 'reflect-metadata'

import {
  ContainerBuilder,
} from 'diod'

import {
  registeredModules,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

import {
  CourseModule,
} from './CourseModule.js'
import {
  CoursesCounterModule,
} from './CoursesCounterModule.js'
import {
  SharedModule,
} from './SharedModule.js'
import {
  StatusModule,
} from './StatusModule.js'

// DEBT: It can be change by glob loader
const modules = [
  SharedModule,
  StatusModule,
  CourseModule,
  CoursesCounterModule,
]
const builder = new ContainerBuilder()

const containerBuilder = (registers: Class<unknown>[]) => {
  modules.forEach((register) => register(builder))
  registers.forEach((register) => builder.registerAndUse(register))

  // key, registeredModule
  for (const [
    key,
    registeredModule,
  ] of registeredModules) {
    for (const element of registeredModule) {
      // eslint-disable-next-line no-console
      console.log(key, registeredModule, element)
      // builder.registerAndUse(element).addTag(key)
    }
  }
  return builder.build()
}
export const container = containerBuilder([])
