<h1 align="center">Concepts</h1>

## Definiciones y acrónimos

- **API**: Application Programming Interface
  - Conjunto de subrutinas, funciones y procedimientos (o métodos, en la programación orientada a objetos) que ofrece cierta biblioteca para ser utilizado por otro software como **capa de abstracción**
- **API RESTful**: Application Programming Interface REpresentational State Transfer
- **Adapter**: El patrón adapter se utiliza para transformas una interfaz a otra, de tal modo que una clase que no pueda utilizar la primera haga uso de ella a través de la segunda
- **endpoint**: El punto de entrada a un servicio. En una API HTTP correspondería a una URL.

- **DDD**: Domain driven design
  - Organización (a nivel empresa/compañía/negocio) - estructura organizacional
  - Como son los equipos y sus interacciones, llevado a código
  - Que partes son importantes, para centrarnos, llevar el código lo mejor que se pueda
    - Financiera (más importante, esencial)
    - Usuarios (menos importante)
    - que partes deben estar más cohesionadas o independientes
- **ubiquitous language**: Lenguaje marco con suficiente semántica y rigurosidad para que sea entendido transversalmente entre todas las personas de la organización.

- **infrastructure**: En la organización de paquetes, es el lugar dónde vamos a colocar las implementaciones a las que hace referencia la interfaces que tenemos en el dominio.
  ¿Cómo?
- **servicio de aplicación de domino**: Cuando necesitamos información externa al agregado para poder completar lógicas de negocio, usamos este componente para coordinar esa información y aplicar lógicas.
- **dominio**: En la organización de paquete, es el lugar dónde vamos a colocar todo el código de dominio, es decir, toda la lógica de negocio. No pondremos ninguna implementación ni referencia a implementaciones (usaremos interfaces).
  Campo que define un conjunto de requisitos comunes, terminología y funcionalidad para cualquier programa de software construido para resolver un problema. La palabra dominio también se toma como un sinónimo de dominio de aplicación. También se ve como una esfera de conocimiento.
  ¿Qué?
- **módulo**: Se trata de la organización del código en una unidad funcional desde un punto de vista de negocio.
  
- **DI**: Dependency inyector
- **IoC** Container: Inversion of control container

- **Aggregate**: Es un patrón DDD. Un agregado DDD es un conjunto de objetos de dominio que se pueden tratar como una sola unidad. Un ejemplo puede ser un pedido y sus artículos, estos serán objetos separados, pero es útil tratar el pedido (junto con sus artículos) como un agredo único.
- **value object**: Objetos que representan conceptos. Cada concepto concreto es representado por la suma de todas las propiedades del objeto.
  - Value objects are not only containers of data - they can also contain business logic
- **Bounded context**: Múltiples modelos están en juego en cualquier proyecto grande. Sin embargo, cuando el código basado en distintos modelos se combina, el software se vuelve defectuoso, poco confiable y difícil de entender. La comunicación entre los miembros del equipo se vuelve confusa. A menudo no está claro en qué contexto no se debe aplicar un modelo.

  Por lo tanto: define explícitamente el contexto dentro del cual se aplica un modelo. Establece límites explícitamente en términos de organización del equipo, uso dentro de partes específicas de la aplicación y bases de códigos y esquemas de bases de datos. Mantén el modelo estrictamente consistente dentro de estos límites, pero no te distraigas por problemas externos.
  - Generic context
  - Core context
  - Organizational estructure

- **ISP**: Interface Segregation Principle. Se trata de partir interfaces en partes más pequeñas de modo que habilite a los clientes a que puedan usar sólo lo que requieran.
- **SRP**: Single Responsibility Principle.
- **simple vs. fácil**: fácil en el sentido que nos resulta sencillo de usar por ser familiar aunque puede ser muy complejo y hacer múltiples cosas. Y simple en el sentido que hace una sóla cosa aunque para poder hacer diversas cosas deberemos componer diversas piezas simples.
- **complect**: Entrelazar, intercalar o trenzar.
- **osificación**: Es la idea de crear de forma muy preliminar estructuras de código que más tarde marcaran y orientaran el desarrollo de una forma tan dura que resultará complejo de evolucionar.
- **proyección**: Vista de un conjunto de datos. Por ejemplo, una proyección de las facturas de nuestros usuarios podría ser una tabla en la bbdd con todos los datos de las facturas.
- **TDD**: Test driven design

## CQRS, Event Drive, Event Source

- **Bus**: En arquitectura de programación, un bus (una contracción de ómnibus del latín) es un sistema de comunicación que transfiere datos entre componentes.
- **handler**: Pieza de código que atiende y procesa los datos.
- **DTO**: Data Object Transfer
  - Data contracts
  - Backward compatibility

### CQRS

- **CQS**: Command-query separation principle
  - Method - command
  - Method - query
- **CQRS**: Command Query Responsibility Segregation (CQRS) es un patrón de arquitectura en el que se separan y se desacoplan la escritura (vía commands) de la lectura (vía queries).
  - Extends CQS to the architectural level
  - Command model (Write) -> Caching data
  - Query model (Reads) -> Reading data
  - Scalability | Performance | Simplicity | offloading complexity | SRP applied at the architectural level
- **command**: Objetos que representan una intención de aplicar una operación de negocio.
  - Produces side-effect
  - Perform an action
  - Returns `void`
  - A operation to do
  - Push model
- **query**: Objeto que representa una petición de información al sistema.
  - side-effect free
  - Returns `no-void`
  - A question to ask

### Event Drive, Event Source

- **evento**: Mensaje que representa que algo ha pasado en el sistema.
  - An outcome for external apps / modules
  - Pull model
- **event sourcing**: Persistir el estado de un agregado en forma de secuencia ordenada de eventos que se habían aplicado al agregado.
- **replay**: Reprocesar todos los eventos almacenados en el event store para recrear o crear una nueva proyección.
- **upcasting**: Cuando surge la necesidad de evolucionar un evento, podemos usar esta estrategia que consiste en convertir una estructura de evento de una versión antigua a una nueva.

## Symbols

- virgulilla | Tilde: `~`
- acento circunflejo | Circumflex: `^`
- cedilla, C caudata | C-cedilla: `ç`
- acento grave | backtick: ``` ` ```
