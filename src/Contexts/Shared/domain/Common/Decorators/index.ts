import { Constructor } from 'type-fest'

import { error, info } from '@/Contexts/Shared/infrastructure/Logger'

import { Command } from '../../Commands'
import { DomainEventClass } from '../../Events'
import { Query } from '../../Queries'
import {
  COMMAND_HANDLER_METADATA,
  EVENTS_HANDLER_METADATA,
  QUERY_HANDLER_METADATA,
  SHARED_TAGS,
} from '../../shared.types'

export * from './core'
export * from './http'

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

export const registeredModules = new Map<string, Set<any>>()

export const UseCase = () => {
  return (target: any): any => {
    if (!registeredModules.has(SHARED_TAGS.UseCase)) registeredModules.set(SHARED_TAGS.UseCase, new Set())
    if (!registeredModules.get(SHARED_TAGS.UseCase)?.has(target))
      registeredModules.get(SHARED_TAGS.UseCase)?.add(target)

    return target
  }
}

export const DomainEventSubscriber = (...events: DomainEventClass[]) => {
  return (target: any): any => {
    if (!registeredModules.has(SHARED_TAGS.DomainEventSubscriber))
      registeredModules.set(SHARED_TAGS.DomainEventSubscriber, new Set())
    if (!registeredModules.get(SHARED_TAGS.DomainEventSubscriber)?.has(target))
      registeredModules.get(SHARED_TAGS.DomainEventSubscriber)?.add(target)

    if (!Reflect.hasMetadata(EVENTS_HANDLER_METADATA, target))
      Reflect.defineMetadata(EVENTS_HANDLER_METADATA, [], target)

    Reflect.defineMetadata(
      EVENTS_HANDLER_METADATA,
      Reflect.getMetadata(EVENTS_HANDLER_METADATA, target).concat(events),
      target
    )

    return target
  }
}

export const CommandHandler = (command: Command | Constructor<Command>): ClassDecorator => {
  return (target: object): any => {
    if (!registeredModules.has(SHARED_TAGS.CommandHandler)) registeredModules.set(SHARED_TAGS.CommandHandler, new Set())
    if (!registeredModules.get(SHARED_TAGS.CommandHandler)?.has(target))
      registeredModules.get(SHARED_TAGS.CommandHandler)?.add(target)

    Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, target)

    return target
  }
}

export const QueryHandler = (query: Query): ClassDecorator => {
  return (target: any): any => {
    if (!registeredModules.has(SHARED_TAGS.QueryHandler)) registeredModules.set(SHARED_TAGS.QueryHandler, new Set())
    if (!registeredModules.get(SHARED_TAGS.QueryHandler)?.has(target))
      registeredModules.get(SHARED_TAGS.QueryHandler)?.add(target)

    Reflect.defineMetadata(QUERY_HANDLER_METADATA, query, target)

    return target
  }
}
