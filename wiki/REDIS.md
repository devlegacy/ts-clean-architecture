# Redis

- [Lab](https://app.redislabs.com/#/)

redis-cli --pass SUPER_SECRET_PASSWORD
JSON.GET blocks
[redis-cli] info tsyringe-dependency-injection --pass SUPER_SECRET_PASSWORD

## CLI Commands

```sh
  docker run -it --rm redis/redis-stack-server:latest bash
```

```sh
  redis-cli -p 6379 -h 
  redis-cli -p 6379 -h xx.xx.xx.xx

```

```sh
  KEYS *
  SCAN 0

  INFO
  INFO keyspace

```

```sh
CONFIG GET *
CONFIG GET databases


SELECT 0
```
