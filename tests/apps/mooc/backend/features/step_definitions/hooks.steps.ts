import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber'
import supertest, { SuperTest, Test } from 'supertest'

import { ConfigureRabbitMQCommand } from '@/apps/mooc/backend/command/ConfigureRabbitMQCommand'
import { MoocBackendApp } from '@/apps/mooc/backend/MoocBackendApp'
import { container } from '@/apps/mooc/modules'
import { EventBus } from '@/Contexts/Shared/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

const application = new MoocBackendApp()

let api: SuperTest<Test>
const environmentArranger = container.get(EnvironmentArranger)
const eventBus = container.get(EventBus)
setDefaultTimeout(60 * 1000)

BeforeAll(async () => {
  await ConfigureRabbitMQCommand.run()

  await application.start()
  api = supertest(application.httpServer)
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

function wait(milliseconds = 800) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export { api, application, environmentArranger, eventBus, wait }
