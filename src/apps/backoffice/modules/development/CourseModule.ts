import {
  Client as ElasticClient,
} from '@elastic/elasticsearch'
import {
  ContainerBuilder,
} from 'diod'

import {
  BackofficeCourseByCriteriaFinder,
  BackofficeCourseCreator,
  BackofficeCourseDeleter,
  BackofficeCoursesByCriteriaSearcher,
  BackofficeCoursesFinder,
  BackofficeCoursesPaginator,
  BackofficeCourseUpdater,
  CreateBackofficeCourseCommandHandler,
  CreateBackofficeCourseOnCourseCreated,
  DeleteBackofficeCourseCommandHandler,
  FindBackofficeCourseByCriteriaQueryHandler,
  GetPaginatedBackofficeCoursesQueryHandler,
  SearchAllBackofficeCoursesQueryHandler,
  SearchBackofficeCoursesByCriteriaQueryHandler,
  TopCoursesFinder,
  UpdateBackofficeCourseCommandHandler,
} from '#@/src/Contexts/Backoffice/Courses/application/index.js'
import {
  BackofficeCourseFinder,
  BackofficeCourseRepository,
  BackofficeCoursesByCriteriaSearcher as DomainBackofficeCoursesByCriteriaSearcher,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  ElasticBackofficeCourseRepository,
  MikroOrmMongoBackofficeCourseRepository,
} from '#@/src/Contexts/Backoffice/Courses/infrastructure/index.js'
import {
  ProxyBackofficeCourseRepository,
} from '#@/src/Contexts/Backoffice/Courses/infrastructure/persistence/ProxyBackofficeCourseRepository.js'
import {
  ElasticConfigFactory,
} from '#@/src/Contexts/Backoffice/Shared/infrastructure/index.js'

import {
  CourseController,
} from '../../backend/controllers/Courses/CourseController.js'
import {
  TAGS,
} from '../tags.js'

const elasticConfig = ElasticConfigFactory.createConfig()

export const CourseModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(CourseController).addTag(TAGS.Controller)
  builder.registerAndUse(CreateBackofficeCourseOnCourseCreated).addTag(TAGS.DomainEventSubscriber)
  builder.registerAndUse(CreateBackofficeCourseCommandHandler).addTag(TAGS.CommandHandler)
  builder.registerAndUse(BackofficeCourseCreator).addTag(TAGS.UseCase)
  builder.registerAndUse(DeleteBackofficeCourseCommandHandler).addTag(TAGS.CommandHandler)
  builder.registerAndUse(BackofficeCourseDeleter).addTag(TAGS.UseCase)
  builder.registerAndUse(UpdateBackofficeCourseCommandHandler).addTag(TAGS.CommandHandler)
  builder.registerAndUse(BackofficeCourseUpdater).addTag(TAGS.UseCase)
  builder.registerAndUse(SearchAllBackofficeCoursesQueryHandler).addTag(TAGS.QueryHandler)
  builder.registerAndUse(BackofficeCoursesFinder).addTag(TAGS.UseCase)
  builder.registerAndUse(BackofficeCoursesByCriteriaSearcher).addTag(TAGS.UseCase)
  builder.registerAndUse(DomainBackofficeCoursesByCriteriaSearcher).addTag(TAGS.UseCase)
  builder.registerAndUse(SearchBackofficeCoursesByCriteriaQueryHandler).addTag(TAGS.QueryHandler)
  builder.registerAndUse(FindBackofficeCourseByCriteriaQueryHandler).addTag(TAGS.QueryHandler)
  builder.registerAndUse(BackofficeCourseByCriteriaFinder).addTag(TAGS.UseCase)
  builder.registerAndUse(GetPaginatedBackofficeCoursesQueryHandler).addTag(TAGS.QueryHandler)
  builder.registerAndUse(BackofficeCoursesPaginator).addTag(TAGS.UseCase)
  builder.registerAndUse(BackofficeCourseFinder).addTag(TAGS.UseCase)
  builder.registerAndUse(TopCoursesFinder).addTag(TAGS.UseCase)

  builder.registerAndUse(MikroOrmMongoBackofficeCourseRepository)
  builder.register(ElasticBackofficeCourseRepository).useFactory((container) => {
    return new ElasticBackofficeCourseRepository(container.get(ElasticClient), elasticConfig)
  })
  builder.register(BackofficeCourseRepository).useFactory((container) => {
    return new ProxyBackofficeCourseRepository(
      container.get(MikroOrmMongoBackofficeCourseRepository),
      container.get(ElasticBackofficeCourseRepository),
    )
  })
}
