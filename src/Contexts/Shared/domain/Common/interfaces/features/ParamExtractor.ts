import type { ParamData } from '../../Decorators/index.js'
import type { PipeTransform } from './PipeTransform.js'

export interface ParamExtractor {
  extract(
    req: any,
    res: any,
    data: ParamData | undefined,
    pipes?: (Constructor<PipeTransform> | PipeTransform)[]
  ): unknown
}
