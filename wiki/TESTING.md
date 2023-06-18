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
