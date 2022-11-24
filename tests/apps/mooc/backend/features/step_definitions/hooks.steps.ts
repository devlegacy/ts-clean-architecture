import { AfterAll, BeforeAll } from '@cucumber/cucumber'
import supertest, { SuperTest, Test } from 'supertest'
import { container } from 'tsyringe'

import { ConfigureRabbitMQCommand } from '@/apps/mooc/backend/command/ConfigureRabbitMQCommand'
import { MoocBackendApp } from '@/apps/mooc/backend/MoocBackendApp'
import { TYPES } from '@/apps/mooc/modules/types'
import { EventBus } from '@/Contexts/Shared/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

const application = new MoocBackendApp()
// const backofficeBackendApp = new BackofficeBackendApp()

let api: SuperTest<Test>
const environmentArranger = container.resolve<EnvironmentArranger>(TYPES.EnvironmentArranger)
const eventBus = container.resolve<EventBus>(TYPES.EventBus)

BeforeAll(async () => {
  await ConfigureRabbitMQCommand.run()
  await environmentArranger.arrange()

  // await backofficeBackendApp.start()
  await application.start()
  api = supertest(application.httpServer)
})

AfterAll(async () => {
  await environmentArranger.arrange()
  await environmentArranger.close()

  // await backofficeBackendApp.stop()
  await application.stop()

  // TODO: The exit process should be automatic
  setTimeout(() => {
    process.exit(0)
  }, 0)
})

export { api, application, environmentArranger, eventBus }
