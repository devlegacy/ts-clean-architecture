export const ApiTags = (...tags: string[]): MethodDecorator & ClassDecorator => {
  return (target: any, propertyKey?: string | symbol): any => {
    if (target.name) {
      // is class Decorator
      if (!Reflect.hasMetadata('tags', target)) Reflect.defineMetadata('tags', {}, target)
    } else {
      // is Method decorator
      if (!Reflect.hasMetadata('tags', target.constructor)) Reflect.defineMetadata('tags', {}, target.constructor)
    }

    const tagsMap = target.name ? Reflect.getMetadata('tags', target) : Reflect.getMetadata('tags', target.constructor)

    if (target.name) {
      if (!tagsMap['default']) {
        tagsMap['default'] = tags
      }
    } else if (propertyKey) {
      tagsMap[propertyKey] = tags
    }

    Reflect.defineMetadata('tags', tagsMap, target.constructor)
  }
}
