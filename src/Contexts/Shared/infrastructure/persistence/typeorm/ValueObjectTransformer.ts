import { NewableClass, ValueObject } from '@/Contexts/Shared/domain'

export const ValueObjectTransformer = (ValueObject: NewableClass<ValueObject<any>>) => {
  return {
    to: (value: ValueObject<any>): any => value.value,
    from: (value: any): ValueObject<any> => new ValueObject(value),
  }
}
