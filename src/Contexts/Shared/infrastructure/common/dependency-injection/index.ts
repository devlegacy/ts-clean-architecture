import type { Class } from 'type-fest'

export type ControllerResolver = (controller: Class<any>) => InstanceType<any>
export * from './DiodControllerResolver'
export * from './TsyringeControllerResolver'
export * from './types'
