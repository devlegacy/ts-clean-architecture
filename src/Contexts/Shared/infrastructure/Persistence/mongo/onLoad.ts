import type {
  EventArgs,
} from '@mikro-orm/core'

import type {
  AggregateRoot,
} from '../../../domain/AggregateRoot.js'

export const onLoad = <T = AggregateRoot>(_args: EventArgs<T>) => {
  // if (args.entity._id && !args.entity.id?.value) {
  //   // @ts-expect-error ValueObject
  //   args.entity.id = new args.meta.properties.id.customType.ValueObject(args.entity._id.toString())
  // }

  // console.log(args)
  // console.log(args.entity._id)
  // if (args.entity._id) {
  //   args.entity._id.value = args.entity._id.value.toString()
  // }
  // if (args.entity.id) {
  //   args.entity.id.value = args.entity.id.value.toString()
  // }
}
