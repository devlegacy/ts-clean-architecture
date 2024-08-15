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
  ONE_MINUTE_IN_MILLISECONDS,
  ONE_SECOND_IN_MILLISECONDS,
  TEN_SECONDS_IN_MILLISECONDS,
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
setDefaultTimeout(ONE_MINUTE_IN_MILLISECONDS)

BeforeAll({
  timeout: TEN_SECONDS_IN_MILLISECONDS,
}, async () => {
  await ConfigureRabbitMQCommand.run()

  await application.start()
  api = supertest(application.httpServer!)
  await wait(ONE_SECOND_IN_MILLISECONDS)
  await environmentArranger.arrange()
})

AfterAll(async () => {
  await environmentArranger.arrange()
  await environmentArranger.close()

  await wait(ONE_SECOND_IN_MILLISECONDS)
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
