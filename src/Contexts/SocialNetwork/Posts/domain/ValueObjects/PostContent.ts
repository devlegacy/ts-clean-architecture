import {
  StringValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

import {
  PostContentIsEmptyError,
  PostContentTooLongError,
} from '../Errors/index.js'

export class PostContent extends StringValueObject {
  static readonly maxLength = 280

  constructor(value: string) {
    super(value)
    if (value.length === 0) {
      throw new PostContentIsEmptyError()
    }
    if (value.length > PostContent.maxLength) {
      throw new PostContentTooLongError(value, PostContent.maxLength)
    }
  }
}

// try {
//   new PostContent('')
// } catch (err) {
//   if (err instanceof DomainError) {
//     switch (err.constructor) {
//       case PostContentIsEmptyError:
//         // eslint-disable-next-line no-console
//         console.log(err)
//         break
//       case PostContentTooLongError:
//         // eslint-disable-next-line no-console
//         console.log(err)
//         break
//     }
//   }
//   throw err
// }
