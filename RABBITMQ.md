# 🐰 RabbitMQ

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

- [empresa].[context].[version].[message type].[entity].[action]
- codely.mooc.1.event.course.created

