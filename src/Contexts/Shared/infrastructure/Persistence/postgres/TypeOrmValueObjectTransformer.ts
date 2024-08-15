import {
  ValueObject,
} from '#@/src/Contexts/Shared/domain/index.js'

export const TypeOrmValueObjectTransformer = <T extends Class<ValueObject<any>>>(ValueObject: T) => {
  return {
    to: (value: InstanceType<T>): any => value.value,
    from: (value: any): InstanceType<T> => new ValueObject(value) as InstanceType<T>,
  }
}
