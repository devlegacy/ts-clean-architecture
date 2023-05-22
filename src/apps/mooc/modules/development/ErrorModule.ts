import { ContainerBuilder } from 'diod'

import { ErrorController } from '../../backend/controllers/Errors/ErrorController'
import { TAGS } from '../tags'

export const ErrorModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(ErrorController).addTag(TAGS.Controller)
}
