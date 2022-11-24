/// <reference types="../../../../../../types"/>

import { AfterAll, BeforeAll } from '@cucumber/cucumber'
import supertest, { SuperTest, Test } from 'supertest'
import { container } from 'tsyringe'

import { BackofficeBackendApp } from '@/apps/backoffice/backend/BackofficeBackendApp'
import { ConfigureRabbitMQCommand } from '@/apps/backoffice/backend/command/ConfigureRabbitMQCommand'
import { TYPES } from '@/apps/backoffice/modules/types'
import { EventBus } from '@/Contexts/Shared/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

const application = new BackofficeBackendApp()
// const moocBackendApp = new MoocBackendApp()

let api: SuperTest<Test>
const environmentArranger = container.resolve<EnvironmentArranger>(TYPES.EnvironmentArranger)
const eventBus = container.resolve<EventBus>(TYPES.EventBus)

BeforeAll(
  {
    timeout: 2 * 5000
  },
  async () => {
    await ConfigureRabbitMQCommand.run()
    await environmentArranger.arrange()

    // await moocBackendApp.start()
    await application.start()
    api = supertest(application.httpServer)
  }
)

AfterAll(async () => {
  await environmentArranger.arrange()
  await environmentArranger.close()

  // await moocBackendApp.stop()
  await application.stop()

  // TODO: The exit process should be automatic
  setTimeout(() => {
    process.exit(0)
  }, 0)
})

export { api, application, environmentArranger, eventBus }
