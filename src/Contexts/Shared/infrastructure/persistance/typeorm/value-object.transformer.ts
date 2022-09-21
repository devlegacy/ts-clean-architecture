import { NewableClass } from '@/Contexts/Shared/domain/newable-class'
import { ValueObject } from '@/Contexts/Shared/domain/value-object/ValueObject'

export const ValueObjectTransformer = (ValueObject: NewableClass<ValueObject<any>>) => {
  return {
    to: (value: ValueObject<any>): any => value.value,
    from: (value: any): ValueObject<any> => new ValueObject(value)
  }
}
