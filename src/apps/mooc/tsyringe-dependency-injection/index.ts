// let containerInstance: DependencyContainer | null = null

import { config } from '@/Contexts/Mooc/Shared/infrastructure/index.js'

// let isContainerInstanceLoaded = false
// const containerBuilder = () => {
// if (isContainerInstanceLoaded) return
// !String(process.env.npm_lifecycle_event).includes('tests')

// isContainerInstanceLoaded = true
// eslint-disable-next-line security/detect-non-literal-require
// require(`./container/${config.get('app.env')}.ts`)

// container.dispose()
// containerInstance = container
// return containerInstance
// }

// eslint-disable-next-line security/detect-non-literal-require
require(`./container/${config.get('app.env')}.ts`)

// Shared
// const mongoConfig = MongoConfigFactory.createConfig()
// const mongoClient = MikroORMMongoClientFactory.createClient('mooc', mongoConfig)
// const rabbitConfig = RabbitMQConfigFactory.createConfig()
// const rabbitConnection = new RabbitMQConnection(rabbitConfig)
// const rabbitConfigure = new RabbitMQConfigurer(rabbitConnection, new RabbitMQQueueFormatter('mooc'), 50)

// // Infrastructure layer
// container
//   // Bootstrap global dependencies
//   // .register<ConfigService>(TYPES.config, { useValue: config })
//   // Database - MongoClient
//   .register<MongoConfig>(TYPES.MongoConfig, { useValue: mongoConfig })
//   .register<Promise<MikroORM<MongoDriver>>>(TYPES.MongoClient, { useValue: mongoClient })
//   // .register<TypeOrmConfig>(TYPES.TypeOrmConfig, { useValue: TypeOrmConfigFactory.createConfig() })
//   // .register<Promise<DataSource>>(TYPES.TypeOrmClient, {
//   //   useValue: TypeOrmClientFactory.createClient('mooc', container.resolve<TypeOrmConfig>(TYPES.TypeOrmConfig))
//   // })
//   // EventBus - InMemory - Infrastructure
//   .register<EventBus>(TYPES.EventBus, InMemoryAsyncEventBus, { lifecycle: Lifecycle.Singleton })
//   // RabbitMQ - EventBus
//   .register<RabbitMQConfig>(TYPES.RabbitMQConfig, { useValue: rabbitConfig })
//   .register<RabbitMQConnection>(TYPES.RabbitMQConnection, { useValue: rabbitConnection })
//   .register<RabbitMQConfigurer>(TYPES.RabbitMQConfigurer, { useValue: rabbitConfigure })
//   // CommandBus - InMemory - Infrastructure
//   .register<CommandBus>(TYPES.CommandBus, InMemoryCommandBus, { lifecycle: Lifecycle.Singleton })
//   // QueryBus - InMemory - Infrastructure
//   .register<QueryBus>(TYPES.QueryBus, InMemoryQueryBus, { lifecycle: Lifecycle.Singleton })

// // Courses
// // Application layer
// container
//   // EventBus <-> EventSubscribers
//   // CommandBus <-> CommandHandlers
//   // Tags - Application
//   .register<CommandHandler<Command>>(TYPES.CommandHandler, CreateCourseCommandHandler)
//   // QueryBus <-> QueryHandlers
//   // Tags - Application
//   .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchAllCoursesQueryHandler)
//   .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, SearchCoursesByCriteriaQueryHandler)
//   .register<QueryHandler<Query, Response>>(TYPES.QueryHandler, FindCoursesCounterQueryHandler)

// // Domain layer
// container
//   // Repositories - Mongo
//   // .register<CourseRepository>(TYPES.CourseRepository, { useValue: new MongoCourseRepository(mongoClient) })
//   .register<CourseRepository>(TYPES.CourseRepository, MongoCourseRepository)

// // CoursesCounter
// // Application layer
// container
//   // EventBus <-> EventSubscribers
//   // Tags - Application
//   .register(TYPES.DomainEventSubscriber, IncrementCoursesCounterOnCourseCreated)
// // CommandBus <-> CommandHandlers
// // Tags - Application
// // QueryBus <-> QueryHandlers
// // Tags - Application

// // Domain layer
// container
//   // Repositories - Mongo
//   .register<CoursesCounterRepository>(TYPES.CoursesCounterRepository, MongoCoursesCounterRepository)

// // Test
// container.register<EnvironmentArranger>(TYPES.EnvironmentArranger, MongoEnvironmentArranger)

// export default container
// export default containerBuilder()

// export {
// containerBuilder
// TYPES
// }
