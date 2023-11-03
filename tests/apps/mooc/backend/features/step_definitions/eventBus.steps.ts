import { When } from '@cucumber/cucumber'

import { container } from '@/apps/mooc/modules/index.js'
import {
  DomainEventDeserializer,
  DomainEventSubscriberResolver,
} from '@/Contexts/Shared/infrastructure/EventBus/index.js'
import { wait } from '@/tests/Contexts/Shared/domain/index.js'

import { eventBus } from './hooks.steps.js'

const deserializer = buildDeserializer()

When('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event)

  await eventBus.publish([domainEvent])
  await wait()
})

function buildDeserializer() {
  const subscribers = DomainEventSubscriberResolver.fromContainer(container)

  return DomainEventDeserializer.configure(subscribers)
}
