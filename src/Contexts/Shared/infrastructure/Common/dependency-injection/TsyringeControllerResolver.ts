import {
  container, injectable, Lifecycle,
} from 'tsyringe'

import type {
  ControllerResolver,
} from '#@/src/Contexts/Shared/domain/Common/index.js'

export const TsyringeControllerResolver: ControllerResolver = (controller: Class<unknown>) => {
  const {
    name,
  } = controller
  if (!container.isRegistered(name)) {
    injectable()(controller)

    container.register(
      name,
      {
        useClass: controller,
      },
      {
        lifecycle: Lifecycle.Singleton,
      },
    )
  }
  // This is our instantiated class
  const instance = container.isRegistered(name) ? container.resolve(name) : new controller()
  // const instance = container.isRegistered(name) ? container.resolve(delay(() => controller)) : new controller()

  return instance
}
