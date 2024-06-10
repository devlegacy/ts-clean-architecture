import type {
  Cluster,
} from 'node:cluster'

import {
  info,
} from '#@/src/Contexts/Shared/infrastructure/Logger/index.js'

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
    setTimeout(
      () => this.loadWorker(),
      300,
    )
  }
}
