import { Given } from '@cucumber/cucumber'

import { container } from '@/apps/backoffice/modules'
import { DomainEventDeserializer, DomainEventSubscriberResolver } from '@/Contexts/Shared/infrastructure/EventBus'
import { wait } from '@/tests/Contexts/Shared/domain'

import { eventBus } from './hooks.steps'

const deserializer = buildDeserializer()

Given('the following event is received:', async (event: any) => {
  const domainEvent = deserializer.deserialize(event)

  await eventBus.publish([domainEvent])
  await wait()
})

function buildDeserializer() {
  const subscribers = DomainEventSubscriberResolver.fromContainer(container)

  return DomainEventDeserializer.configure(subscribers)
}
