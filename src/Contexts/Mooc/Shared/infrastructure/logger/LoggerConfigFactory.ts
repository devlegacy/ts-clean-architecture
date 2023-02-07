import config from '../config'

export class LoggerConfigFactory {
  static createConfig() {
    return {
      name: config.get('app.name'),
      level: config.get('log.level'),
    }
  }
}
