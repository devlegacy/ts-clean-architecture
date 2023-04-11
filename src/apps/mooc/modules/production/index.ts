import 'reflect-metadata'

import { ContainerBuilder } from 'diod'

export const modules: any[] = []
export const builder = new ContainerBuilder()

const containerBuilder = (registers: any[]) => {
  modules.forEach((mod) => mod(builder))
  registers.forEach((register) => builder.registerAndUse(register))

  return builder.build()
}
export const container = containerBuilder([])
