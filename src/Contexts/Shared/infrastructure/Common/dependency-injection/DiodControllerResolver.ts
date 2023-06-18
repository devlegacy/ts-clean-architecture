import { Container } from 'diod'

import { ControllerResolver } from '@/Contexts/Shared/domain/Common'

export const DiodControllerResolver =
  (container: Container): ControllerResolver =>
  (controller: Class<unknown>) => {
    const instance = container.get(controller) ?? new controller()

    return instance
  }
