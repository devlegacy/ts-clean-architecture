# Notes 

## Courses

- https://www.youtube.com/watch?v=pRI04OE5QXM&list=PLAZUzPw7MqPSWbqXibVBfon4Y5HgQT9EU&index=1&ab_channel=tuttodev
- https://pro.codely.com/library/ddd-en-typescript-modelado-y-arquitectura-172533/375662/about/

## Scaffold

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
├─ 📂 `dist/`     
├─ 📂 `src/` Código a producción y a transpilar, ayuda a configurar tsconfig, simplicidad     
│  ├─ 📂 `context/`     
│  │  ├─ 📂 `mooc/`     
│  │  │  ├─ 📂 `Courses/` Module - ¿Quién eres y qué tipo?    
│  │  │  │  ├─ 📂 `application/` - ¿De qué tipo? (UserRegister, UserRemover)   
│  │  │  │  ├─ 📂 `domain/` - ¿De qué tipo? (UserId, User, UserRepository)   
│  │  │  │  ├─ 📂 `infrastructure/` - ¿De qué tipo? (UserPostController, MySQLUserRepository)    
│  │  │  ├─ 📂 `shared/` Elementos para compartir entre cada uno de los submodulos que hay dentro de un contexto | elementos de dominio que se comparten     
│  │  ├─ 📂 `shared/` Elementos compartidos entre diversos contextos - infraestructura - conexión a bases de datos - event bus     
│  ├─ 📂 `apps/`     
│  │  ├─ 📂 `mooc/`     
│  │  │  ├─ 📂 `backend/`     
│  │  │  ├─ 📂 `frontend/`     
├─ 📂 `tests/` Código de pruebas     
│  ├─ 📂 `context/` Unitarios | Integración - Infraestructura (repositorio con base de datos)     
│  │  ├─ 📂 `mooc/`     
│  │  │  ├─ 📂 `Courses/`     
│  │  │  │  ├─ 📂 `__mocks__/`     
│  │  │  │  ├─ 📂 `application/`     
│  │  │  │  ├─ 📂 `domain/`     
│  │  │  │  ├─ 📂 `infrastructure/`     
│  │  │  ├─ 📂 `shared/`     
│  │  ├─ 📂 `shared/`     
│  ├─ 📂 `apps/` Aceptación | Caja negra | End to end - Probar una funcionalidad desde el punto más externo sin conocer la implementación que hay por dentro
│  │  ├─ 📂 `mooc/`     
│  │  │  ├─ 📂 `backend/`     
│  │  │  │  ├─ 📂 `features/`     
│  │  │  ├─ 📂 `frontend/`     
├─ 📂 `types/`      

## Test

- Apps
  - Comportamiento visible con cucumber sin dependencia a infraestructura - inputs y outputs

- Test unitarios: Capa de Aplicación y Dominio
- Test de integración: Capa de Infraestructura
- Test de Aceptación: Todas las capas

## Fastify
- https://github.com/fastify/fastify/blob/main/docs/Reference/Lifecycle.md

## Define

- [ ] errors vs exceptions
- [ ] CreateCourseRequest (?)

## Complement

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

## Packages Node.js

- **peerDependencies**: A peer dependency is a specific version or set of versions of a third-party software library that a module is designed to work with. They're similar in concept to the relationship between a browser extension and a browser.
- https://stackoverflow.com/questions/66239691/what-does-npm-install-legacy-peer-deps-do-exactly-when-is-it-recommended-wh

```sh
npm i --legacy-peer-deps
npm info [typeorm] peerDependencies

npm ls mongodb
├── mongodb@4.9.0
├─┬ mongoose@6.5.2
│ └── mongodb@4.8.1
└─┬ typeorm@0.3.7
  └── mongodb@4.9.0 deduped invalid: "^3.6.0" from node_modules/typeorm

npm install -S "mongodb@3.6.0 || 4.9.0"

```
 "peerDependencies": {
    "mongodb": "3.6.0 || >=4.9.0"
  },
- clean install
- https://docs.npmjs.com/cli/v8/commands/npm-ci#description

```sh
npm ci
```

## First commit message sample

chore: project   
start project   
create scaffolding, add config files, setting config files   

## Scaffold samples

- https://github.com/bancolombia/scaffold-clean-architecture

## Commit convention

chore(deps): bump dependencies
chore(deps-dev): bump dependencies

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
