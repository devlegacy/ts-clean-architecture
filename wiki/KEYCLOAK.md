# Keycloak

- [images](https://quay.io/repository/keycloak/keycloak?tab=tags)
- [containers](https://www.keycloak.org/server/containers)

- [Sign in](http://localhost:8081/admin/master/console/)
  - user: admin
  - password: admin

- posibilidad de funcionar en standalone and domain

Alternatives

- https://auth0.com/
- https://clerk.com/
- https://www.okta.com/
- https://aws.amazon.com/es/cognito/

## Docs

- https://www.keycloak.org/docs/latest/server_admin/
- https://www.keycloak.org/docs-api/21.1.1/rest-api/index.html#_users_resource

## Core concepts

- https://developers.redhat.com/blog/2019/12/11/keycloak-core-concepts-of-open-source-identity-and-access-management#core_concepts

![Core concepts](https://developers.redhat.com/sites/default/files/blog/2019/11/keycloak1.png)

## Realm

- Reino / Territorio: Podríamos llamarlo instancia de Keycloak, configuraciones separadas
  - Real 1: Usuarios internos
  - Real 2: Clientes
  - Note: Nunca configurar el realm `master`
- Default: Master
- Conjunto de credenciales, roles y grupos. Cada real está aislado y únicamente puede manejar y autenticar usuarios que estén bajo su dominio.
- Área funcional dentro de una compañía

## Client

- Clientes, nos conectamos a keycloak mediante un cliente.
- Es una entidad que puede pedir a Keycloak autenticación para un usuario. En general son aplicaciones o servicios.

## Roles

1. Realm rol
2. Client rol
3. Composite rol

## Identity providers

- 

## User federation

- Aplicaciones corporativas

## Users

## Themes

- https://github.com/keycloak/keycloak/tree/main/themes/src/main/resources/theme/base/email/html

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
- [Express](https://medium.com/devops-dudes/securing-node-js-express-rest-apis-with-keycloak-a4946083be51)

## Events

- What is the relation between SPI (service provider interfaces) and events
