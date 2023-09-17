import { MotherCreator } from './MotherCreator.js'

export class WordMother {
  static random({ maxLength, minLength = 1 }: { maxLength: number; minLength?: number }): string {
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
    const word = MotherCreator.word(length)

    return word
  }
}
