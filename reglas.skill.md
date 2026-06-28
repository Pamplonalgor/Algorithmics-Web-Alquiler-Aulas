# Skill: Reglas de Desarrollo - Alquiler de Aulas (Stack Moderno)

Este archivo contiene las directrices técnicas para el desarrollo robusto de la plataforma utilizando tecnologías modernas.

## Stack Tecnológico
- **Framework**: Next.js 14+ (App Router).
- **Lógica**: React con TypeScript para máxima seguridad de tipos.
- **Estilos**: Tailwind CSS para utilidades y CSS Modules/Variables para componentes complejos.
- **Base de Datos**: Supabase (PostgreSQL + Auth + Storage).

## Estándares de "Robustez"
- **Tipado Estricto**: Uso obligatorio de TypeScript. Evitar el uso de `any`.
- **Fuente de Verdad (Tipos)**: Todos los tipos compartidos entre el Panel de Administración y la Web deben definirse exclusivamente en `src/lib/types.ts`. Queda prohibida la duplicación de tipos o el uso de nombres inconsistentes (ej. no mezclar `Aula` y `Classroom` en el código; usar el estándar definido en `types.ts`).
- **Sincronización con DB**: Los tipos deben reflejar fielmente el esquema de las tablas en Supabase para evitar errores de ejecución durante operaciones CRUD.
- **Componentización**: Dividir la UI en componentes reutilizables y atómicos en `src/components`.

- **Estado**: Utilizar Hooks de React (`useState`, `useEffect`, `useMemo`) de forma eficiente.
- **Rendimiento**: Optimización de imágenes con `next/image` y fuentes con `next/font`.
- **Diseño**: Mantener una estética Premium (glassmorphism, gradientes, animaciones suaves).

## Estilo y Diseño
- **Responsividad**: "Mobile First" absoluto.
- **Accesibilidad**: Uso de etiquetas semánticas y atributos ARIA.
- **Consistencia**: Seguir la paleta de colores corporativa (Slate, Amber, Blue).

## Protocolo de Ejecución Local
- **Gestión de Puertos**: Antes de ejecutar la web con `npm run dev`, se debe verificar si hay otro proceso ocupando el puerto local.
- **Limpieza de Procesos**: En caso de bloqueo o conflicto de puertos, utilizar obligatoriamente: `taskkill /F /IM node.exe` para asegurar que no queden instancias residuales.
- **Motor de Compilación**: Si el servidor se queda bloqueado en "Starting...", utilizar el motor Turbopack ejecutando: `npx next dev --turbo`. Esto mejora la velocidad de compilación y evita cuelgues en entornos locales.

## Idioma
- **Contenido**: Todo el contenido visible para el usuario debe estar en **Español**.
- **Código**: Nombres de variables, componentes y comentarios en **Inglés** (estándar de la industria para proyectos robustos).
