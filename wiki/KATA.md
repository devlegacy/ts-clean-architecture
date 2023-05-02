# Kata

## ¿Qué influye en la arquitectura de un sistema?

- Requerimientos
  - Funcionales / No funcionales
- Conocimientos del equipo
- El tiempo de desarrollo
- Interoperatividad / Integraciones 
  - Hardware / Software / Protocolos
- Disponibilidad
- Restricciones de diseño
- Cantidad de usuarios concurrentes
- Caracterización de usuarios
- Mercado objetivo
- Presupuesto

----

- Requerimientos funcionales: Si son significativos arquitectónicamente.
- Restricciones: Open source, proveedores.
- Principios: Pruebas unitarias, procedimientos almacenados (si | no).
- Equipo de desarrollo: Seniority del equipo.
- Riesgos: Tecnológicos, legales.
- Atributos de calidad: escalabilidad, rendimiento, internacionalización.
  - Es una propiedad medible o probable de un sistema que indica que tan bien el sistema satisface las necesidades de las partes interesadas.
  - Son medibles o verificables.
  - Consideraciones de diseño que no son de dominio.
  - Afectan (casi siempre) una parte estructural del diseño.
  - Importante para el éxito de la aplicación.
  - Requerimientos no funcionales | Características de arquitectura | La ilidades (disponibilidad, escalabilidad...)
  - Ej. rendimiento: La habilidad de un sistema para cumplir una tarea en el tiempo esperado.
    - Escenarios: Permite especificar los requerimientos de un atributo de calidad.
    - Tácticas: Es una decisión de diseño que influencia la consecución de un atributo de calidad, ante cierto estimulo.

## ¿Qué ideas se te ocurren para aumentar el rendimiento de un sistema?

- Tecnologías con buen manejo de memoria
- Escalamiento
- Almacenamiento
  - Indexar | Replicar
- Procesamiento Asíncrono | Paralelo | Concurrencia
---
- Aumentar recursos (CPU, RAM, redes).
- Emplear concurrencia.
- Aumentar servidores.
- Tener múltiples copias de los datos (caché).
- Limitar la respuesta a eventos.
- Hacer algoritmos más eficientes.

## Atributos de calidad

- Un moderador debe aclarar los puntos y afinar al terminar la kata
- Información que no aporta, puede ser descartada, o no entra como atributo de calidad sino como requerimientos.

Requerimientos de números de usuarios
- Cientos de huéspedes. 
- Empleados del hotel (menos de 20).
  - **Un valor que se consideraría significativo miles**
- Se asume un volumen de usuarios bajo basado en la descripción, no aporta atributos (no genera alta concurrencia)

### Explícitos

- ninguno

### Implícitos

- ninguno

---

Requerimientos funcionales
- Las reservas se pueden hacer a través de la web, móvil, llamada telefónica o directamente en la recepción.
- Los huéspedes pueden reservar ya sea un tipo de habitación (estándar, de lujo, o suite) o escoger un cuarto específico mirando las fotos de este y su ubicación en el hotel.

### Explícitos

- ninguno

### Implícitos

- Configurabilidad

---

Requerimientos funcionales
- El sistema debe gestionar tanto el estado de la habitación (reservada, disponible, lista para limpieza, etc) como la fecha en que será necesitada próximamente.

### Explícitos

- ninguno

### Implícitos

- ninguno

---

Requerimientos funcionales
- Debe tener funcionalidades de punta para administrar la limpieza, de forma que el personal de mantenimiento y limpieza pueda ser dirigido a diferentes cuartos dependiendo dela prioridad y las reservas. Para esto, el personal usará dispositivos provistos por la compañía de reservas, y que estarán pegados a los carros de limpieza.

### Explícitos

- ninguno.

### Implícitos

- Interoperabilidad.
---

Requerimientos funcionales
- Las funcionalidades normales de reservas (como pagos, información de registro, etc) serán manejadas por el sistema de reservas existente.
- El sistema será web y estará alojado ("hosteado")por la compañía de reservas.

### Explícitos

- ninguno

### Implícitos

- Disponibilidad.
---

Contexto adicional
- ¡La temporada alta se acerca, así que el sistema tiene que estar listo pronto, o se tendrá que esperar hasta el próximo año!
- La compañía también está invirtiendo en tecnología de punta como cerraduras inteligentes para cuartos que se abren desde el celular

### Explícitos

- Factibilidad

### Implícitos

- Elasticidad.
- Interoperabilidad.
---

Contexto adicional
- Solo hay interés en el mercado de lujo.
- El personal de ventas tiene muchísima influencia en la organización.Sin embargo,a veces tienen problemas cumpliendo las cosas que prometen.

### Explícitos

- Ninguno.

### Implícitos

- Ninguno.
---

## Lista consolidada

1. Configurabilidad
2. Interoperabilidad
3. Disponibilidad
4. Factibilidad
5. Elasticidad

## ¿Qué podríamos eliminar? (trade-off)

1. Disponibilidad
2. Factibilidad
3. Elasticidad

## Preguntas:

- Soy nuevo en esto de los atributos de calidad. Deberíamos tener y conocer cada atributo de calidad importante. Puedo ver que hay que tener bien conceptualizado cada tipo de atributo de calidad
- 

## Notas

- Podemos extraer todos los atributos de calidad basado en el universo de discurso
- Empezar a analizar y descartar atributos.
- 6 atributos de calidad son suficientes
