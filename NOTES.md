# Notes 

## Courses

- https://www.youtube.com/watch?v=pRI04OE5QXM&list=PLAZUzPw7MqPSWbqXibVBfon4Y5HgQT9EU&index=1&ab_channel=tuttodev
- https://pro.codely.com/library/ddd-en-typescript-modelado-y-arquitectura-172533/375662/about/

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
│  ├─ 📂 `Contexts/` Bounded Contexts 🗃 - Mínimo conocimiento de TypeScript     
│  │  ├─ 📂 `Mooc/` 🚀    
│  │  │  ├─ 📂 `Videos/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Courses/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  │  ├─ 📂 `application/` - ¿De qué tipo? (UserRegister, UserRemover)   
│  │  │  │  │  ├─ 📂 `Creator/` - 📥 Module   
│  │  │  │  │  ├─ 📂 `SearchByCriteria/` - 📥 Module   
│  │  │  │  │  ├─ 📄 `CoursesUseCase.ts` Servicio | Servicio de aplicación | Caso de uso    
│  │  │  │  │  ├─ 📄 `Course[UseCase].ts`   
│  │  │  │  │  ├─ 📄 `CoursesResponse.ts `   
│  │  │  │  ├─ 📂 `domain/` - ¿De qué tipo? (UserId, User, UserRepository)   
│  │  │  │  │  ├─ 📄 `CourseFinder.ts` Servicio | Servicio de dominio | Caso de uso    
│  │  │  │  │  ├─ 📂 `exceptions/`   
│  │  │  │  │  ├─ 📂 `value-objects/`   
│  │  │  │  ├─ 📂 `infrastructure/` - ¿De qué tipo? (UserPostController, MySQLUserRepository)    
│  │  │  │  │  ├─ 📂 `persistence/`    
│  │  │  │  │  │  ├─ 📂 `mongo/` - Diver nativo     
│  │  │  │  │  │  ├─ 📂 `typeorm/` - ORM/Data mapper que permite manejar multiples drivers   
│  │  │  ├─ 📂 `Paths/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Students/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Retention/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Payments/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Ratings/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `.../` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Roadmap/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Shared/` Shared Kernel | Elementos para compartir entre cada uno de los submodulos que hay dentro de un contexto | elementos de dominio que se comparten     
│  │  ├─ 📂 `Backoffice/` 🚀    
│  │  │  ├─ 📂 `Courses/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Tickets/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `.../` 📥 Module - ¿Quién eres y qué tipo?    
│  │  │  ├─ 📂 `Students/` 📥 Module - ¿Quién eres y qué tipo?    
│  │  ├─ 📂 `Shared/` Shared Kernel | Elementos compartidos entre diversos contextos - infraestructura - conexión a bases de datos - event bus, requiere mayor conocimiento de TypeScript     
│  │  │  ├─ 📂 `domain/`     
│  │  │  ├─ 📂 `infrastructure/`    
│  │  │  │  ├─ 📂 `EventBus/`    
│  │  │  │  ├─ 📂 `persistence/`    
│  │  │  │  ├─ 📂 `logger/`     
│  │  │  │  ├─ 📂 `common/`  own modules and config to improve other infrastructures modules   
│  │  │  │  ├─ 📂 `platform-fastify/`     
│  │  │  │  ├─ 📂 `joi/`     
│  │  │  │  ├─ 📂 `zod/`     
│  │  │  │  ├─ 📂 `pipes/`     
│  │  │  │  ├─ 📂 `sentry/`     
│  │  │  │  ├─ 📂 `swagger/`     
│  │  ├─ 📂 `Backoffice/`     
│  │  ├─ 📂 `Blog/`     
│  ├─ 📂 `apps/` 📲 entry points      
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
│  │  │  │  ├─ 📂 `__mocks__/` Elementos de infraestructura, estrategía para no acoplarnos a una implementación en concreto     
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

- Los nombres de las carpetas que representan un `módulo` o `contexto` deben ir en mayúsculas, ya que representan a la entidad agregado de ese módulo.

## 🧪 Test

- 📲 Apps
  - Comportamiento visible con cucumber sin dependencia a infraestructura - inputs y outputs

- ⚛ Test unitarios: Capa de Aplicación y Dominio
- 💊 Test de integración: Capa de Infraestructura
- ✅ Test de Aceptación: Todas las capas

## Define

- [ ] errors vs exceptions
- [ ] CreateCourseRequest - primitives creation (?)
- [ ] No injectable elements
  - [ ] Logger
  - [ ] Config - Env

## Commit convention

```sh
  git cz
```

```md
  chore(deps): bump dependencies
  chore(deps-dev): bump dependencies
```

### First commit message sample

```md
  chore(project): start project   
    - create scaffolding
    - add config files
    - setting project/ide/editor files   
```

### Bump dependencies

```md
  chore(packages): bump dependencies   
    - update dependencies
    - update dev dependencies
```

### No verify | Skip hooks

```sh
  git commit -m "" --no-verify
```

### Empty commit

```sh
  git commit --allow-empty -m "build(empty): trigger build"
```

## 🛠 Tools

- ⚙ Environment
  - cross-env as a command helper
  - convict (documentation) | json
  - env + env expand | .env
- 💉 IoC Container
  - tsyringe
  - Lab: Diod, node-dependency-injection, inversify
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
  
## Costos asumidos

- Contaminación y complejidad de la implementación del contenedor de dependencias (`tsyringe`) en capas de aplicación y dominio.
  - `@injectable()` | `@inject()` | `@singleton()`
- Contaminación y complejidad de la implementación de `type-fest` para obtener los valores primitivos en las capas de dominio 
  - Complejidad: Los enums son interpretados como `number` | `string`, debe evaluarse el uso por criterio
- Desarrollo y mantenimiento de la capa de infraestructura

## Comments conventions

- BUG
- HACK
- FIXME
- TODO
- NOTE
- DOC
- DEBT

## Excepciones de dominio

Generalizar para después filtrar

- `InvalidArgumentException`: 422
- `EntityNotFoundException`: 404
- `CommandNotRegisteredException`: ?
- `QueryNotRegisteredException`: ?

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

## CERT

```sh
  openssl req -new -newkey rsa:2048 -sha256 -days 365 -nodes -x509 -keyout server.key -out server.crt
```

```sh
  # https://github.com/FiloSottile/mkcert
  mkcert
```
