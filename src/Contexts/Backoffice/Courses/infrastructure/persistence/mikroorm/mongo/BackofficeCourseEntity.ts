import {
  EntitySchema,
} from '@mikro-orm/core'

import {
  BackofficeCourse,
  BackofficeCourseDuration,
  BackofficeCourseId,
  BackofficeCourseName,
} from '#@/src/Contexts/Backoffice/Courses/domain/index.js'
import {
  beforeCreate,
  beforeUpdate,
  beforeUpsert,
  onLoad,
  ValueObjectTransformer,
} from '#@/src/Contexts/Shared/infrastructure/Persistence/mongo/index.js'

export const BackofficeCourseEntity = new EntitySchema<BackofficeCourse>({
  name: 'BackofficeCourse',
  tableName: 'courses',
  class: BackofficeCourse,
  hooks: {
    onLoad: [
      onLoad,
    ],
    beforeCreate: [
      beforeCreate,
    ],
    beforeUpdate: [
      beforeUpdate,
    ],
    beforeUpsert: [
      beforeUpsert,
    ],
  },
  properties: {
    // @ts-expect-error - _id is not defined in User but in Schema, prevent domain contamination
    _id: {
      type: new ValueObjectTransformer(
        BackofficeCourseId,
        'ObjectId',
      ),
      // type: 'ObjectId',
      primary: true,
      // hidden: true,
    },
    id: {
      type: 'string',
      // customType: new ValueObjectTransformer(BackofficeCourseId, 'string'),
      // persist: false,
      // serializedPrimaryKey: true,
    },
    name: {
      type: new ValueObjectTransformer(
        BackofficeCourseName,
        'string',
      ),
    },
    duration: {
      type: new ValueObjectTransformer(
        BackofficeCourseDuration,
        'string',
      ),
      nullable: true,
    },
    createdAt: {
      type: 'Date',
      nullable: true,
    },
    updatedAt: {
      type: 'Date',
      nullable: true,
    },
    deletedAt: {
      type: 'Date',
      nullable: true,
    },
  },
})
