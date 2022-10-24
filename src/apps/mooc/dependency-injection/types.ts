import { SHARED_TYPES } from '@/Contexts/Shared/infrastructure/common'

export const TYPES = {
  ...SHARED_TYPES,
  EventBus: Symbol('EventBus'),
  CourseRepository: Symbol('CourseRepository'),
  CoursesCounterRepository: Symbol('CoursesCounterRepository'),
  // Rabbit
  RabbitMQConfig: Symbol('RabbitMQConfig'),
  RabbitMQConnection: Symbol('RabbitMQConnection'),
  RabbitMQConfigurer: Symbol('RabbitMQConfigurer'),
  // Command
  CommandHandler: Symbol('CommandHandler'),
  CommandBus: Symbol('CommandBus'),
  // Test
  EnvironmentArranger: Symbol('EnvironmentArranger')
}
