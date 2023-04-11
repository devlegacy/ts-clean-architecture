import { ArgumentMetadata, PipeTransform } from '@/Contexts/Shared/domain/Common/interfaces'

import { info } from '../../../Logger'
import { Joi } from '../index'

export class ObjectIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // metadata key: value
    info(`${value} ${metadata}`)
    const schema = Joi.object({
      // metadata key: value
      value: Joi.string().objectId().required(),
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
