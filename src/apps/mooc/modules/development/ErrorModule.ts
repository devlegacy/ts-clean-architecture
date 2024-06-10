import {
  ContainerBuilder,
} from 'diod'

import {
  ErrorController,
} from '../../backend/controllers/Errors/ErrorController.js'
import {
  TAGS,
} from '../tags.js'

export const ErrorModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(ErrorController).addTag(TAGS.Controller)
}
