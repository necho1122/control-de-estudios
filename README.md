# Sistema de Control de Estudios

## Descripción General

Este proyecto es un **Sistema de Control de Estudios** desarrollado con **Next.js**, **React**, **Redux Toolkit** y **Firebase**. Permite la gestión de alumnos de una institución educativa, incluyendo autenticación segura, registro, consulta, edición y eliminación de datos de estudiantes, así como la administración de sesiones de usuario.

---

## Funcionalidades Principales

- **Autenticación de Usuarios:**  
  Utiliza Firebase Authentication para el inicio de sesión seguro. Incluye recuperación de contraseña mediante correo electrónico.

- **Gestión de Alumnos:**  
  Permite agregar, editar, eliminar y visualizar alumnos. Los datos se almacenan y consultan en tiempo real desde Firebase Firestore.

- **Visualización y Búsqueda:**  
  Los alumnos se muestran en una tabla ordenada por grado (de Preescolar a 6to) y sección (A, B, ...). Incluye buscador por nombre.

- **Detalle de Alumno:**  
  Al hacer clic en un alumno, se muestra un modal con toda la información personal y académica, así como los datos del representante.

- **Protección de Rutas:**  
  Solo los usuarios autenticados pueden acceder a la información de alumnos. Si la sesión expira o el usuario no está autenticado, es redirigido al login.

- **Diseño Moderno y Responsive:**  
  Interfaz profesional, moderna y adaptable a dispositivos móviles y escritorio, usando Tailwind CSS.

---

## Estructura de Carpetas y Módulos

- **/app**

  - `layout.js`: Layout principal, aplica el proveedor de Redux y la protección de rutas.
  - `page.js`: Página principal, muestra la tabla de alumnos y controles.
  - `login/page.jsx`: Página de inicio de sesión y recuperación de contraseña.
  - `ReduxProvider.jsx`: Proveedor global de Redux, sincroniza el estado de autenticación con Firebase.

- **/components**

  - `MainInformation.jsx`: Componente principal de gestión y visualización de alumnos.
  - `AlumnosTable.jsx`: Tabla que muestra los alumnos con opciones de editar y eliminar.
  - `AlumnoModal.jsx`: Modal reutilizable para agregar y editar alumnos.
  - `DetalleAlumnoModal.jsx`: Modal para mostrar toda la información de un alumno de forma estructurada y profesional.
  - `ProtectedRoute.js`: Componente que protege rutas, solo accesibles para usuarios autenticados.

- **/lib**

  - `firebase.js`: Configuración de Firebase y funciones para interactuar con Firestore y Auth (agregar, obtener, editar, eliminar alumnos, escuchar cambios de sesión).

- **/store**
  - `store.js`: Configuración del store de Redux.
  - `/features/auth/authSlice.js`: Slice de autenticación, maneja el estado de login/logout.

---

## Flujo de la Aplicación

1. **Inicio de Sesión:**  
   El usuario accede a `/login`, ingresa sus credenciales y, si son válidas, es autenticado mediante Firebase. Si olvida su contraseña, puede solicitar un enlace de recuperación.

2. **Protección de Rutas:**  
   Al autenticarse, el usuario es redirigido automáticamente al dashboard principal. Si no está autenticado, cualquier intento de acceder a rutas protegidas lo redirige al login.

3. **Gestión de Alumnos:**

   - **Visualización:**  
     Se muestra una tabla con los alumnos ordenados por grado y sección.
   - **Búsqueda:**  
     El usuario puede buscar alumnos por nombre en tiempo real.
   - **Detalle:**  
     Al hacer clic en una fila, se abre un modal con toda la información del alumno.
   - **Agregar/Editar:**  
     Se pueden agregar nuevos alumnos o editar los existentes mediante formularios modales.
   - **Eliminar:**  
     Se puede eliminar un alumno con confirmación.

4. **Cierre de Sesión:**  
   El usuario puede cerrar sesión desde la interfaz principal, lo que elimina la sesión local y en Firebase.

---

## Tecnologías Utilizadas

- **Next.js**: Framework React para aplicaciones web modernas.
- **React**: Librería principal para la UI.
- **Redux Toolkit**: Manejo de estado global.
- **Firebase**:
  - **Authentication**: Manejo de usuarios y sesiones.
  - **Firestore**: Base de datos NoSQL en tiempo real.
- **Tailwind CSS**: Framework de estilos para un diseño moderno y responsive.

---

## Consideraciones Técnicas

- **Persistencia de Sesión:**  
  La sesión de usuario se mantiene activa incluso al recargar la página, gracias a la integración de Firebase Auth y el listener global en ReduxProvider.

- **Escalabilidad:**  
  El código está modularizado y componentizado para facilitar el mantenimiento y la extensión de funcionalidades.

- **Seguridad:**  
  Las rutas están protegidas y los datos sensibles no se exponen en el frontend.

---

## Cómo Ejecutar el Proyecto

1. Instala las dependencias:
   ```
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```
3. Accede a la aplicación en [http://localhost:3000](http://localhost:3000)

---

## Créditos

Desarrollado por [Tu Nombre]  
Proyecto universitario - Sistema de Control de Estudios
