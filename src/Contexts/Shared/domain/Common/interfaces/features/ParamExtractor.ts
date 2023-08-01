import { ParamData } from '../../Decorators'
import { PipeTransform } from './PipeTransform'

export interface ParamExtractor {
  extract(
    req: any,
    res: any,
    data: ParamData | undefined,
    pipes?: (Constructor<PipeTransform> | PipeTransform)[]
  ): unknown
}
