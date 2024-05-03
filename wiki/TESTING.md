# Testing

- Los test deben dar confianza.

## Mocks

- Doblan en tiempo de test, elementos de infraestructura, estrategia para no acoplarnos a una implementación en concreto.
- No asumir costos de entrada y salida en momento de tests. 

## ATDD

![ATDD](./atdd.jpg)

- Empezamos con las features (lo más cercano al cliente | usuario) (en rojo)
  - Implementamos los test [unitarios, integración...] necesarios para cubrir la feature (en rojo)
  - Implementamos los test [unitarios, integración...] necesarios para cubrir la feature (en verde)
- Finalizamos con las features (lo más cercano al cliente | usuario) (en verde)

## Outside–in

- Contrato con el cliente (entendiendo el cliente como: Front, CLI, etc...)
- Test del controlador (apps)
  - ⚠ Controlador (acceptance)
    - ❌ Fail
    - ✅ Success 
- Test del servicio de aplicación (application)
  - ✅ Controlador
  - ✅ Repositorio
  - ⚠ Caso de uso (Servicio - unit)
    - Note: El servicio inyecta interfaces
    - Note: Se usan mocks
    - ❌ Fail
    - ✅ Success
- Test de infraestructura (infrastructure)
  - ⚠ Repositorio (Integration)
    - Note: Se usan mocks
    - ❌ Fail
    - ✅ Success

## Node

node --loader ts-node/esm ./tests/Contexts/User/Users/**/**/*.test.ts
node --import tsx --watch --inspect=0.0.0.0:0 --env-file=.mooc.env ./src/apps/mooc/backend/main.ts
  - bug diod

"test:node": "node --import tsx --test ./tests/Contexts/User/Users/**/**/*.test.ts",
"test:node": "node --loader ts-paths-esm-loader/transpile-only --test ./tests/Contexts/User/Users/**/**/*.test.ts",
APP_ENV=test npx glob tests/Contexts/Mooc/Courses/**/*.test.ts -c "node --test --loader=ts-paths-esm-loader/transpile-only"

 NODE_OPTIONS="--experimental-vm-modules" npx jest --config ./jest.config.mjs ./tests/
