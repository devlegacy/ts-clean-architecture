export interface AwsConfig {
  region: string
  credentials: {
    accessKeyId: string
    secretAccessKey: string
  }
}
