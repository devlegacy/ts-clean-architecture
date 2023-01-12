import { error, info } from '../../infrastructure/Logger'

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

export function Wait(ms = 6000): MethodDecorator {
  return function (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const decoratedMethod = descriptor.value
    descriptor.value = async function (...args: unknown[]) {
      info('Start wait')
      const start = performance.now()
      setTimeout(async () => {
        try {
          if (decoratedMethod.constructor.name === 'AsyncFunction') {
            await decoratedMethod.apply(this, args)
          } else {
            decoratedMethod.apply(this, args)
          }
        } catch (e) {
          error(e)
        }
        Promise.resolve()
        const end = performance.now()
        info(`End wait ${end - start}`)
      }, ms)
    }
    return descriptor
  }
}

export function AsyncWait(ms = 6000): MethodDecorator {
  return function (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const decoratedMethod = descriptor.value
    descriptor.value = async function (...args: unknown[]) {
      info('Start wait')
      const start = performance.now()
      setTimeout(async () => {
        await decoratedMethod.apply(this, args)

        const end = performance.now()
        info(`End wait ${end - start}`)
      }, ms)
    }
    return descriptor
  }
}
