import { PipeTransform } from '../../common/interfaces'
import { Joi } from '../../joi'

export class FiltersPipe implements PipeTransform {
  transform(filters: any) {
    const field = Joi.string().trim().required()
    const operator = Joi.string().trim().required() // From enum
    const value = Joi.string().trim().required()

    const schema = Joi.object({
      filters: Joi.array()
        .items(
          Joi.object({
            field,
            operator,
            value
          })
        )
        .optional()
    })

    const {
      error,
      value: { value: data }
    } = schema.validate({ filters })

    if (error) {
      throw error
    }
    return data
  }
}
