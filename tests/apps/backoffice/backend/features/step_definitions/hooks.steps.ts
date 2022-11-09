/// <reference types="../../../../../../types"/>

import { AfterAll, BeforeAll } from '@cucumber/cucumber'
import supertest, { SuperTest, Test } from 'supertest'
import { container } from 'tsyringe'

import { BackofficeBackendApp } from '@/apps/backoffice/backend/BackofficeBackendApp'
import { ConfigureRabbitMQCommand } from '@/apps/backoffice/backend/command/ConfigureRabbitMQCommand'
import { TYPES } from '@/apps/backoffice/dependency-injection/types'
import { EventBus } from '@/Contexts/Shared/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

let application: BackofficeBackendApp
let api: SuperTest<Test>
let environmentArranger: EnvironmentArranger
let eventBus: EventBus

BeforeAll(
  {
    timeout: 2 * 5000
  },
  async () => {
    await ConfigureRabbitMQCommand.run()
    environmentArranger = await container.resolve<Promise<EnvironmentArranger>>(TYPES.EnvironmentArranger)
    eventBus = container.resolve<EventBus>(TYPES.EventBus)
    await environmentArranger.arrange()

    application = new BackofficeBackendApp()
    await application.start()
    api = supertest(application.httpServer)
  }
)

AfterAll(async () => {
  await environmentArranger.close()

  await application.stop()

  // TODO: The exit process should be automatic
  setTimeout(() => {
    process.exit(0)
  }, 0)
})

export { api, application, environmentArranger, eventBus }
