import { Class, ValueObject } from '@/Contexts/Shared/domain'

export const ValueObjectTransformer = (ValueObject: Class<ValueObject<any>>) => {
  return {
    to: (value: ValueObject<any>): any => value.value,
    from: (value: any): ValueObject<any> => new ValueObject(value),
  }
}
