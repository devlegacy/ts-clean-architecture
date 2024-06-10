// ❌
export class MikroOrmMongoTransactionWrapper {
  constructor(
    // event bus at end
    readonly entityManger: any,
    readonly useCase: () => void, // Caso de uso
  ) {}
}
