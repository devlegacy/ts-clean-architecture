import type { RemoteFile } from './RemoteFile.js'
import type { UploadedFile } from './UploadedFile.js'

export interface FileUpload {
  upload: (files: RemoteFile[]) => Promise<UploadedFile[]>
}
