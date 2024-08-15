import {
  PostContentIsEmptyError,
  PostContentTooLongError,
} from '../Errors/index.js'

export class PostContent {
  static readonly maxLength = 280

  constructor(readonly value: string) {
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
