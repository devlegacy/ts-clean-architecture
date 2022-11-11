import { AfterAll, BeforeAll } from '@cucumber/cucumber'
import supertest, { SuperTest, Test } from 'supertest'
import { container } from 'tsyringe'

import { ConfigureRabbitMQCommand } from '@/apps/mooc/backend/command/ConfigureRabbitMQCommand'
import { MoocBackendApp } from '@/apps/mooc/backend/MoocBackendApp'
import { TYPES } from '@/apps/mooc/dependency-injection/types'
import { EventBus } from '@/Contexts/Shared/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

let application: MoocBackendApp
let api: SuperTest<Test>
const environmentArranger = container.resolve<EnvironmentArranger>(TYPES.EnvironmentArranger)
const eventBus = container.resolve<EventBus>(TYPES.EventBus)

BeforeAll(async () => {
  await ConfigureRabbitMQCommand.run()
  await environmentArranger.arrange()

  application = new MoocBackendApp()
  await application.start()
  api = supertest(application.httpServer)
})

AfterAll(async () => {
  await environmentArranger.close()

  await application.stop()

  // TODO: The exit process should be automatic
  setTimeout(() => {
    process.exit(0)
  }, 0)
})

export { api, application, environmentArranger, eventBus }
