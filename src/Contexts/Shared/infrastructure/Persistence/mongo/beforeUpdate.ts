import type {
  EventArgs,
} from '@mikro-orm/core'

import type {
  AggregateRoot,
} from '../../../domain/AggregateRoot.js'

export const beforeUpdate = <T = AggregateRoot>(_args: EventArgs<T>) => {
  // console.log(args)
  // console.log(args.entity._id)

  // args.entity._id = args.entity.id
  // args.entity._id.value = new ObjectId(args.entity._id.value)
  // args.entity.id.value = args.entity._id.value

  // console.log(args)
}
