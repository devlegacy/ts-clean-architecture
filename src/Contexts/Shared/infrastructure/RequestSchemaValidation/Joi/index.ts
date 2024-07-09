import type {
  Extension,
  Root,
  StringSchema,
} from 'joi'
import joi from 'joi'
import {
  DEFAULT,
} from 'joi-class-decorators'
import {
  ObjectId,
} from 'mongodb'
import {
  validate,
} from 'uuid'

import {
  JoiValidationGroups,
} from './JoiModule.js'

interface ExtendedStringSchema<T = string> extends StringSchema<T> {
  objectId(): this
  slug(): this
  uuidv4(): this
}

// interface ExtendedNumberSchema<T = number> extends joi.NumberSchema<T> {
//   coerceZero(): this
// }

interface ExtendedJoi extends Root {
  string<T = string>(): ExtendedStringSchema<T>
  // number<T = number>(): ExtendedNumberSchema<T>
}

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const stringObjectExtension: Extension = {
  type: 'string',
  base: joi.string(),
  messages: {
    'string.objectId': '{{#label}} must be a valid ID',
    'string.slug': '{{#label}} must be a valid slug',
    'string.uuidv4': '{{#label}} must be a valid ID',
  },
  rules: {
    objectId: {
      validate: (value: string, helpers) => {
        value = value.trim()
        if (!ObjectId.isValid(value)) {
          return {
            value,
            errors: helpers.error('string.objectId'),
          }
        }

        return value
      },
    },
    slug: {
      validate: (value: string, helpers) => {
        value = value.toLowerCase().trim()
        if (!SLUG_REGEX.test(value)) {
          return {
            value,
            errors: helpers.error('string.slug'),
          }
        }
        return value
      },
    },
    uuidv4: {
      validate: (value: string, helpers) => {
        value = value.trim()
        if (!validate(value)) {
          return {
            value,
            errors: helpers.error('string.uuidv4'),
          }
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

const Joi = joi.extend(
  stringObjectExtension,
  //  numberObjectExtension
) as ExtendedJoi

// Convenient & consistency export
export {
  DEFAULT
}
export * from './JoiModule.js'

export const {
  CREATE,
} = JoiValidationGroups
export const {
  UPDATE,
} = JoiValidationGroups
export {
  JoiSchema, JoiSchemaOptions
} from 'joi-class-decorators'

export {
  Joi
}
