import { User, type UserPrimitiveType } from '@/Contexts/User/Users/domain/index.js'
import { MotherCreator } from '@/tests/Contexts/Shared/domain/index.js'

import { UserBirthdateMother } from './UserBirthdateMother.js'
import { UserEmailMother } from './UserEmailMother.js'
import { UserIdMother } from './UserIdMother.js'

/**
 * Factory to (instantiate responsibility) create (new objects) User entities
 * public static methods
 */
export class UserMother {
  static create(params?: Partial<UserPrimitiveType>): User {
    // TODO: Move to MotherCreator
    const timestamp = new Date()
    const defaultParams: UserPrimitiveType = {
      id: UserIdMother.create().value,
      name: MotherCreator.firstName(),
      username: MotherCreator.username(),
      email: UserEmailMother.create().value,
      birthdate: UserBirthdateMother.create().value,
      // jobExperiences: [],
      jobExperiences: [
        {
          title: 'Job title',
          company: 'Company',
          dateRange: {
            startDate: new Date('2020-01-01'),
            endDate: new Date('2022-01-01'),
          },
        },
      ],
      createdAt: timestamp,
      updatedAt: timestamp,
      ...params,
    }

    return new User(
      defaultParams.id,
      defaultParams.name,
      defaultParams.username,
      defaultParams.email,
      defaultParams.birthdate,
      defaultParams.jobExperiences
    )
  }
  // static genZ() { .... }
}
