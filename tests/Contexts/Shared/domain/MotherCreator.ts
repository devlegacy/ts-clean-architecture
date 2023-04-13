import { Faker, faker } from '@faker-js/faker'

export class MotherCreator {
  static random(): Faker {
    return faker
  }

  static uuid(): string {
    return faker.datatype.uuid()
  }

  static objectId(): string {
    return faker.database.mongodbObjectId()
  }

  static positiveNumber(max?: number): number {
    return faker.datatype.number({
      min: 1,
      max,
    })
  }

  static word(length: number) {
    const word = faker.lorem.word({
      length,
      strategy: 'closest',
    })
    return word || 'word'
  }
}

// NOTE: without expose more methods
// export default class MotherCreator {
//   static positiveNumber(max?: number): number {
//     return faker.datatype.number({
//       min: 1,
//       max
//     })
//   }

//   static zeroOrPositiveNumber(max?: number): number {
//     return faker.datatype.number({
//       min: 0,
//       max
//     })
//   }

//   static uuid(): string {
//     return faker.datatype.uuid()
//   }

//   static url(): string {
//     return faker.internet.url()
//   }

//   static imageWidth(): number {
//     return MotherCreator.positiveNumber(1920)
//   }

//   static pastDate(beforeDate?: string): Date {
//     return faker.date.past(undefined, beforeDate)
//   }
// }
