import {
  ContainerBuilder,
} from 'diod'

import {
  StatusController,
} from '../../backend/controllers/Status/StatusController.js'
import {
  TAGS,
} from '../tags.js'

export const StatusModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(StatusController).addTag(TAGS.Controller)
}
