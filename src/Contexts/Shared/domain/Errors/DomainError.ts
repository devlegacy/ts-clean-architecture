/**
 * Benefits:
 * - avoid fragility
 * - specific error type
 * - encapsulate (error message)
 */
export abstract class DomainError extends Error {
  // abstract readonly type: string
  // abstract message: string

  // the class name can be lost when file is minified in production, mnemonic name is used to identify the error
  // code vs type
  abstract readonly code: string
  /**
   *
   * @param message human readable message
   */
  constructor(message: string) {
    super(message)
    // this.name = this.constructor.name
  }

  // toPrimitive(): { type: string, description: string, data: Record<string, unknown> } {
  // const props = Object.entries(this).filter(([
  //   key,
  //   _,
  // ]) => key !== 'type' && key !== 'message')
  // return {
  //   type: this.type,
  //   description: this.message,
  //   data: props.reduce((acc, [
  //     key,
  //     value,
  //   ]) => {
  //     acc[key] = value
  //     return acc
  //   }, {}),
  // }
  // return {}
  // }
}
