import { EventArgs } from '@mikro-orm/core'

export const onLoad = (args: EventArgs<any>) => {
  console.log(args)
  // console.log(args.entity._id)
  // args.entity._id.value = args.entity._id.value.toString()
}
