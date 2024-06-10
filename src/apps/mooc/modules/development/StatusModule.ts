import {
  ContainerBuilder,
} from 'diod'

import {
  StatusController,
} from '#@/src/apps/mooc/backend/controllers/Status/StatusController.js'

import {
  TAGS,
} from '../tags.js'
// import {
//   registerController,
// } from '#@/src/Contexts/Shared/infrastructure/index.js'

export const StatusModule = (builder: ContainerBuilder) => {
  builder
    // .registerAndUse((await import('#@/src/apps/backoffice/backend/controllers/Status/StatusController.js')).StatusController)
    .registerAndUse(StatusController)
    .addTag(TAGS.Controller)
  // registerController(
  //   builder,
  //   StatusController,
  // )
}
