import type {
  ArgumentMetadata,
  PipeTransform,
} from '#@/src/Contexts/Shared/domain/Common/interfaces/index.js'

import {
  info,
} from '../../../Logger/index.js'
import {
  Joi,
} from '../index.js'

export class JoiUuidPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    // metadata key: value
    info(`${value} ${metadata}`)
    const schema = Joi.object({
      // metadata key: value
      value: Joi.string()
        .trim()
        .guid({
          version: [
            'uuidv4',
          ],
        }),
    })

    const {
      error,
      value: {
        value: data,
      },
    } = schema.validate({
      value,
    })

    if (error) {
      throw error
    }
    return data
  }
}
