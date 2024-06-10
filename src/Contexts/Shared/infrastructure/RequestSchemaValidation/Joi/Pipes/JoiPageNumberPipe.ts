import type {
  ArgumentMetadata, PipeTransform,
} from '#@/src/Contexts/Shared/domain/Common/interfaces/index.js'

import {
  info,
} from '../../../Logger/index.js'
import {
  Joi,
} from '../index.js'

export class JoiPageNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    info(`${value} ${metadata}`)
    const schema = Joi.object({
      value: Joi.number().min(0)
        .required(),
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
