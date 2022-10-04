import { AggregateRoot, NonFunctionProperties, PrimitiveProperties } from '@/Contexts/Shared/domain'

import { UserId } from '../../Shared/domain'
import { UserAge, UserName, UserUsername } from './value-object'

// Note: No acoplar a un modelo

// export interface User {
//   id: string
//   name: string
//   username: string
//   age: number
// }

// export interface UserUpdateDto extends Omit<Partial<User>, 'id'> {
//   id: User['id']
// }

type UserProps = NonFunctionProperties<User>
export type UserPrimitiveProps = PrimitiveProperties<UserProps>

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

  static fromPrimitives(primitive: UserPrimitiveProps): User {
    // return new Course({
    //   id: new CourseId(primitive.id),
    //   name: new CourseName(primitive.name),
    //   duration: !primitive.duration ? undefined : new CourseDuration(primitive.duration)
    // })
    return new User(
      new UserId(primitive.id),
      new UserName(primitive.name),
      new UserUsername(primitive.username),
      !primitive.age ? undefined : new UserAge(primitive.age)
    )
  }

  toPrimitives(): UserPrimitiveProps {
    return {
      id: this.id.value,
      name: this.name.value,
      username: this.username.value,
      age: this.age?.value
    }
  }
}
