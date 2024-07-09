import {
  URL,
} from 'node:url'

import {
  InvalidArgumentError,
} from '../index.js'
import {
  StringValueObject,
} from './StringValueObject.js'

export class UrlValueObject extends StringValueObject {
  constructor(value: string) {
    super(value)
    this.ensureIsValidUrl(value)
  }

  ensureIsValidHttps() {
    if (!this.value.match(/^https?:\/\//i)) {
      throw new InvalidArgumentError('URL inválida')
    }
  }

  private ensureIsValidUrl(value: string) {
    if (!URL.canParse(value)) {
      throw new InvalidArgumentError(`This value <${value}> must be a valid URL`)
    }
  }
}
