# 🐰 RabbitMQ

- Broker de mensajería
- Protocolo amqp
- Política de enviar al menos una vez
  - Pueden ocurrir mensajes duplicados
- https://www.cloudamqp.com/plans.html
- http://localhost:15672/
  - guest
  - guest

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
