// to have /
import { URL } from 'node:url'

import { type CompleteMultipartUploadCommandOutput, S3Client } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

import { FileUploader, type RemoteFile, type UploadedFile } from '../../domain/index.js'
import { createProfilePicture } from '../canvas.js'
import { BaseFileUploader } from './BaseFileUploader.js'
import { createFileRequest } from './createRequestFile.js'

export class AwsFileUploader extends BaseFileUploader implements FileUploader {
  #client: S3Client

  constructor(client: S3Client) {
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

  async #uploadFile(file: RemoteFile, metadata?: Record<string, string>): Promise<string> {
    const fileKey = file.name

    // const params: PutObjectCommandInput = {
    //   Bucket: process.env.AWS_BUCKET,
    //   ContentType: file.type,
    //   Body: file.content,
    //   Key: fileKey,
    //   Metadata: {
    //     ...metadata,
    //     createdAt: new Date().toISOString(),
    //   },
    // }
    // const command = new PutObjectCommand(params)
    // const putOutput = await this.#client.send<PutObjectCommandInput, PutObjectCommandOutput>(command)
    // console.log(putOutput)

    const upload: CompleteMultipartUploadCommandOutput = await new Upload({
      client: this.#client,
      params: {
        ACL: 'public-read',
        Bucket: process.env.AWS_BUCKET,
        ContentType: file.type,
        Body: file.content,
        Key: fileKey,
        Metadata: {
          ...metadata,
          createdAt: new Date().toISOString(),
        },
      },
      tags: [], // optional tags
      queueSize: 4, // optional concurrency configuration
      partSize: 1024 * 1024 * 5, // optional size of each part, in bytes, at least 5MB
      leavePartsOnError: false, // optional manually handle dropped parts
    }).done()

    // if (response && response.$metadata.httpStatusCode >= 200 && response.$metadata.httpStatusCode < 300) {}

    if (process.env.CDN_URL) {
      const url = new URL(process.env.CDN_URL)
      url.pathname += `/${fileKey}`
      return url.href
    }
    try {
      // NOTE: Location !== Object URL
      // Object URL: https://[bucket].s3.[region].amazonaws.com/[fileKey | object]

      /**
       * S3 has have different URL formats
       * Route format: https://s3.[region].amazonaws.com/[bucket]/[fileKey | object]
       * Subdomain format: https://[bucket].s3.[region].amazonaws.com/[fileKey | object]
       */
      return new URL(upload.Location || '').href
    } catch (_) {
      return `${fileKey}`
    }
  }
}

const buffer = createProfilePicture('sr')

const uploader = new AwsFileUploader(
  new S3Client({
    region: process.env.AWS_DEFAULT_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
  })
)

// eslint-disable-next-line max-lines-per-function
const bootstrap = async () => {
  let picture = await createFileRequest({
    name: 'tests/upload-sr.png',
    content: buffer,
  })
  console.log('single', await uploader.upload(picture))

  picture = await createFileRequest({
    name: 'tests/upload-sr.png',
    content: buffer,
  })
  let photo = await createFileRequest({
    name: 'tests/upload-sr.png',
    content: buffer,
  })
  console.log('collection', await uploader.upload([picture, photo]))

  picture = await createFileRequest({
    name: 'tests/upload-sr.png',
    content: buffer,
  })
  console.log(
    'single record',
    await uploader.upload({
      picture,
    })
  )

  picture = await createFileRequest({
    name: 'tests/upload-sr.png',
    content: buffer,
  })
  const secondPicture = await createFileRequest({
    name: 'tests/upload-sr.png',
    content: buffer,
  })
  photo = await createFileRequest({
    name: 'tests/upload-sr.png',
    content: buffer,
  })
  const secondPhoto = await createFileRequest({
    name: 'tests/upload-sr.png',
    content: buffer,
  })
  console.log(
    'collection record',
    await uploader.upload({
      pictures: [picture, secondPicture],
      photos: [photo, secondPhoto],
    })
  )
}

bootstrap()
// export interface MultipartFile {
//   type: 'file';
//   toBuffer: () => Promise<Buffer>;
//   _buf: null | Buffer;
//   file: BusboyFileStream; // FileStream
//   fieldname: string;
//   filename: string;
//   encoding: string; // '7bit' | '8bit' | 'binary' | 'quoted-printable' | 'base64' | 'uu' | 'utf-8' | 'utf8' | 'ascii' | 'utf16le' | 'ucs2' | 'ucs-2' | 'latin1' | 'binary' | 'hex'
//   mimetype: string; // 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' | 'image/svg+xml' | 'image/x-icon' | 'image/vnd.microsoft.icon' | 'image/tiff' | 'image/tiff-fx' | 'image/bmp' | 'image/heic' | 'image/heif' | 'image/avif' | 'image/jxl' | 'image/jpg' | 'image/jp2' | 'image/jpm' | 'image/jpx' | 'image/xbm' | 'image/pjpeg' | 'image/pjp' | 'image/ico' | 'image/icon' | 'image/x-icon' | 'image/svg' | 'image/svg+xml' | 'image/webp' | 'image/x-xbitmap' | 'image/x-win-bitmap' | 'image/x-windows-bmp' | 'image/ms-bmp' | 'image/x-ms-bmp' | 'image/x-bmp' | 'image/x-ms-bmp' | 'image/x-xbm' | 'image/x-jps' | 'image/x-jp2' | 'image/x-jpm' | 'image/x-jpx' | 'image/x-jpeg2000' | 'image/x-jpeg2000-image' | 'image/x-citrix-jpeg' | 'image/x-citrix-png' | 'image/x-png' | 'image/x-portable-anymap' | 'image/x-portable-bitmap' | 'image/x-portable-graymap' | 'image/x-portable-pixmap' | 'image/x-rgb' | 'image/x-xpixmap' | 'image/x-xbitmap' | 'image/x-xpixmap' | 'image/x-xwindowdump' | 'image/x-xwd' | 'image/x-xwindowdump' | 'image/x-xwd' | 'image/x-jng' | 'image/x-citrix-jpeg' | 'image/x-citrix-png' | 'image/x-citrix-gif' | 'image/x-citrix-bmp' | 'image/x-citrix-tiff' | 'image/x-citrix-tiff-fx' | 'image/x-citrix-pjpeg' | 'image/x-citrix-pjpg' | 'image/x-citrix-pjp' | 'image/x-citrix-svg+xml' | '
//   fields: MultipartFields;
// }
