import {
  AfterAll,
  BeforeAll,
  setDefaultTimeout,
} from '@cucumber/cucumber'
import supertest, {
  type Test,
} from 'supertest'
import type TestAgent from 'supertest/lib/agent.js'

import {
  ConfigureRabbitMQCommand,
} from '#@/src/apps/mooc/backend/command/ConfigureRabbitMQCommand.js'
import {
  MoocBackendApp,
} from '#@/src/apps/mooc/backend/MoocBackendApp.js'
import {
  container,
} from '#@/src/apps/mooc/modules/index.js'
import {
  EventBus,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  wait,
} from '#@/tests/Contexts/Shared/domain/index.js'
import {
  EnvironmentArranger,
} from '#@/tests/Contexts/Shared/infrastructure/index.js'

const application = new MoocBackendApp()

let api: TestAgent<Test>
const environmentArranger = container.get(EnvironmentArranger)
const eventBus = container.get(EventBus)
setDefaultTimeout(60 * 1000)

BeforeAll(async () => {
  await ConfigureRabbitMQCommand.run()

  await application.start()
  api = supertest(application.httpServer!)
  await wait(1000)
  await environmentArranger.arrange()
})

AfterAll(async () => {
  await environmentArranger.arrange()
  await environmentArranger.close()

  await wait(1000)
  // await backofficeBackendApp.stop()
  await application.stop()

  // DEBT: The exit process should be automatic
  // setTimeout(() => {
  //   process.exit(0)
  // }, 0)
})

export {
  api, application, environmentArranger, eventBus
}
