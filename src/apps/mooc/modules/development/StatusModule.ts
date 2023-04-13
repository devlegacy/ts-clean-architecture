import { ContainerBuilder } from 'diod'

import { StatusController } from '../../backend/controllers/Status/StatusController'
import { TAGS } from '../tags'

export const StatusModule = (builder: ContainerBuilder) => {
  builder.registerAndUse(StatusController).addTag(TAGS.Controller)
}
