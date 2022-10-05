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

  static fromPrimitives(props: UserPrimitiveProps): User {
    // return new Course({
    //   id: new CourseId(props.id),
    //   name: new CourseName(props.name),
    //   duration: !props.duration ? undefined : new CourseDuration(props.duration)
    // })
    return new User(
      new UserId(props.id),
      new UserName(props.name),
      new UserUsername(props.username),
      !props.age ? undefined : new UserAge(props.age)
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

  // Tell don't ask
  // isAdult() {}

  // Tell don't ask
  // isBirthday() {}
}
