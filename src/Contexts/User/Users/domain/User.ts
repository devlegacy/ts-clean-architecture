import { AggregateRoot, Primitives } from '@/Contexts/Shared/domain'

import { UserId } from '../../Shared/domain'
import { UserAge, UserName, UserUsername } from './value-object'

// NOTE: No acoplar a un modelo

// export interface User {
//   id: string
//   name: string
//   username: string
//   age: number
// }

// export interface UserUpdateDto extends Omit<Partial<User>, 'id'> {
//   id: User['id']
// }

export type PrimitiveUser = Primitives<User>

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

  static fromPrimitives(data: PrimitiveUser): User {
    // return new Course({
    //   id: new CourseId(props.id),
    //   name: new CourseName(props.name),
    //   duration: !props.duration ? undefined : new CourseDuration(props.duration)
    // })
    return new User(
      new UserId(data.id),
      new UserName(data.name),
      new UserUsername(data.username),
      !data.age ? undefined : new UserAge(data.age)
    )
  }

  toPrimitives(): PrimitiveUser {
    return {
      id: this.id.value,
      name: this.name.value,
      username: this.username.value,
      age: this.age?.value
    }
  }

  // Tell don't ask
  // isAdult() {}

  // Tell don't ask
  // isBirthday() {}
}
