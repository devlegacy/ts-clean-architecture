import { InvalidArgumentError } from '@/Contexts/Shared/domain'

export class CourseNameLengthExceeded extends InvalidArgumentError {
  // constructor(message: string) {
  //   super(message)
  //   this.name = this.constructor.name
  // }
  // constructor(texts: TemplateStringsArray, value: string, limit: number) {
  //   const message = `${texts} ${value} ${limit}`
  //   super(message)
  //   this.name = this.constructor.name
  // }
  // strings: TemplateStringsArray, ... expr: string[]
  static build(texts: TemplateStringsArray, value: string, limit: number) {
    throw new CourseNameLengthExceeded(`${texts} ${value} ${limit}`)
  }
}
