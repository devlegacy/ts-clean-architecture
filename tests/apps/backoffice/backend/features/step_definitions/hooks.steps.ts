/// <reference types="../../../../../../types"/>

import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber'
import supertest, { SuperTest, Test } from 'supertest'

import { BackofficeBackendApp } from '@/apps/backoffice/backend/BackofficeBackendApp'
import { ConfigureRabbitMQCommand } from '@/apps/backoffice/backend/command/ConfigureRabbitMQCommand'
import { container } from '@/apps/backoffice/modules'
import { EventBus } from '@/Contexts/Shared/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

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

function wait(milliseconds = 800) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export { api, application, environmentArranger, eventBus, wait }
