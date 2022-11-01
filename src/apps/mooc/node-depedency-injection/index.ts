import { ContainerBuilder, JsFileLoader } from 'node-dependency-injection'

import config from '@/Contexts/Mooc/Shared/infrastructure/config'

const container = new ContainerBuilder()
const loader = new JsFileLoader(container)

//
;(async () => {
  await loader.load(`./container/${config.get('app.env')}.js`)
})()

export default container
