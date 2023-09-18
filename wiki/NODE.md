# Node.js

- [releases](https://nodejs.org/en/download/releases/)

## Memory footprint

## Cluster mode

- [ ] Create config

## Node Memory

```sh
  node --max-old-space-size=1024 -env-file=.env
```

## Crypto

```sh
  crypto.randomBytes(16).toString('base64')
  require('crypto').randomBytes(16).toString('base64')
  crypto.randomBytes(16).toString('hex')
  require('crypto').randomBytes(16).toString('hex')
  require('crypto').randomBytes(32).toString('hex')
  'base64:'+require('crypto').randomBytes(32).toString('hex')
```

## Management

```sh 
  npm cache verify
  npm cache clean
  npm cache clean --force

  npm cache verify && npm cache clean --force
```

## Don't 

- [NODE_ENV](https://glebbahmutov.com/blog/do-not-use-node-env-for-staging/)
- [NODE_ENV](https://seanconnolly.dev/dont-be-fooled-by-node-env)

## Concurrency

- Monohilo, con entradas y salidas asíncronas. Un proceso por cada núcleo del procesador.

## Event oriented

- Hay un bucle de eventos que se ejecuta constantemente

## Flame graph

- [Flame graph](https://github.com/davidmarkclements/0x)
