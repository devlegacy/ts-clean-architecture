import { ControllerResolver } from './index'

export const DiodControllerResolver: ControllerResolver = (controller, container) => {
  const instance = container.get(controller)

  return instance
}
