interface Attachment {
  filename: string
  content?: any
  path?: string
  contentType?: string
  encoding?: string
  contentDisposition?: 'attachment' | 'inline' | undefined
}
export interface EmailSenderOptions {
  to?: string
  from?: string
  subject?: string
  html?: string
  context?: Record<string, any>
  template?: string
  attachments?: Attachment[]
}

export abstract class EmailSender {
  abstract send(options: EmailSenderOptions): Promise<void>
}
