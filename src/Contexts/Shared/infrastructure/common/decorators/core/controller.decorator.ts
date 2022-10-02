import { PATH_METADATA } from '../../constants'

export const Controller = (prefix = ''): ClassDecorator => {
  const defaultPath = '/'

  const path = prefix ?? defaultPath

  return (target: object): any => {
    Reflect.defineMetadata(PATH_METADATA, path, target)

    // Note: helper for custom diod decorator
    // https://github.com/artberri/diod/blob/main/docs/custom-decorator.md
    return target
  }
}
