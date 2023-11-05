import { Readable } from 'node:stream'

import type { RemoteFile } from '../../domain/index.js'

export abstract class BaseFileUploader {
  protected isFile(file: unknown): file is RemoteFile {
    if (!file || typeof file !== 'object' || !('content' in file)) {
      return false
    }
    return true
  }

  protected isFileCollection(file: unknown): file is RemoteFile[] {
    if (!file || !Array.isArray(file) || !file.length || !this.isFile(file[0])) {
      return false
    }
    return true
  }

  protected isFileRecord(file: unknown): file is Record<string, RemoteFile> {
    if (
      !file ||
      typeof file !== 'object' ||
      !Object.keys(file).length ||
      // @ts-expect-error index object
      !this.isFile(file[Object.keys(file)[0]])
    ) {
      return false
    }
    return true
  }

  protected isFileCollectionRecord(file: unknown): file is Record<string, RemoteFile[]> {
    if (
      !file ||
      typeof file !== 'object' ||
      !Object.keys(file).length ||
      // @ts-expect-error index object
      !this.isFileCollection(file[Object.keys(file)[0]])
    ) {
      return false
    }
    return true
  }

  protected bufferToReadStream(buffer: Buffer) {
    const stream = new Readable({
      read() {
        this.push(buffer)
        this.push(null)
      },
    })
    return stream
  }
}
