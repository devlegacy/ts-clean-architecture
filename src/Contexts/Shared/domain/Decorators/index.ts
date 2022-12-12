import { error } from '../../infrastructure/logger'

export function Catch(): MethodDecorator {
  // Receives the target, key and descriptor
  return function (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const decoratedMethod = descriptor.value
    descriptor.value = async function (...args: unknown[]) {
      // setTimeout(async () => {
      try {
        if (decoratedMethod.constructor.name === 'AsyncFunction') {
          await decoratedMethod.apply(this, args)
        } else {
          decoratedMethod.apply(this, args)
        }
      } catch (e) {
        error(e)
      }
      // Promise.resolve()
      // }, 3000)
    }
    return descriptor
  }
}
