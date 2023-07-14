import { EntitySchema } from '@mikro-orm/core'

import {
  Lot,
  LotArea,
  LotAvailability,
  LotCreatedAt,
  LotDeletedAt,
  LotId,
  LotLot,
  LotUpdatedAt,
} from '@/Contexts/Land/Lots/domain'
import { BlockId, Boundary } from '@/Contexts/Land/Shared/domain'
import { ValueObjectTransformer } from '@/Contexts/Shared/infrastructure/Persistence/mikroorm'

export const LotEntity = new EntitySchema<Lot>({
  name: 'Lot',
  tableName: 'lots',
  class: Lot,
  properties: {
    id: {
      customType: new ValueObjectTransformer(LotId, 'string'),
      primary: true,
    },
    blockId: {
      customType: new ValueObjectTransformer(BlockId, 'string'),
    },
    lot: {
      customType: new ValueObjectTransformer(LotLot, 'string'),
    },
    area: {
      customType: new ValueObjectTransformer(LotArea, 'number'),
    },
    availability: {
      customType: new ValueObjectTransformer(LotAvailability, 'string'),
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
      customType: new ValueObjectTransformer(LotCreatedAt, 'date'),
      onCreate: () => new Date(),
    },
    updatedAt: {
      customType: new ValueObjectTransformer(LotUpdatedAt, 'date'),
      onCreate: () => new Date(),
      onUpdate: () => new Date(),
    },
    deletedAt: {
      customType: new ValueObjectTransformer(LotDeletedAt, 'date'),
      nullable: true,
      default: undefined,
    },
  },
})
