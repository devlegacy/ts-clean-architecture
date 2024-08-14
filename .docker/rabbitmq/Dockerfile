# Start with the RabbitMQ management image based on Alpine
FROM rabbitmq:management-alpine

# Add the delayed message exchange plugin
RUN set -ex \
  && apk update \
  && apk add --no-cache curl \
  && curl -Lo /plugins/rabbitmq_delayed_message_exchange.ez https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/v3.13.0/rabbitmq_delayed_message_exchange-3.13.0.ez \
  && rabbitmq-plugins enable --offline rabbitmq_delayed_message_exchange

# docker build -t my-custom-rabbitmq-image .
