import { ArgumentMetadata, PipeTransform } from '@/Contexts/Shared/domain/Common/interfaces'

import { info } from '../../../Logger'
import { Joi } from '../index'

export class PageNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    info(`${value} ${metadata}`)
    const schema = Joi.object({
      value: Joi.number().min(0).required(),
    })

    const {
      error,
      value: { value: data },
    } = schema.validate({ value })

    if (error) {
      throw error
    }
    return data
  }
}
