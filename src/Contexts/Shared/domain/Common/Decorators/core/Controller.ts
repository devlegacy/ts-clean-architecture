import {
  PATH_METADATA,
} from '../../constants.js'

/**
 * Decorator that marks a class as a controller that can receive inbound
 * requests and produce responses.
 */
export const Controller = (prefix = ''): ClassDecorator => {
  const defaultPath = '/'

  const path = prefix ?? defaultPath

  return (target: object): any => {
    Reflect.defineMetadata(PATH_METADATA, path, target)

    // NOTE: helper for custom Diod | Tsyringe decorator
    // https://github.com/artberri/diod/blob/main/docs/custom-decorator.md
    return target
  }
}
