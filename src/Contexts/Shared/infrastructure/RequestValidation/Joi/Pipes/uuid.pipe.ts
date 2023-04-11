import { ArgumentMetadata, PipeTransform } from '@/Contexts/Shared/domain'

import { info } from '../../../Logger'
import { Joi } from '../index'

export class UuidPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // metadata key: value
    info(`${value} ${metadata}`)
    const schema = Joi.object({
      // metadata key: value
      value: Joi.string()
        .trim()
        .guid({
          version: ['uuidv4'],
        }),
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
