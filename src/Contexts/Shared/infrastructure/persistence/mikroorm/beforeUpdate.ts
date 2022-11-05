import { EventArgs } from '@mikro-orm/core'
import { ObjectId } from 'mongodb'

export const beforeUpdate = (args: EventArgs<any>) => {
  console.log(args)
  console.log(args.entity._id)

  args.entity._id = args.entity.id
  args.entity._id.value = new ObjectId(args.entity._id.value)
  args.entity.id.value = args.entity._id.value

  console.log(args)
}
