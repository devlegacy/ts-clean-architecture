import type { Container } from 'diod'

import type { ControllerResolver } from '@/Contexts/Shared/domain/Common/index.js'

export const DiodControllerResolver =
  (container: Container): ControllerResolver =>
  (controller: Class<unknown>) => {
    const instance = container.get(controller) ?? new controller()

    return instance
  }
