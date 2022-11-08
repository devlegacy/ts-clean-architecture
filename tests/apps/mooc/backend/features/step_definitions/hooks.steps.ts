import { AfterAll, BeforeAll } from '@cucumber/cucumber'
import { container } from 'tsyringe'

import { MoocBackendApp } from '@/apps/mooc/backend/MoocBackendApp'
import { TYPES } from '@/apps/mooc/dependency-injection/types'
import { EventBus } from '@/Contexts/Shared/domain'
import { EnvironmentArranger } from '@/tests/Contexts/Shared/infrastructure'

let application: MoocBackendApp
let environmentArranger: EnvironmentArranger
let eventBus: EventBus

BeforeAll(async () => {
  // await ConfigureRabbitMQCommand.run()

  environmentArranger = container.resolve<EnvironmentArranger>(TYPES.EnvironmentArranger)
  eventBus = container.resolve<EventBus>(TYPES.EventBus)
  await environmentArranger.arrange()

  // application = new MoocBackendApp()
  // await application.start()
})

AfterAll(async () => {
  await environmentArranger.close()

  // await application.stop()
  // // TODO: The exit process should be automatic
  // setTimeout(() => {
  //   process.exit(0)
  // }, 0)
})

export { application, environmentArranger, eventBus }
