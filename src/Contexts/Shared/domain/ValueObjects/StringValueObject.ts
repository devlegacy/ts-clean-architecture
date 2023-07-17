import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

import { ValueObject } from './ValueObject'

const { window } = new JSDOM('')
const purify = DOMPurify(window)
export abstract class StringValueObject extends ValueObject<string> {
  // readonly value: string

  constructor(value: string) {
    // this.value = value
    super(value ? purify.sanitize(value.trim()) : value)
  }

  // toString() {
  //   return this.value
  // }
}
