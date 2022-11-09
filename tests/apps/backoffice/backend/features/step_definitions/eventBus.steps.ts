import { Given } from '@cucumber/cucumber'

import { DomainEventDeserializer, DomainEventSubscribers } from '@/Contexts/Shared/infrastructure/EventBus'

import { eventBus } from './hooks.steps'

const deserializer = buildDeserializer()

Given('the following event is received:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event)

  await eventBus.publish([domainEvent])
  await wait(800)
})

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from()

  return DomainEventDeserializer.configure(subscribers)
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
