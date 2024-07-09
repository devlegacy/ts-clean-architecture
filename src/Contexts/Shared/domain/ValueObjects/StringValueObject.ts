import DOMPurify from 'dompurify'
import {
  JSDOM,
} from 'jsdom'

import {
  InvalidArgumentError,
} from '../index.js'
import {
  ValueObject,
} from './ValueObject.js'

const {
  window,
} = new JSDOM('')
const purify = DOMPurify(window)
// export abstract class StringValueObject extends ValueObject<string> {
export class StringValueObject extends ValueObject<string> {
  // readonly value: string

  constructor(value: string) {
    // this.value = value
    super(value ? purify.sanitize(value.trim()) : value)
    this.#ensureIsValidString(value)
  }

  #ensureIsValidString(value: string): void {
    if (typeof value !== 'string') {
      throw new InvalidArgumentError(`<${this.constructor.name}> doesn't allow the value <${value}>`)
    }
  }

  // toString() {
  //   return this.value
  // }
}
