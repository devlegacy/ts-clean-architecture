import { Client as ElasticClient } from '@elastic/elasticsearch'
import { ContainerBuilder } from 'diod'

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
  PaginateBackofficeCoursesQueryHandler,
  SearchAllBackofficeCoursesQueryHandler,
  SearchBackofficeCoursesByCriteriaQueryHandler,
  TopCoursesFinder,
  UpdateBackofficeCourseCommandHandler,
} from '@/Contexts/Backoffice/Courses/application'
import {
  BackofficeCourseFinder,
  BackofficeCourseRepository,
  BackofficeCoursesByCriteriaSearcher as DomainBackofficeCoursesByCriteriaSearcher,
} from '@/Contexts/Backoffice/Courses/domain'
import {
  ElasticBackofficeCourseRepository,
  MikroOrmMongoBackofficeCourseRepository,
} from '@/Contexts/Backoffice/Courses/infrastructure'
import { ProxyBackofficeCourseRepository } from '@/Contexts/Backoffice/Courses/infrastructure/persistence/ProxyBackofficeCourseRepository'
import { ElasticConfigFactory } from '@/Contexts/Backoffice/Shared/infrastructure'

import { CourseController } from '../../backend/controllers/Courses/CourseController'
import { TAGS } from '../tags'

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
  builder.registerAndUse(PaginateBackofficeCoursesQueryHandler).addTag(TAGS.QueryHandler)
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
      container.get(ElasticBackofficeCourseRepository)
    )
  })
}
