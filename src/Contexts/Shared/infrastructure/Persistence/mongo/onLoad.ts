import type {
  EventArgs,
} from '@mikro-orm/core'

export const onLoad = (args: EventArgs<any>) => {
  // if (args.entity._id && !args.entity.id?.value) {
  //   // @ts-expect-error ValueObject
  //   args.entity.id = new args.meta.properties.id.customType.ValueObject(args.entity._id.toString())
  // }
  // eslint-disable-next-line no-console
  console.log(args)
  // console.log(args.entity._id)
  // if (args.entity._id) {
  //   args.entity._id.value = args.entity._id.value.toString()
  // }
  // if (args.entity.id) {
  //   args.entity.id.value = args.entity.id.value.toString()
  // }
}
