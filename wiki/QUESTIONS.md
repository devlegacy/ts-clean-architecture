# Aportes

## Questions

- [x] ¿Por qué no usar un framework como nest?
- [ ] Solo 5 métodos (CRUD) + Finder en repositorio, criteria|specification pattern
- [ ] Los casos de uso deberían recibir solo primitivos?
- [ ] ¿CourseCreator rompe el SRP al ser usado con doble propósito a nivel de BD al igual que esconde detalles de la implementación?
- [ ] ¿Por qué CourseController no responde con un Course como primitivos, no se esta rompiendo el funcionamiento de un API RESTful? 

- [ ] ¿Cómo documentar eventos de dominio?

- [ ] ¿Los objetos response deberían estar en shared de aplicación?
- [ ] Multiples eventos y cómo cancelar*

- [ ] ¿Eliminar los eventos en las colas después de los test?
- [ ] ¿Default sort de los elementos?

- [ ] UUID v4 vs UUID v7 vs ULID vs ID autoincremental

## Aggregates

-  En el contexto de DDD, Arquitectura Hexagonal, SOLID y buenas practicas, como se gestionan los datos virtuales en lectura y escritura en los Aggregate Root?
  - Por ejemplo en un Aggregate Root de User con el value object de birthdate que encapsula la funcionalidad de Date, como se gestionaría la edad del usuario en lectura y escritura?
- Relaciones 1:n, n:n, n:1, 1:1 entre Aggregates
- n + 1 problem

- HTTP Responses with relations
- Orquestación
  - API Gateway !== BFF
- Controller (ProductFinder, ReviewsByProductSearcher, UserSearcher)

## Aportes

- [Estructura de carpetas: DDD en TypeScript](https://pro.codely.com/library/ddd-en-typescript-modelado-y-arquitectura-172533/375662/path/step/147601236/)
  - La capa de Shared requiere mayor conocimiento de TypeScript
  - La capa de Context requiere menos conocimiento de TypeScript

## TypeScript

- TypeScript’s New Top-Level Await

## Encuesta

Opinion
- Mejorar la comunidad, aportes, comentarios, ayudas para no depender tanto de los autores de los cursos
- Oportunidad de 1:1 para subscriptores premium
- Gamificación
- Mejorar UI/UX de la plataforma
  - Reproductor responsive a pantalla completa
- Precios contemplando regiones
- Transcripciones y añadir closed captions ayudaría mucho

Cursos: 
- CQRS, agregados de datos, como hacer populado y joins de datos con CQRS
- API Gateway con DDD
- Patron criteria/specification avanzado
- Control de actualizaciones atómicas en DDD y en agregados con relaciones
- Control de las relaciones en DDD 1-1 1-N N-N
- Cursor y Offset pagination con DDD
- Actualizaciones atómicas y parciales en DDD 
- Autentificación y autorización con DDD
- Event sourcing en TypeScript siguiendo el hilo de los primeros cursos actuales de arquitectura en TS
- Documentación de eventos y arquitectura, que entregue valor a la empresa y al equipo, flujos de event storming
- Convict, MongoDB avanzado y monitoring

Algo que añadir
- No pregunten cuantas horas le dedique al curso, es algo difícil de ponderar de manera personal
