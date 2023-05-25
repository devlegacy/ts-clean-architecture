# Notes 

## Scaffold

```sh
  tree -L 4 src
```

📂 `project-root/`     
├─ 📂 `.bin` Binary and helper files     
├─ 📂 `.cache/`     
├─ 📂 `.data/`      
├─ 📂 `.docker/` Docker images     
├─ 📂 `.git/`     
├─ 📂 `.github/`     
├─ 📂 `.husky/`     
├─ 📂 `.tmp/`     
├─ 📂 `.vscode` Visual studio code files     
├─ 📂 `coverage/`     
├─ 📂 `dist/` Código para producción (debería ser lo único en el contenedor)     
├─ 📂 `src/` Código a transpilar para producción, ayuda a configurar tsconfig, simplicidad     
│  ├─ 📂 `Contexts/` Bounded Contexts 🗃 - Organizational estructure - Mínimo conocimiento de TypeScript     
│  │  ├─ 📂 `Mooc/` 🚀 Bounded Context   
│  │  │  ├─ 📂 `Videos/` 📥 Module - Cohesion - ¿Quién eres y qué tipo? - Evitamos clases huérfanas    
│  │  │  ├─ 📂 `Courses/` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  │  ├─ 📂 `application/` - ¿De qué tipo? (UserRegister, UserRemover)   
│  │  │  │  │  ├─ 📂 `Creator/` - 📥 SubModule   
│  │  │  │  │  │  ├─ 📄 `CreateCourseCommand.ts` | can't use command bus (keep one responsibility)    
│  │  │  │  │  │  ├─ 📄 `CreateCourseCommandHandler.ts` - instance Value Objects   
│  │  │  │  │  │  ├─ 📄 `CourseCreator.ts`   use case | can use query bus   
│  │  │  │  │  ├─ 📂 `SearchByCriteria/` - 📥 SubModule   
│  │  │  │  │  │  ├─ 📄 `SearchByCriteriaQuery.ts`    
│  │  │  │  │  │  ├─ 📄 `SearchByCriteriaQueryHandler.ts`    
│  │  │  │  │  │  ├─ 📄 `CourseFinder.ts`   use case 
│  │  │  │  │  ├─ 📄 `CoursesUseCase.ts` Servicio | Servicio de aplicación | Caso de uso    
│  │  │  │  │  ├─ 📄 `Course[UseCase].ts`   
│  │  │  │  │  ├─ 📄 `CoursesResponse.ts `   
│  │  │  │  ├─ 📂 `domain/` - ¿De qué tipo? (UserId, User, UserRepository)   
│  │  │  │  │  ├─ 📄 `CourseFinder.ts` Servicio | Servicio de dominio | Caso de uso    
│  │  │  │  │  ├─ 📄 `Course.ts`     
│  │  │  │  │  ├─ 📄 `CourseCreateDomainEvent.ts`     
│  │  │  │  │  ├─ 📂 `exceptions/`   
│  │  │  │  │  ├─ 📂 `value-objects/`   
│  │  │  │  │  ├─ 📂 `criteria/`   
│  │  │  │  ├─ 📂 `infrastructure/` - ¿De qué tipo? (UserPostController, MySQLUserRepository)    
│  │  │  │  │  ├─ 📂 `persistence/`    
│  │  │  │  │  │  ├─ 📂 `mongo/` - Diver nativo     
│  │  │  │  │  │  ├─ 📂 `typeorm/` - ORM/Data mapper que permite manejar multiples drivers   
│  │  │  ├─ 📂 `Paths/` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Students/` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Retention/` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Payments/` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Ratings/` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `.../` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Roadmap/` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Shared/` Shared Kernel | Elementos para compartir entre cada uno de los submodulos que hay dentro de un contexto | elementos de dominio que se comparten     
│  │  ├─ 📂 `Backoffice/` 🚀 Bounded Context     
│  │  │  ├─ 📂 `Courses/` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Tickets/` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `.../` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Students/` 📥 Module - Cohesion - ¿Quién eres y qué tipo?    
│  │  ├─ 📂 `Shared/` Shared Kernel | Elementos compartidos entre diversos contextos - infraestructura - conexión a bases de datos - event bus, requiere mayor conocimiento de TypeScript     
│  │  │  ├─ 📂 `domain/`     
│  │  │  ├─ 📂 `infrastructure/`    
│  │  │  │  ├─ 📂 `EventBus/`    
│  │  │  │  ├─ 📂 `persistence/`    
│  │  │  │  ├─ 📂 `logger/`     
│  │  │  │  ├─ 📂 `common/`  own modules and config to improve other infrastructures modules   
│  │  │  │  ├─ 📂 `platform-fastify/`     
│  │  │  │  ├─ 📂 `joi/`     
│  │  │  │  ├─ 📂 `typebox/`     
│  │  │  │  ├─ 📂 `zod/`     
│  │  │  │  ├─ 📂 `pipes/`     
│  │  │  │  ├─ 📂 `sentry/`     
│  │  │  │  ├─ 📂 `swagger/`     
│  │  ├─ 📂 `Backoffice/`     
│  │  ├─ 📂 `Blog/`     
│  ├─ 📂 `apps/` 📲 entry points | primary port (Input / I)     
│  │  ├─ 📂 `mooc/` 📱    
│  │  │  ├─ 📂 `backend/` 👨🏾‍💻🔙     
│  │  │  ├─ 📂 `console/`     
│  │  │  ├─ 📂 `frontend/` 👨🏾‍💻🦄    
│  │  │  ├─ 📂 `graphql/`     
│  │  ├─ 📂 `backoffice/` 📲     
│  │  │  ├─ 📂 `backend/`     
│  │  │  ├─ 📂 `frontend/`     
│  │  ├─ 📂 `blog/` 📲     
│  │  │  ├─ 📂 `backend/` 👨🏾‍💻🔙    
│  │  │  ├─ 📂 `frontend/` 👨🏾‍💻🦄    
├─ 📂 `tests/` Código de pruebas     
│  ├─ 📂 `Contexts/` Unitarios | Integración - Infraestructura (repositorio con base de datos)     
│  │  ├─ 📂 `Mooc/`     
│  │  │  ├─ 📂 `Courses/`     
│  │  │  │  ├─ 📂 `__mocks__/` Elementos de infraestructura, estrategia para no acoplarnos a una implementación en concreto     
│  │  │  │  ├─ 📂 `__mother__/`     
│  │  │  │  ├─ 📂 `application/`     
│  │  │  │  ├─ 📂 `domain/`     
│  │  │  │  ├─ 📂 `infrastructure/`     
│  │  │  ├─ 📂 `Shared/`     
│  │  ├─ 📂 `Shared/`     
│  ├─ 📂 `apps/` Aceptación | Caja negra | End to end - Probar una funcionalidad desde el punto más externo sin conocer la implementación que hay por dentro    
│  │  ├─ 📂 `mooc/`     
│  │  │  ├─ 📂 `backend/`     
│  │  │  │  ├─ 📂 `features/` Comportamiento visible para el cliente    
│  │  │  ├─ 📂 `frontend/`     
├─ 📂 `types/`      

### Notes

- Aggregates
  - it shouldn't contain async/await functions (indicates I/O)
  - it should be loaded in one go to memory (with all it's child objects) no lazy loading
  - The aggregate is created, retrieved and stored as a whole.
  - The aggregate is always in a consistent state.
  - The aggregate is owned by an entity called the aggregate root, whose ID is used to identify the aggregate itself.

  - An aggregate can be referenced from the outside through its root only. Objects outside of the aggregate may not reference any other entities inside the aggregate.
  - The aggregate root is responsible for enforcing business invariants inside the aggregate, ensuring that the aggregate is in a consistent state at all times.
- ⚙ Controller rules 📏
  - Primary port
  - It receives primitives | scalars - `[Entity | Course][Action | Create]RequestDto`
  - It could instantiate  `use cases` | `use cases` ↔ `value objects` | `query bus` ↔ `queries` | `command bus` ↔ `commands`
    - `use cases` ↔ `value objects` could be migrated to `CQRS`
  - It has an implicit interface 
- Repositories
  - Communicate with infrastructure (persistence)
     - Database
     - Redis
     - Elasticsearch
  - Write methods
     - `create<T>(aggregate: T): Promise<void>`
     - `save<T>(aggregate: T): Promise<void>`
     - `update<T>(aggregate: T): Promise<void>`
     - `delete(aggregate: T): Promise<void>`
     - Los métodos void implican side effects
  - Read methods 
    - `all<T>(): Promise<T[]>`
    - `getById<T>(id: AggregateId): Promise<Nullable<T>>`
      - `Get` (Obtener)
      -  El método "get" generalmente se implementa de manera eficiente para buscar una entidad por su identificador único.
      - Se desea recuperar una entidad o un conjunto específico de entidades basado en su identificador único.
      - Suele ser más adecuado cuando la recuperación se realiza por un identificador único conocido.
    - `find<T>(filter: {id: T['id'], [key]: T['key'] }): Promise<Nullable<T>>`
      - `Find` (Encontrar)
      - Se desea recuperar una entidad o un conjunto de entidades que cumplan con ciertas condiciones o criterios específicos.
      - Este método implica una búsqueda más general y puede aceptar ciertos criterios de filtrado como argumentos.
    - `search<T>(criteria: Criteria): Promise<T[]>`
      - Este método implica una búsqueda más amplia y flexible, generalmente con la posibilidad de utilizar múltiples criterios de búsqueda y opciones avanzadas.
      - Puede admitir búsquedas basadas en texto completo, búsquedas por palabras clave, opciones de filtrado avanzado, etc.
      - An empty array is possible and allowed   
    - Avoid n+1 problem (over creation of methods)
  - Evitar nombrar las interfaces como `ICourseRepository` | `CourseRepositoryImp`
    - Cuando definimos la interfaz como `CourseRepository` nos orilla a nombrar a los colaborares de una forma más semántica, con prefijos, indicando|evidenciando el propósito|particularidad de la implementación
      - InMemoryCourseRepository
      - FileCourseRepository
      - MongoCourseRepository
      - CourseRepositoryMock
- Uses case rules
  - Naming Creator | Updater | Deleter | Incrementer 
  - It should instantiate `value objects` or `domain objects`
  - It should throw `Error` | `Exception`
- 📥 Module rules 📏
  - Los nombres de las carpetas que representan un `módulo` o `contexto` deben ir en mayúsculas, ya que representan a la entidad agregado de ese módulo.
- Commands
  - Tipo de evento
  - Implement `service locator pattern` 1:1
  - `Command` should be imperative `[Create|Delete|EditInfo]Course`, telling to application to do something
  - ✅ `CommandBus` can instantiate in controllers (HTTP)
  - ❌ `Command` can't instantiate command bus, it is a simple DTO
  - ✅ `CommandHandler<T>` can reject operations
  - 💡 it should use ubiquitous language not crud based thinking
    - it should avoid `[Create|Update|Delete]Course`
  - ✅ `CommandHandler<T>` should return `void` indicating a side effect
- Query
  - Tipo de evento
  - Implement `service locator pattern` 1:1
  - Starts (in he majority) with Get
  - ✅ `QueryBus` can instantiate in controllers
  - ✅ `QueryBus` can instantiate in use case
  - ✅ `QueryBus` can instantiate in command bus
- Events
  - Past tense (Course[Created])
  - Can't reject operations because it has happened
  - La acción o acontecimiento procesado por un software usualmente originado asíncronamente
  - La notificación o mensaje se toma como el evento
  - Tipos (Por consumo): Volatil, Consumible, Reproducible (Replayable).
- El tipado estricto nos protege hasta cierto punto
  - No podemos controlar los tipos desde los puertos, primarios y secundarios
  - 

## 🧪 Test

- 📲 Apps
  - Comportamiento visible con cucumber sin dependencia a infraestructura - inputs y outputs

- ⚛ Test unitarios: Capa de Aplicación y Dominio
- 💊 Test de integración: Capa de Infraestructura
- ✅ Test de Aceptación: Todas las capas

## Define

- [x] class errors vs class exceptions
  - ✅ Error: A mistake
    - an action, decision, or judgment that produces an unwanted or unintentional result
  - ❌ Exception: someone or something that is not included in a rule, group, or list or that does not behave in the expected way
- [x] CreateCourseRequest - primitives creation (?)
  - ✅ `CreateCourseRequestDto`
- [x] No injectable: functions that could be called as global functions without access to a di container
  - [ ] Logger
  - [ ] Config - Env

## 🛠 Tools

- ⚙ Environment
  - cross-env as a command helper
  - convict (documentation) | json
  - env + env expand | .env
- 💉 IoC Container (Inversion of Control Container)
  - tsyringe
  - Lab: Diod, node-dependency-injection, inversify
  - typescript **autowiring**
- 🧪 Testing
  - Jest (unit)
  - Cucumber (e2e)
  - Supertest
  - Lab: Cypress, SWC (Speedy Web Compiler)
- 🚀 Automatization
  - 🐶 Husky
    - pre-commit
    - commit-msg
- 📑 Version control
  - Comittizen (conventional changelog)
  - Lint staged
- 📏 Code conventions
  - eslint
  - prettier
- Message broker
  - RabbitMQ
- External services and integrations
  - Sentry
  - Postman
  - AWS (Bucket | S3 | Mailer)
  - Cloudinary
  - Google authenticator
  - GitLab
  - Grafana
- Load/Stress testing
  - Apache benchmark
  - Autocannon
- Documentation
  - Notion | Markdown   
------
- Stack
  - Fastify
  - MongoDB
  - TypeScript
- Arquitectura a nivel infraestructura
  - Microservicios
- Arquitectura a nivel código
  - DDD | Clean architecture | Hexagonal architecture | Onion architecture
  - CQRS
  - Event-driven architecture
-------

## Complexity

- Contaminación y complejidad de la implementación del contenedor de dependencias (`tsyringe`) en capas de aplicación y dominio.
  - [Top fives Dependency Injection Container](https://blog.logrocket.com/top-five-typescript-dependency-injection-containers/)
  - [`tsyringe`](https://github.com/Microsoft/tsyringe)
    - [Resource](https://www.youtube.com/watch?v=NUXvLiASqCk&ab_channel=LeanMind)
    - [Resource](https://www.youtube.com/watch?v=D1kM5W9r85Q)
  - [`tsyringe anti-pattern`](https://dev.to/leehambley/using-tsyringe-for-dependency-injection-without-using-the-class-syntax-29h7)
  - [alternatives](https://npmtrends.com/awilix-vs-bottlejs-vs-diod-vs-inversify-vs-node-dependency-injection-vs-tsyringe-vs-typed-inject-vs-typedi-vs-typescript-ioc)
  - `@injectable()` | `@inject()` | `@singleton()` |  `@injectAll()`
- Contaminación y complejidad de la implementación de `type-fest` para obtener los valores primitivos en las capas de dominio 
  - Complejidad: Los enums son interpretados como `number` | `string`, debe evaluarse el uso por criterio
- Desarrollo y mantenimiento de la capa de infraestructura
- `ObjectID` como `String` en favor de agilizar el desarrollo y posteriormente diseñar una estrategia de conversión efectiva, basado en callbacks o transformaciones
- `UUID` como identificador de agregados en lugar de `ObjectID`
  - Paquetes de validación y creación en dominio

## Comments conventions

- BUG
- HACK
- FIXME
- TODO
- NOTE
- DOC ❌
- DEBT

## Excepciones de dominio

Clases base para representar las excepciones de dominio, esto con el objetivo de generalizar los errores, poder capturarlos y reconocerlos en el flujo de vida de la aplicación.

- `InvalidArgumentException`:
  - Value objects
  - HTTP status code: `422`
- `EntityNotFoundException`: 
  - Queries | Finders | Searcher
  - HTTP status code: `404`
- `CommandNotRegisteredException`: 
  - HTTP status code: `404` (DEBT)
- `QueryNotRegisteredException`: 
  - HTTP status code: `404` (DEBT) 

## Fastify

- https://github.com/fastify/fastify/blob/main/docs/Reference/Lifecycle.md

## 📦 Packages

```sh

mkdir ./project-name
cd ./project-name

git init

npm init -y

mkdir ./.vscode
mkdir ./src
mkdir ./dist

npm i \
      fastify @fastify/compress @fastify/cookie @fastify/cors @fastify/helmet @fastify/rate-limit \
      dotenv dotenv-expand \
      reflect-metadata tsyringe \
      uuid \
      mongodb \
      pino pino-pretty \

npm i -D \
      @types/node @types/jest @types/uuid \
      typescript ts-node ts-node-dev tsconfig-paths tslib resolve-tspaths \
      @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-import eslint-plugin-jest eslint-plugin-prettier eslint-plugin-simple-import-sort \
      prettier tslint-config-prettier \
      jest ts-jest \
      husky \
      lint-staged \
      @commitlint/config-conventional @commitlint/cli \

npm install -g \
  commitizen \

npx mrm@2 lint-staged

# - https://typicode.github.io/husky/#/?id=install
# - https://commitlint.js.org/#/guides-local-setup?id=guide-local-setup
  
npm i -O npm-check-updates

npx tsc --init
npx jest --init

docker-compose -f ./docker-compose.yml up -d --build

```

- download config files
- settings.json
- launch.json

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "lint-staged": {
    "*.js": "eslint --cache --fix"
  }
}
```

## Package update

```sh
  ncu --target=minor -u
```

## Node.js package management

- **peerDependencies**: A peer dependency is a specific version or set of versions of a third-party software library that a module is designed to work with. They're similar in concept to the relationship between a browser extension and a browser.
- https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh

```sh
npm i --legacy-peer-deps
npm info [typeorm] peerDependencies

# Expected output
npm ls mongodb
├── mongodb@4.9.0
├─┬ mongoose@6.5.2
│ └── mongodb@4.8.1
└─┬ typeorm@0.3.7
  └── mongodb@4.9.0 deduped invalid: "^3.6.0" from node_modules/typeorm

npm install -S "mongodb@3.6.0 || 4.9.0"

```

```json
  "peerDependencies": {
    "mongodb": "3.6.0 || >=4.9.0"
  },
```

- clean install
- https://docs.npmjs.com/cli/v8/commands/npm-ci#description

```sh
  npm ci
```

## VSCode

```sh
  --inspect=127.0.0.1:30000
```

## Load/Stress testing

Apache benchmark

```sh
  abs \
    -k \ # keep alive
    -c 1000 \ # requests
    -n 10000 \ # concurrency
    -H 'Accept-Encoding: gzip,deflate' \ # custom-header
    https://127.0.0.1:8080/status/

  ./abs -k -c 1000 -n 10000 -H 'Accept-Encoding: gzip,deflate' https://127.0.0.1:8080/status/

  ab -c 1000 -n 10000 https://127.0.0.1:8080/status/
```

## Health check

Endpoint: GET /status/

Uso: 
  - Auto scaling group (levanta cuando el servidor este caído o no este bien)
  - Ping (conocer el estado del servicio y notificar)
  - Salud del despliegue
  - Evitar eliminar maquinas sanas a nivel de aplicación (HTTP) (en caso por ejemplo, que la base de datos, un broker o algo más este caído)
  - Limitado a la application | HTTP 
  - No se revisa o valida la base de datos
Response:
  - `{}`
  - code: 200

## Status check

- Base de datos
- 

## CERT

```sh
  openssl req -new -newkey rsa:2048 -sha256 -days 365 -nodes -x509 -keyout server.key -out server.crt
```

```sh
  # https://github.com/FiloSottile/mkcert
  mkcert
```

## Courses

- https://www.youtube.com/watch?v=pRI04OE5QXM&list=PLAZUzPw7MqPSWbqXibVBfon4Y5HgQT9EU&index=1&ab_channel=tuttodev
- https://pro.codely.com/library/ddd-en-typescript-modelado-y-arquitectura-172533/375662/about/

## Docs

<figure class="video_container">
  <iframe src="https://www.youtube.com/watch?v=EKseAAm4pvY" frameborder="0" allowfullscreen="true"> </iframe>
</figure>
<figure class="video_container">
  <iframe src="https://www.youtube.com/watch?v=e53XrGsv45s" frameborder="0" allowfullscreen="true"> </iframe>
</figure>
<!--  -->
<figure class="video_container">
  <iframe src="https://www.youtube.com/watch?v=oTPL9GNbwSE" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

----

Pino
<figure class="video_container">
  <iframe src="https://www.youtube.com/watch?v=NvLmjl85Hf0" frameborder="0" allowfullscreen="true"> </iframe>
</figure>

---
https://vaadin.com/blog/ddd-part-2-tactical-domain-driven-design
