import { ArgumentMetadata, PipeTransform } from '../../common/interfaces'
import { Joi } from '../../joi'
import { info } from '../../logger'

export class PageNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    info(`${value} ${metadata}`)
    const schema = Joi.object({
      value: Joi.number().min(0).required()
    })

    const {
      error,
      value: { value: data }
    } = schema.validate({ value })

    if (error) {
      throw error
    }
    return data
  }
}
