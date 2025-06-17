# Información para Diagrama Entidad-Relación (ERD) - Firestore

## Colección principal: `alumnos`

Cada documento en la colección `alumnos` representa un alumno y tiene la siguiente estructura:

- **id**: (string, autogenerado por Firestore) — Identificador único del documento/alumno.
- **nombre**: (string) — Nombre del alumno.
- **edad**: (number) — Edad del alumno.
- **fecha_nacimiento**: (string, formato dd/mm/aaaa) — Fecha de nacimiento.
- **lugar_nacimiento**: (string) — Lugar de nacimiento.
- **sexo**: (string) — Sexo del alumno. Ejemplo: "Femenino", "Masculino".
- **grado**: (string) — Grado escolar. Ejemplo: "Preescolar", "1ro", "2do", ..., "6to".
- **seccion**: (string) — Sección del grado. Ejemplo: "A", "B", etc.

### Subdocumento: `representante`

- **representante**: (object)
  - **nombre**: (string) — Nombre del representante.
  - **parentesco**: (string) — Parentesco con el alumno.
  - **telefono**: (string) — Teléfono de contacto.
  - **cedula**: (string) — Cédula de identidad.
  - **direccion**: (string) — Dirección de residencia.

---

## Relaciones

- **Colección `alumnos`**
  - Cada documento es un alumno.
  - Cada alumno tiene un subdocumento embebido llamado `representante` con los datos del representante legal.

---

## Esquema Resumido

**alumnos** (colección)

- id (string, autogenerado)
- nombre (string)
- edad (number)
- fecha_nacimiento (string)
- lugar_nacimiento (string)
- sexo (string)
- grado (string)
- seccion (string)
- representante (object)
  - nombre (string)
  - parentesco (string)
  - telefono (string)
  - cedula (string)
  - direccion (string)

---

## Notas para el Diagrama

- No hay referencias a otras colecciones (no hay relaciones tipo "foreign key").
- Todo está embebido en el documento del alumno.
- Puedes representar la colección `alumnos` como una entidad con un atributo compuesto/embebido para `representante`.

---

## Ejemplo de Documento

```json
{
	"nombre": "Juan Pérez",
	"edad": 8,
	"fecha_nacimiento": "15/03/2015",
	"lugar_nacimiento": "Caracas",
	"sexo": "Masculino",
	"grado": "3ro",
	"seccion": "A",
	"representante": {
		"nombre": "María Pérez",
		"parentesco": "Madre",
		"telefono": "0414-1234567",
		"cedula": "V-12345678",
		"direccion": "Av. Principal, Caracas"
	}
}
```

---

## Sugerencia de Entidades para el ERD

- **Alumno**

  - id
  - nombre
  - edad
  - fecha_nacimiento
  - lugar_nacimiento
  - sexo
  - grado
  - seccion
  - representante (atributo compuesto)

- **Representante** (atributo embebido, no entidad independiente)
  - nombre
  - parentesco
  - telefono
  - cedula
  - direccion

---
