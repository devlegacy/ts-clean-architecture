import { DataSource, EntityMetadata } from 'typeorm'

import { EnvironmentArranger } from '../arranger/EnvironmentArranger'

export class TypeOrmPostgresEnvironmentArranger extends EnvironmentArranger {
  constructor(private readonly _client: Promise<DataSource>) {
    super()
  }

  override async arrange(): Promise<void> {
    this.cleanDatabase()
  }

  override async close(): Promise<void> {
    const client = await this._client
    return client.destroy()
  }

  protected async cleanDatabase() {
    const entities = await this.entities()
    const client = await this._client
    try {
      for (const entity of entities) {
        const repository = client.getRepository(entity.name)
        await repository.query(`TRUNCATE TABLE ${entity.tableName}`)
      }
    } catch (e) {
      throw new Error(`Unable to clean test databases: ${e}`)
    }
  }

  protected client(): Promise<DataSource> {
    return this._client
  }

  private async entities(): Promise<EntityMetadata[]> {
    const client = await this._client
    return client.entityMetadatas
  }
}
