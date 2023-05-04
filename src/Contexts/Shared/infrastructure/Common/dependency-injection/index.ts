export type ControllerResolver = (controller: Class<any>, container?: any) => InstanceType<any>

export * from './DiodControllerResolver'
export * from './TsyringeControllerResolver'
