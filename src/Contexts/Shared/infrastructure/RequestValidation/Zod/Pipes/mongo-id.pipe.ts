import { ObjectId } from 'mongodb'
import { z } from 'zod'

import { ArgumentMetadata, PipeTransform } from '@/Contexts/Shared/domain/Common/interfaces'

import { info } from '../../../Logger'

export class MongoIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // metadata key: value
    info(`${value}`)
    info(metadata)

    const schema = z.object({
      // metadata key: value
      value: z.string().refine((value) => ObjectId.isValid(value)),
    })

    schema.parse({ value })

    // if (error) {
    //   throw error
    // }

    return value
  }
}
