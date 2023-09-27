import { config } from '../config/index.js'

export class LoggerConfigFactory {
  static createConfig() {
    return {
      name: config.get('app.name'),
      level: config.get('log.level'),
    }
  }
}
