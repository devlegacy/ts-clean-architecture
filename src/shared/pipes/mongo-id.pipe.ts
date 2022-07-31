import { ArgumentMetadata, PipeTransform } from '../common/interfaces'
import { Joi } from '../joi'

export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // metadata key: value
    console.log(value, metadata)
    const schema = Joi.object({
      // metadata key: value
      value: Joi.string().trim().objectId().required()
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
