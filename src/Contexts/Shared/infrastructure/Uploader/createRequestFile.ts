import { join, parse } from 'node:path/posix'

import mime from 'mime'
import { v4 } from 'uuid'

export const createFileRequest = async (file: { name: string; content: Buffer }) => {
  const timestamp = Date.now()
  const { name, ext, dir } = parse(file.name)
  const fileName = name.replace(/_|\s/g, '-').concat(ext) // replace white spaces and underscore by dash
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const FileType = await import('file-type').then((module) => module.default)
  // const fileType = await FileType.fileTypeFromFile(file.name)
  // const bufferFileType = await FileType.fileTypeFromBuffer(buffer)

  // if (!bufferFileType) {
  //   throw new Error('File type not supported')
  // }
  // if (!fileType) {
  //   throw new Error('File type not supported')
  // }
  // if (fileType.ext !== bufferFileType.ext) {
  //   throw new Error('File type not supported')
  // }

  return {
    // filename: {
    //   original: file.name,
    //   fileKey: join(dir, `${timestamp}-${v4()}-${fileName}${ext || file.ext}`),
    // },
    // name: fileName,
    name: join(dir, `${timestamp}-${v4()}-${fileName}`),
    // name: join(dir, `${fileName}${ext}`),
    size: file.content.length,
    type: mime.getType(ext)!,
    ext: ext.replace(/\.+/, ''),
    content: file.content,
  }
}
