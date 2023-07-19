import { User, UserPrimitiveType } from '@/Contexts/User/Users/domain'
import { MotherCreator } from '@/tests/Contexts/Shared/domain'

import { UserBirthdateMother } from './UserBirthdateMother'
import { UserEmailMother } from './UserEmailMother'
import { UserIdMother } from './UserIdMother'

export class UserMother {
  static create(params?: Partial<UserPrimitiveType>): User {
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
}
