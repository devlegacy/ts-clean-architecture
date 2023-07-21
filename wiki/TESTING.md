# Testing

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
