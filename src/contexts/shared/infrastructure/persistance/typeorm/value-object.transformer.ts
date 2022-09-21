import { NewableClass } from '@/contexts/shared/domain/newable-class'
import { ValueObject } from '@/contexts/shared/domain/value-object/ValueObject'

export const ValueObjectTransformer = (ValueObject: NewableClass<ValueObject<any>>) => {
  return {
    to: (value: ValueObject<any>): any => value.value,
    from: (value: any): ValueObject<any> => new ValueObject(value)
  }
}
