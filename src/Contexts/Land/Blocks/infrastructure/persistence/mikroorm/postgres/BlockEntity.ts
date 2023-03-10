import { EntitySchema } from '@mikro-orm/core'

import {
  Block,
  BlockArea,
  BlockAvailability,
  BlockBlock,
  BlockCreatedAt,
  BlockDeletedAt,
  BlockId,
  BlockStreet,
  BlockUpdatedAt,
} from '@/Contexts/Land/Blocks/domain'
import { Boundary } from '@/Contexts/Land/Shared/domain'
import { ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/persistence/mikroorm'

export const BlockEntity = new EntitySchema<Block>({
  name: 'Block',
  tableName: 'blocks',
  class: Block,
  properties: {
    id: {
      customType: new ValueObjectTransformer(BlockId, 'string'),
      primary: true,
    },
    block: {
      customType: new ValueObjectTransformer(BlockBlock, 'string'),
    },
    area: {
      customType: new ValueObjectTransformer(BlockArea, 'number'),
    },
    street: {
      customType: new ValueObjectTransformer(BlockStreet, 'string'),
    },
    availability: {
      customType: new ValueObjectTransformer(BlockAvailability, 'string'),
    },
    northBoundary: {
      customType: new ValueObjectTransformer(Boundary, 'string'),
    },
    northeastBoundary: {
      customType: new ValueObjectTransformer(Boundary, 'string'),
    },
    eastBoundary: {
      customType: new ValueObjectTransformer(Boundary, 'string'),
    },
    southeastBoundary: {
      customType: new ValueObjectTransformer(Boundary, 'string'),
    },
    southBoundary: {
      customType: new ValueObjectTransformer(Boundary, 'string'),
    },
    southwestBoundary: {
      customType: new ValueObjectTransformer(Boundary, 'string'),
    },
    westBoundary: {
      customType: new ValueObjectTransformer(Boundary, 'string'),
    },
    northwestBoundary: {
      customType: new ValueObjectTransformer(Boundary, 'string'),
    },
    createdAt: {
      customType: new ValueObjectTransformer(BlockCreatedAt, 'date'),
      onCreate: () => new Date(),
    },
    updatedAt: {
      customType: new ValueObjectTransformer(BlockUpdatedAt, 'date'),
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
    },
    deletedAt: {
      customType: new ValueObjectTransformer(BlockDeletedAt, 'date'),
      nullable: true,
      default: undefined,
    },
  },
})
