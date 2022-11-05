import { MotherCreator } from './MotherCreator'

export class WordMother {
  static random({ maxLength, minLength = 1 }: { maxLength: number; minLength?: number }): string {
    const length = Math.floor(Math.random() * (maxLength - minLength)) + minLength
    const word = MotherCreator.random().lorem.word(length) || 'word'

    return word
  }
}
