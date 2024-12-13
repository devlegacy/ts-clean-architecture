import type {
  EventArgs,
} from '@mikro-orm/core'

import type {
  AggregateRoot,
} from '../../../domain/AggregateRoot.js'

export const beforeCreate = <T = AggregateRoot>(_args: EventArgs<T>) => {
  // TODO: Validate type on value
  // NOTE: El dominio esta separado de la base de datos :D, eso incluye el como se esta guardo e interpretando el ObjectId
  // args.entity._id = args.entity.id
  // args.entity._id.value = new ObjectId(args.entity._id.value)
  // if (!args.entity._id || !ObjectId.isValid(args.entity._id)) {
  //   args.entity._id = {
  //     ...args.entity.id,
  //   }
  //   args.entity._id.value = new ObjectId(args.entity._id.value)

  //   args.entity.id.value = args.entity.id.toString()
  // }

  // console.log(args)
  // console.log(args.entity._id)
}
