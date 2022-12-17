import { Given } from '@cucumber/cucumber'

import { DomainEventDeserializer, DomainEventSubscribers } from '@/Contexts/Shared/infrastructure/EventBus'

import { eventBus, wait } from './hooks.steps'

const deserializer = buildDeserializer()

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event)

  await eventBus.publish([domainEvent])
  await wait()
})

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from()

  return DomainEventDeserializer.configure(subscribers)
}
