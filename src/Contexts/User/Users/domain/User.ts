import { AggregateRoot } from '@/Contexts/Shared/domain'

import { UserId } from '../../Shared/domain'
import { UserAge } from './UserAge'
import { UserName } from './UserName'
import { UserUsername } from './UserUsername'

// export interface User {
//   id: string
//   name: string
//   username: string
//   age: number
// }
// Note: No acoplar a un modelo

// export interface UserUpdateDto extends Omit<Partial<User>, 'id'> {
//   id: User['id']
// }

export class User extends AggregateRoot {
  readonly id: UserId
  readonly name: UserName
  readonly username: UserUsername
  readonly age?: UserAge

  constructor(id: UserId, name: UserName, username: UserUsername, age?: UserAge) {
    super()
    this.id = id
    this.name = name
    this.username = username
    this.age = age
  }

  static fromPrimitives(plainData: { id: string; name: string; username: string; age?: number }): User {
    // return new Course({
    //   id: new CourseId(plainData.id),
    //   name: new CourseName(plainData.name),
    //   duration: !plainData.duration ? undefined : new CourseDuration(plainData.duration)
    // })
    return new User(
      new UserId(plainData.id),
      new UserName(plainData.name),
      new UserUsername(plainData.username),
      !plainData.age ? undefined : new UserAge(plainData.age)
    )
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      username: this.username.value,
      age: this.age?.value
    }
  }
}
