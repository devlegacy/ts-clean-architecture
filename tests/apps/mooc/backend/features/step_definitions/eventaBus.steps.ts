import './hooks.steps'

import { Given } from '@cucumber/cucumber'
import { container } from 'tsyringe'

import { TYPES } from '@/apps/mooc/dependency-injection'
import { EventBus } from '@/Contexts/Shared/domain'
import { DomainEventDeserializer, DomainEventSubscribers } from '@/Contexts/Shared/infrastructure/EventBus'

const eventBus = container.resolve<EventBus>(TYPES.EventBus)
const deserializer = buildDeserializer()

Given('I send an event to the event bus:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event)

  await eventBus.publish([domainEvent])
  await wait(500)
})

function buildDeserializer() {
  const subscribers = DomainEventSubscribers.from()

  return DomainEventDeserializer.configure(subscribers)
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
