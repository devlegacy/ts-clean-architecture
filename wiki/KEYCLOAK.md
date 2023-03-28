# Keycloak

- [images](https://quay.io/repository/keycloak/keycloak?tab=tags)
- [containers](https://www.keycloak.org/server/containers)

- [sign in](http://localhost:8081/auth/realms/simple-project/protocol/openid-connect/auth?client_id=account-console&redirect_uri=http%3A%2F%2Flocalhost%3A8081%2Fauth%2Frealms%2Fsimple-project%2Faccount%2F%23%2Fsecurity%2Fsigningin&state=3faaf473-c72f-43bc-8867-dc107b66365f&response_mode=fragment&response_type=code&scope=openid&nonce=383600b8-945f-46b3-8ebb-ba651e4ca361&code_challenge=T3ItWMm0c1T5RgdFe_e07qFYK3wGRX3XF4oTFXG_JBc&code_challenge_method=S256)

## Core concepts

- https://developers.redhat.com/blog/2019/12/11/keycloak-core-concepts-of-open-source-identity-and-access-management#core_concepts

![Core concepts](https://developers.redhat.com/sites/default/files/blog/2019/11/keycloak1.png)

- Authentication vs Authorization
- Verificar que el usuario es quien dice ser
- Verificar que el usuario tenga permisos para acceder a cierto recurso

- Access token: Llave o representación de una autorización

- Estándar Oauth
  - https://www.youtube.com/watch?v=nNVlewjKQEQ&ab_channel=SoftwareGuru
- OpenId Connect
- JWT
- 

## Relm

- Reino / Territorio: Instancia de Keycloak, configuraciones separadas
  - Real 1: Usuarios internos
  - Real 2: Clientes
- Default: Master
- Conjunto de credenciales, roles y grupos. Cada real está aislado y únicamente puede manejar y autenticar usuarios que estén bajo su dominio.
- 

## Client

- Clientes, nos conectamos a keycloak mediante un cliente.
- Es una entidad que puede pedir a Keycloak autenticación para un usuario. En general son aplicaciones o servicios.

## Roles

1. Realm rol
2. Client rol
3. Composite rol

## Users

## Resources

- https://www.youtube.com/watch?v=h_LazBPebCs
- https://www.youtube.com/watch?v=0TiRsueDmO4&ab_channel=AlbertCoronado
- https://www.youtube.com/watch?v=4lAMd2hnU04&ab_channel=SoftwareGuru
- https://www.youtube.com/watch?v=1Jl_rJf3rSc&ab_channel=GuillermoCode
- https://www.youtube.com/watch?v=uYjNC7jNC1g&ab_channel=Digitalthinkingwithsotobotero
- https://www.youtube.com/watch?v=j3uydtrYLSE&ab_channel=CodingTogetherES


### Series

- [ ] https://www.youtube.com/watch?v=OBQtztfbeQc&ab_channel=ArthurD.Mugume
- [ ] https://www.youtube.com/watch?v=zyqWpFUPTnE&ab_channel=Tekgainers

## Review 

- https://www.youtube.com/watch?v=duawSV69LDI&ab_channel=VoxxedDaysLuxembourg

## Extensions

- [ ] https://www.keycloak.org/extensions.html

## Security

- [ ] https://www.youtube.com/watch?v=996OiexHze0&ab_channel=OktaDev

### 🟩 Vue.js

- https://www.keycloak.org/securing-apps/vue
- https://github.com/keycloak/keycloak-quickstarts/tree/latest/applications/app-vue

- [Vue](https://www.keycloak.org/securing-apps/vue)
- [Vue](https://github.com/keycloak/keycloak-quickstarts/tree/latest/applications/app-vue)

### 🟥 NestJS

- https://medium.com/devops-dudes/secure-nestjs-rest-api-with-keycloak-745ef32a2370

## Samples

- [Docker snippet](https://github.com/bigbluebutton/greenlight/blob/master/docker-compose.kc.yml)
- [Docker snippet](https://gitlab.com/-/snippets/2519645)
