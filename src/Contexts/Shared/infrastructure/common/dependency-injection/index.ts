import { Instance } from 'ts-toolbelt/out/Class/Instance'
import { Class } from 'type-fest'

export type ControllerResolver = (controller: Class<any>) => Instance<any>
export * from './DiodControllerResolver'
export * from './TsyringeControllerResolver'
export * from './types'
