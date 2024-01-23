import { ContainerBuilder } from 'diod'

import { StatusController } from '@/apps/mooc/backend/controllers/Status/StatusController.js'
import { registerController } from '@/Contexts/Shared/infrastructure/index.js'

export const StatusModule = (builder: ContainerBuilder) => {
  // builder
  // .registerAndUse((await import('@/apps/backoffice/backend/controllers/Status/StatusController.js')).StatusController)
  // .registerAndUse(StatusController)
  // .addTag(TAGS.Controller)
  registerController(builder, StatusController)
}
