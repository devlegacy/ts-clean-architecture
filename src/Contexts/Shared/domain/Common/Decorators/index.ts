import { error, info } from '@/Contexts/Shared/infrastructure/Logger/index.js'

import { Command } from '../../Commands/index.js'
import type { DomainEventClass } from '../../Events/index.js'
import { Query } from '../../Queries/index.js'
import {
  COMMAND_HANDLER_METADATA,
  EVENTS_HANDLER_METADATA,
  QUERY_HANDLER_METADATA,
  SHARED_TAGS,
} from '../../shared.types.js'

export * from './core/index.js'
export * from './http/index.js'

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

export const registeredModules = new Map<keyof typeof SHARED_TAGS, Set<object>>()

const registerModule = (tag: keyof typeof SHARED_TAGS, target: object) => {
  if (!registeredModules.has(tag)) registeredModules.set(tag, new Set())

  const mapping = registeredModules.get(tag)
  if (!mapping?.has(target)) mapping?.add(target)
}

export const UseCase = () => {
  return (target: object): any => {
    registerModule(SHARED_TAGS.UseCase, target)
    return target
  }
}

export const DomainEventSubscribers = (...events: DomainEventClass[]) => {
  return (target: object): any => {
    if (!registeredModules.has(SHARED_TAGS.DomainEventSubscriber))
      registeredModules.set(SHARED_TAGS.DomainEventSubscriber, new Set())
    if (!registeredModules.get(SHARED_TAGS.DomainEventSubscriber)?.has(target))
      registeredModules.get(SHARED_TAGS.DomainEventSubscriber)?.add(target)

    if (!Reflect.hasMetadata(EVENTS_HANDLER_METADATA, target))
      Reflect.defineMetadata(EVENTS_HANDLER_METADATA, [], target)

    Reflect.defineMetadata(
      EVENTS_HANDLER_METADATA,
      Reflect.getMetadata(EVENTS_HANDLER_METADATA, target).concat(events),
      target,
    )

    return target
  }
}

export const CommandHandlerSubscriber = (command: Command | Constructor<Command>): ClassDecorator => {
  return (target: object): any => {
    registerModule(SHARED_TAGS.CommandHandler, target)
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, target)

    return target
  }
}

export const QueryHandlerSubscriber = (query: Query): ClassDecorator => {
  return (target: object): any => {
    registerModule(SHARED_TAGS.QueryHandler, target)
    Reflect.defineMetadata(QUERY_HANDLER_METADATA, query, target)

    return target
  }
}
