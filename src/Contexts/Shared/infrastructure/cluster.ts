import { info } from '@qualy/logger'
import { Cluster } from 'cluster'

export class Primary {
  private cluster: Cluster
  constructor(config: { cluster: Cluster }) {
    this.cluster = config.cluster
  }

  loadWorker() {
    const worker = this.cluster.fork()
    info(`Worker: ${worker.id} is running`)
  }

  loadStoppedWorker() {
    setTimeout(() => this.loadWorker(), 300)
  }
}
