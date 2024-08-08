import {
  Given,
} from '@cucumber/cucumber'

import {
  container,
} from '#@/src/apps/backoffice/modules/index.js'
import {
  DomainEventDeserializer,
  DomainEventSubscriberResolver,
} from '#@/src/Contexts/Shared/infrastructure/EventBus/index.js'
import {
  wait,
} from '#@/tests/Contexts/Shared/domain/index.js'

import {
  eventBus,
} from './hooks.steps.js'

function buildDeserializer() {
  const subscribers = DomainEventSubscriberResolver.fromContainer(container)

  return DomainEventDeserializer.configure(subscribers)
}

const deserializer = buildDeserializer()

Given('the following event is received:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event)

  await eventBus.publish([
    domainEvent,
  ])
  await wait()
})
