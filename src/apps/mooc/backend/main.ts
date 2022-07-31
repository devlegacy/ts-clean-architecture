import 'reflect-metadata'

import cluster from 'cluster'
import { cpus } from 'os'

import { Primary } from '@/shared/cluster'
import { config } from '@/shared/config'
import { fatalErrorHandler, info } from '@/shared/logger'

import { MoocBackendApp } from './mooc-backend-app'

process.on('uncaughtException', fatalErrorHandler).on('unhandledRejection', fatalErrorHandler)

const availableCpus = cpus().length

try {
  if (cluster.isPrimary) {
    const primary = new Primary({ cluster })
    const limit = config.get<string>('APP_ENV', 'development') === 'production' ? availableCpus : 1
    for (let i = 0; i < limit; i++) primary.loadWorker()
    cluster.on('exit', (worker) => {
      info(`Custer number: ${worker.id} stopped`)
      primary.loadStoppedWorker()
    })
  } else {
    new MoocBackendApp().start()
  }
} catch (e) {
  fatalErrorHandler(e as Error)
}
