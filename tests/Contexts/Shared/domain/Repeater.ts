import { IntegerMother } from './IntegerMother'

export class Repeater {
  static random(callable: () => any, iterations: number) {
    return Array.from({ length: iterations || IntegerMother.random(20) }, (_) => ({})).map(() => callable())
  }
}
