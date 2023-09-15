import type { EventArgs } from '@mikro-orm/core'

export const beforeUpsert = (args: EventArgs<any>) => {
  // TODO: Validate type on value
  // NOTE: El dominio esta separado de la base de datos :D, eso incluye el como se esta guardo e interpretando el ObjectId
  // args.entity._id = args.entity.id
  // if (args.entity._id?.value) {
  //   args.entity._id.value = new ObjectId(args.entity._id.value)
  // } else {
  //   args.entity._id = new ObjectId(args.entity._id)
  // }

  // delete args.entity._id

  console.log(args)
  // console.log(args.entity._id)
}
