import { FastifyInstance } from 'fastify'
import * as http from 'http'
import { AddressInfo } from 'net'

import { bootstrap } from '@/shared/bootstrap'
import { config } from '@/shared/config'
import { FastifyAdapter } from '@/shared/fastify'
import { JoiModule } from '@/shared/joi'

export class Server {
  private readonly _port: number
  private readonly _app: FastifyInstance
  private _httpServer?: http.Server

  constructor(port = 8080) {
    this._port = port

    this._app = new FastifyAdapter().enableCors().setValidationModule(new JoiModule()).instance
  }

  async listen() {
    await bootstrap(this._app, { controller: './src/apps/mooc/backend/controllers' })

    await this._app.listen({
      port: this._port,
      host: '0.0.0.0'
    })

    this._httpServer = this._app.server

    const address: AddressInfo = this._app.server.address() as AddressInfo

    this._app.log.info(`🚀 Server running on: http://localhost:${address.port}`)
    this._app.log.info('    Press CTRL-C to stop 🛑')

    const APP_DEBUG = config.get<boolean>('APP_DEBUG', false)
    if (APP_DEBUG) {
      this._app.log.info(this._app.printRoutes())
    }
  }

  getHttpServer() {
    return this._httpServer
  }

  stop() {
    try {
      this?._httpServer?.close()
    } catch (e) {
      this._app.log.error(e)
    }
  }
}
