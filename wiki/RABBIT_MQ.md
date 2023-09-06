# 🐰 RabbitMQ

![alt](./rabbit.png)

- Broker de mensajería
- Protocolo amqp (advance message queue protocol)
- FIFO 
- Observer pattern
- publisher / producer -> send 📤
- consumer / subscriber -> receive 📥
- Política de enviar al menos una vez (at least once)
  - Pueden ocurrir mensajes duplicados
- https://www.cloudamqp.com/plans.html
- http://localhost:15672/
  - guest
  - guest

## Exchanges

Es abstracción encima de las colas que se une a las colas por bindings

- fanout 
  - El patrón "fanout" implica que un mensaje enviado a un tópico será entregado a múltiples consumidores independientes. Cada consumidor recibirá una copia del mensaje y los consumidores actúan de manera independiente entre sí.
    - El término "fanout" proviene del concepto de un ventilador o abanico, donde un flujo central de aire se divide en múltiples corrientes que se dispersan en diferentes direcciones. De manera similar, en el patrón "fanout" de mensajería, un mensaje central se distribuye hacia múltiples consumidores, creando una arquitectura de mensajes distribuidos.
  - "distribución masiva" o "distribución múltiple" 
  - similar a un PUT, secure/safe, se puede procesar dos veces con peticiones similares, idempotent 
  - broadcast
  - binding: no existe
  - 
- topic
  - routing pattern (expresión regular)
  - es.de.* (una palabra)
  - us.# (multiples palabras)
- direct ()
- headers

## Topología

- http://tryrabbitmq.com/

## RabbitConfig config

```json
  {
    "postinstall": "npm run command:mooc:rabbitmq && npm run command:backoffice:rabbitmq"
  }
```

```sh
  npm run command:mooc:rabbitmq \
  npm run command:backoffice:rabbitmq
```

## Routing key

- [empresa].[context|bundled context].[version].[message type].[entity | aggregate roo].[action]
- codely.mooc.1.event.course.published

- version: cambios que rompan compatibilidad
  - Añadir un nuevo campo no rompe compatibilidad
- type: command | event | etc
- action: past event

- https://github.com/fmvilas/topic-definition

## Queue naming

- [service].[entity].[action]_on_[event]
- user.notification..notify_user_on_video_published

## Read 

- https://climbtheladder.com/10-rabbitmq-best-practices/
