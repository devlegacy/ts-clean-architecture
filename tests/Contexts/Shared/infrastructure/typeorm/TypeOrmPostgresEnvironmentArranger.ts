import { DataSource, EntityMetadata } from 'typeorm'

import { EnvironmentArranger } from '../arranger/EnvironmentArranger'

export class TypeOrmPostgresEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<DataSource>) {
    super()
  }

  async arrange(): Promise<void> {
    this.cleanDatabase()
  }

  async close(): Promise<void> {
    return (await this.client()).destroy()
  }

  protected async cleanDatabase() {
    const entities = await this.entities()
    try {
      for (const entity of entities) {
        const repository = (await this._client).getRepository(entity.name)
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
    return (await this._client).entityMetadatas
  }
}
