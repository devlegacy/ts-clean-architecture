import {
  IntegerMother,
} from './IntegerMother.js'

export class Repeater {
  static random(callable: () => any, iterations: number) {
    const repeater = Array.from({
      length: iterations || IntegerMother.random(20),
    }, (_) => ({})).map(() => callable())
    return repeater
  }
}
