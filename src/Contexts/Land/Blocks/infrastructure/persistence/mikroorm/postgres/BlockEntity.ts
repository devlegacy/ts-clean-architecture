import { EntitySchema } from '@mikro-orm/core'

export const BlockEntity = new EntitySchema({
  name: 'Block',
  tableName: 'Blocks',
  properties: {
    id: {
      type: 'string',
      primary: true
    }
  }
})
