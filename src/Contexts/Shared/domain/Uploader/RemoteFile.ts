export interface RemoteFile {
  name: string
  size: number
  /**
   * type: ContentType | MimeType: depending on the context
   * Read more on: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
   * **ContentType** and **MimeType** are related and can be used interchangeably but there is a subtle difference between them.
   *
   * **MimeType** (MIME) Multipurpose Internet Mail Extensions is a standard that indicates the nature (type) and format (subtype) of a document, file, or assortment of bytes (text/plain, image/jpeg, audio/mp3, etc).
   *
   * **ContentType** is an HTTP header that provides the client with the media type of the response body. It's value is a MimeType but it can contain additional information like charset.
   * It can be used to indicate the media type of the resource being requested or the media type that should be sent in the response.
   */
  type: string
  ext: string
  content: Buffer
}
