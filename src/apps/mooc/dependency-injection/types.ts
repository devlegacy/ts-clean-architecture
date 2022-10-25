import { SHARED_TYPES } from '@/Contexts/Shared/infrastructure/common'

export const TYPES = {
  ...SHARED_TYPES,
  // Infrastructure
  EventBus: Symbol('EventBus'),
  // Rabbit
  RabbitMQConfig: Symbol('RabbitMQConfig'),
  RabbitMQConnection: Symbol('RabbitMQConnection'),
  RabbitMQConfigurer: Symbol('RabbitMQConfigurer'),
  CommandBus: Symbol('CommandBus'),
  QueryBus: Symbol('QueryBus'),
  // Application
  // Subscribers
  DomainEventSubscriber: Symbol('DomainEventSubscriber'),
  // Command - application tag
  CommandHandler: Symbol('CommandHandler'),
  // Query - application tag
  QueryHandler: Symbol('QueryHandler'),
  // Domain
  CourseRepository: Symbol('CourseRepository'),
  CoursesCounterRepository: Symbol('CoursesCounterRepository'),
  // Test
  EnvironmentArranger: Symbol('EnvironmentArranger')
}
