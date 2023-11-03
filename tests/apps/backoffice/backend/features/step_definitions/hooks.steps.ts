// /// <reference types="../../../../../../types"/>

import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber'
import supertest, { type SuperTest, type Test } from 'supertest'

import { BackofficeBackendApp } from '@/apps/backoffice/backend/BackofficeBackendApp.js'
import { ConfigureRabbitMQCommand } from '@/apps/backoffice/backend/command/ConfigureRabbitMQCommand.js'
import { container } from '@/apps/backoffice/modules/index.js'
import { EventBus } from '@/Contexts/Shared/domain/index.js'
import { wait } from '@/tests/Contexts/Shared/domain/index.js'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure/index.js'

const application = new BackofficeBackendApp()
// const moocBackendApp = new MoocBackendApp()

let api: SuperTest<Test>
const environmentArranger = container.get<EnvironmentArranger>(EnvironmentArranger)
const eventBus = container.get<EventBus>(EventBus)
setDefaultTimeout(60 * 1000)

BeforeAll(
  {
    timeout: 2 * 5000,
  },
  async () => {
    await ConfigureRabbitMQCommand.run()

    // await moocBackendApp.start()
    await application.start()
    api = supertest(application.httpServer)
    await wait(1000)
    await environmentArranger.arrange()
  }
)

AfterAll(async () => {
  await environmentArranger.arrange()
  await environmentArranger.close()

  // await moocBackendApp.stop()
  await wait(1000)
  await application.stop()

  // TODO: The exit process should be automatic
  setTimeout(() => {
    process.exit(0)
  }, 0)
})

export { api, application, environmentArranger, eventBus }
