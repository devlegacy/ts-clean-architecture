# Notes 

## Courses

- https://www.youtube.com/watch?v=pRI04OE5QXM&list=PLAZUzPw7MqPSWbqXibVBfon4Y5HgQT9EU&index=1&ab_channel=tuttodev
- https://pro.codely.com/library/ddd-en-typescript-modelado-y-arquitectura-172533/375662/about/

## Scaffold

π `project-name/`     
ββ π `.bin` Binary and helper files     
ββ π `.data`      
ββ π `.docker` Docker images     
ββ π `.git/`     
ββ π `.github/`     
ββ π `.husky/`     
ββ π `.tmp/`     
ββ π `.vscode` Visual studio code files     
ββ π `coverage/`     
ββ π `dist/`     
ββ π `src/` CΓ³digo a producciΓ³n y a transpilar     
β  ββ π `Context/`     
β  β  ββ π `Mooc/`     
β  β  β  ββ π `Courses/`     
β  β  β  β  ββ π `application/`     
β  β  β  β  ββ π `domain/`     
β  β  β  β  ββ π `infrastructure/`     
β  β  β  ββ π `Shared/` Elementos para compartir entre cada uno de los submodulos que hay dentro de un contexto | elementos de dominio que se comparten     
β  β  ββ π `Shared/` Elementos compartidos entre diversos contextos - infraestructura - conexiΓ³n a bases de datos - event bus     
β  ββ π `apps/`     
β  β  ββ π `mooc/`     
β  β  β  ββ π `backend/`     
β  β  β  ββ π `frontend/`     
ββ π `tests/` CΓ³digo de pruebas     
β  ββ π `Context/` Unitarios | IntegraciΓ³n - Infraestructura (repositorio con base de datos)     
β  β  ββ π `Mooc/`     
β  β  β  ββ π `Courses/`     
β  β  β  β  ββ π `__mocks__/`     
β  β  β  β  ββ π `application/`     
β  β  β  β  ββ π `domain/`     
β  β  β  β  ββ π `infrastructure/`     
β  β  β  ββ π `Shared/`     
β  β  ββ π `Shared/`     
β  ββ π `apps/` AceptaciΓ³n | Caja negra | End to end - Probar una funcionalidad desde el punto mΓ‘s externo sin conocer la implementaciΓ³n que hay por dentro
β  β  ββ :open_file_folderπ: `mooc/`     
β  β  β  ββ π `backend/`     
β  β  β  β  ββ π `features/`     
β  β  β  ββ π `frontend/`     
ββ π `types/`      

## Test

- Apps
  - Comportamiento visible con cucumber sin dependencia a infraestructura - inputs y outputs

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

## First commit message sample

chore: project   
start project   
create scaffolding, add config files, setting config files   
