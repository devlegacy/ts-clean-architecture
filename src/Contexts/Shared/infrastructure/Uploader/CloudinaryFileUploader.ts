import type { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import {
  // UploadApiErrorResponse,
  // UploadApiResponse,
  v2 as Cloudinary,
} from 'cloudinary'

import { FileUploader, type RemoteFile, type UploadedFile } from '../../domain/index.js'
import { createProfilePicture } from '../canvas.js'
import { BaseFileUploader } from './BaseFileUploader.js'
import { createFileRequest } from './createRequestFile.js'

export class CloudinaryFileUploader extends BaseFileUploader implements FileUploader {
  #client: typeof Cloudinary

  // No extraemos la firma (interfaz) del constructor
  // La firma pertenece a la clase
  // y las configuraciones pueden variar de una implementación a otra {AWSFileService} | {CloudinaryFileService}.
  // Aquí recibimos los parámetros para hace la instancia este cliente/servicio de infraestructura.
  // Cada clase puede encapsular sus particularidades / variables / funciones que se usen en la instancia.
  // ej. private static CLIENT_NAME = 'xxxxx-xxxx'

  // Con test podemos inyectar otra implementación al FileUploader en {RemoteFileUpload({AWSFileService} | {CloudinaryFileService})}
  constructor(client: typeof Cloudinary) {
    super()
    this.#client = client
  }

  async upload(
    files: RemoteFile | RemoteFile[] | Record<string, RemoteFile> | Record<string, RemoteFile[]>
  ): Promise<
    UploadedFile | UploadedFile[] | Record<string, UploadedFile> | Record<string, UploadedFile[]> | undefined
  > {
    try {
      if (this.isFileCollection(files)) {
        // best practice map without await callback
        const paths = await Promise.all(files.map(async (file) => this.#uploadFile(file)))
        // const paths = uploads.map((path) => ({ path }))
        return paths
      } else if (this.isFile(files)) {
        const path = await this.#uploadFile(files)
        return path
      } else if (this.isFileRecord(files)) {
        const key = Object.keys(files)[0]!
        const path = await this.#uploadFile(files[`${key}`]!)
        return { [key]: path }
      } else if (this.isFileCollectionRecord(files)) {
        const paths: Record<string, string[]> = {}
        const keys = Object.keys(files)
        for (const key of keys) {
          // eslint-disable-next-line max-depth
          if (!(key in paths)) {
            paths[`${key}`] = []
          }
          const currentPaths = await Promise.all(files[`${key}`]!.map(async (file) => this.#uploadFile(file)))
          paths[`${key}`] = currentPaths
        }
        return paths
      }
      return undefined
    } catch (e) {
      console.log(e)
      return undefined
    }
  }

  // #generateFileKey(file: RemoteFile, timestamp: number): string {
  //   const name = file.name
  //     .replace(/_|\s/g, '-') // replace white spaces and underscore by dash
  //     .replace(/\.[^/.]+$/, '') // delete end .[string] - .jpeg | .png | .something to get only name
  //   return `${timestamp}-${name}.${file.ext}`
  // }

  async #uploadFile(file: RemoteFile, _metadata?: Record<string, string>): Promise<string> {
    // const timestamp = Date.now()
    // const fileKey = this.#generateFileKey(file, timestamp)
    const fileKey = file.name

    return new Promise((resolve, reject) => {
      const uploadStream = this.#client.uploader.upload_stream(
        {
          format: file.ext,
          public_id: fileKey,
          // resource_type: 'auto',
        },
        (err?: UploadApiErrorResponse, result?: UploadApiResponse) => {
          if (err) {
            reject(err)
          }
          resolve(result!.secure_url)
        }
      )
      uploadStream.on('finish', () => {
        console.log('finished', uploadStream)
      })
      uploadStream.on('error', (error) => {
        console.log('error', error)
      })
      try {
        const stream = this.bufferToReadStream(file.content)
        stream.pipe(uploadStream)
      } catch (e) {
        console.log(e)
      }
    })
  }
}
Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})
const uploader = new CloudinaryFileUploader(Cloudinary)
const buffer = createProfilePicture('mt')

const bootstrap = async () => {
  const picture = await createFileRequest({
    name: 'tests/upload-sr.png',
    content: buffer,
  })
  console.log('single', await uploader.upload(picture))
}
bootstrap()
