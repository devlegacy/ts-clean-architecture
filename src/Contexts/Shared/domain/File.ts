import {
  existsSync,
  lstatSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import {
  EOL,
} from 'node:os'
import {
  parse,
  relative,
  resolve,
} from 'node:path'
import {
  cwd,
} from 'node:process'

import {
  globSync,
} from 'glob'

export interface ParsedFile {
  isDir: boolean
  isFile: boolean
  path: string
  absolutePath: string
  dir: string
  file: string
  name: string
  ext: string
}

export class File {
  readonly info: ParsedFile
  #absolutePath: string
  #filePath: string

  constructor(filePath: string, context: string = cwd()) {
    this.#absolutePath = resolve(context, filePath)
    this.#filePath = this.relativePath()
    this.info = this.parse()
  }

  static find(path: string, context: string = cwd()): File {
    return new File(path, context)
  }

  static sync(pattern: string, opts?: { nodir?: boolean, cwd?: string, absolute?: boolean }) {
    return globSync(pattern, opts)
  }

  static exists(file: string) {
    return existsSync(file)
  }

  isDirectory() {
    try {
      return lstatSync(this.#absolutePath).isDirectory()
    } catch {
      return false
    }
  }

  isFile() {
    try {
      return statSync(this.#absolutePath).isFile()
    } catch {
      return false
    }
  }

  path(): string {
    return this.#absolutePath
  }

  relativePath() {
    return relative(cwd(), this.path())
  }

  base() {
    return this.info.dir
  }

  name() {
    return this.info.file
  }

  nameWithoutExtension() {
    return this.info.name
  }

  extension() {
    return this.info.ext
  }

  write(body: object | string) {
    if (typeof body === 'object') {
      body = JSON.stringify(body, null, 4)
    }

    body = `${body}${EOL}`

    writeFileSync(this.#absolutePath, body)

    return this
  }

  read() {
    return readFileSync(this.path(), 'utf8')
  }

  private parse(): ParsedFile {
    const {
      dir, base: file, name, ext,
    } = parse(this.#absolutePath)
    const isDir = this.isDirectory()
    const isFile = this.isFile()
    const path = this.#filePath
    const absolutePath = this.#absolutePath
    const info = {
      isDir,
      isFile,
      path,
      absolutePath,
      dir,
      file,
      name,
      ext,
    }

    return info
  }
}
