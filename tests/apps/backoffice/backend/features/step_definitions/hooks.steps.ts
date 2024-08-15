import {
  setTimeout as wait,
} from 'node:timers/promises'

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
  BackofficeBackendApp,
} from '#@/src/apps/backoffice/backend/BackofficeBackendApp.js'
import {
  ConfigureRabbitMQCommand,
} from '#@/src/apps/backoffice/backend/command/ConfigureRabbitMQCommand.js'
import {
  container,
} from '#@/src/apps/backoffice/modules/index.js'
import {
  EventBus,
  ONE_MINUTE_IN_MILLISECONDS,
  ONE_SECOND_IN_MILLISECONDS,
  TEN_SECONDS_IN_MILLISECONDS,
} from '#@/src/Contexts/Shared/domain/index.js'
import {
  EnvironmentArranger,
} from '#@/tests/Contexts/Shared/infrastructure/index.js'

const application = new BackofficeBackendApp()
// const moocBackendApp = new MoocBackendApp()

let api: TestAgent<Test>
const environmentArranger = container.get<EnvironmentArranger>(EnvironmentArranger)
const eventBus = container.get<EventBus>(EventBus)
setDefaultTimeout(ONE_MINUTE_IN_MILLISECONDS)

BeforeAll(
  {
    timeout: TEN_SECONDS_IN_MILLISECONDS,
  },
  async () => {
    await ConfigureRabbitMQCommand.run()

    // await moocBackendApp.start()
    await application.start()
    api = supertest(application.httpServer!)
    await wait(ONE_SECOND_IN_MILLISECONDS)
    await environmentArranger.arrange()
  },
)

AfterAll(async () => {
  await environmentArranger.arrange()
  await environmentArranger.close()

  // await moocBackendApp.stop()
  await wait(ONE_SECOND_IN_MILLISECONDS)
  await application.stop()

  // TODO: The exit process should be automatic
  setTimeout(() => {
    process.exit(0)
  }, 0)
})

export {
  api,
  application,
  environmentArranger,
  eventBus
}
