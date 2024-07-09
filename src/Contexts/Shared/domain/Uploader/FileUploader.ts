import type {
  RemoteFile,
} from './RemoteFile.js'
import type {
  UploadedFile,
} from './UploadedFile.js'

export abstract class FileUploader {
  // upload(files: Record<string, File[]>) => Promise<Record<string, string> | undefined>
  // upload(files: File) => Promise<UploadedFile | undefined>

  // upload: (files: File[]) => Promise<UploadedFile[] | undefined>
  abstract upload(
    files: RemoteFile | RemoteFile[] | Record<string, RemoteFile> | Record<string, RemoteFile[]>,
  ): Promise<UploadedFile | UploadedFile[] | Record<string, UploadedFile> | Record<string, UploadedFile[]> | undefined>
}
