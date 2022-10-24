import { DomainEvent, DomainEventSubscriber } from '@/Contexts/Shared/domain'

export class RabbitMQQueueFormatter {
  constructor(private moduleName: string) {}

  format(subscriber: DomainEventSubscriber<DomainEvent>) {
    const value = subscriber.constructor.name
    const name = value
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase()
    return `${this.moduleName}.${name}`
  }

  formatRetry(subscriber: DomainEventSubscriber<DomainEvent>) {
    const name = this.format(subscriber)
    return `retry.${name}`
  }

  formatDeadLetter(subscriber: DomainEventSubscriber<DomainEvent>) {
    const name = this.format(subscriber)
    return `dead_letter.${name}`
  }
}
