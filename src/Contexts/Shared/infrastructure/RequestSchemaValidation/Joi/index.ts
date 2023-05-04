import * as joi from 'joi'
import { DEFAULT } from 'joi-class-decorators'
import { ObjectId } from 'mongodb'

export * from './JoiModule'

interface ExtendedStringSchema<T = string> extends joi.StringSchema<T> {
  objectId(): this
}

// interface ExtendedNumberSchema<T = number> extends joi.NumberSchema<T> {
//   coerceZero(): this
// }

interface ExtendedJoi extends joi.Root {
  string<T = string>(): ExtendedStringSchema<T>
  // number<T = number>(): ExtendedNumberSchema<T>
}

const stringObjectExtension: joi.Extension = {
  type: 'string',
  base: joi.string(),
  messages: {
    'string.objectId': '{{#label}} must be a valid id',
  },
  rules: {
    objectId: {
      validate: (value: string, helpers) => {
        value = value.trim()
        if (!ObjectId.isValid(value)) {
          return helpers.error('string.objectId')
        }

        return value
      },
    },
  },
}

// const numberObjectExtension: joi.Extension = {
//   type: 'number',
//   base: joi.number(),
//   messages: {
//     'number.coerceZero': '{{#label}} must be a valid number'
//   },
//   rules: {
//     coerceZero: {
//       validate: (value: number) => {
//         if (Number.isNaN(value)) {
//           return 0
//         }

//         return value
//       }
//     }
//   }
// }

export const JoiValidationGroups = {
  DEFAULT,
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
}

// Convenient & consistency export
export { DEFAULT }
export const { CREATE } = JoiValidationGroups
export const { UPDATE } = JoiValidationGroups

export const Joi = joi.extend(
  stringObjectExtension
  //  numberObjectExtension
) as ExtendedJoi
