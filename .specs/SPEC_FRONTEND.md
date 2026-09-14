# Frontend Specification: Cimapp (`apps/frontend`)

**Versión**: 1.0.0  
**Stack**: React 18 / 19, TypeScript, Vite, Tailwind CSS, Lucide React  
**Referencia**: [.specs/MASTER_SPEC.md](file:///c:/Users/enelf/Desktop/cimapp/.specs/MASTER_SPEC.md)

---

## 1. Visión y Experiencia de Usuario (UX)

El frontend de `Cimapp` es una aplicación de página única (SPA) enfocada en la exploración visual de las cimas de montaña de España, la organización del progreso montañero personal y el asesoramiento personalizado mediante Inteligencia Artificial (Gemini AI).

### 1.1. Principios de Diseño
- **Estética Alpina y Premium**: Paleta inspirada en la naturaleza de montaña (pizarras profundas, nieves, verdes boscosos y cielos alpinos).
- **Inmediatez en la Interacción**: Marcado de cimas en un solo clic con retroalimentación instantánea (optimistic updates).
- **Legibilidad Técnica**: Fichas técnicas claras con altitud, dificultad y ubicación rápidamente escaneables.
- **Micro-interacciones Fluidas**: Animaciones suaves al pasar el cursor (hover), transiciones de modales y feedback visual claro en los botones de estado.

---

## 2. Vistas Principales y Flujos de Usuario

### 2.1. Vista 1: Catálogo de Cimas (Vista Principal)
La pantalla de inicio y centro de exploración de la aplicación.

- **Hero Section**:
  - Título inspirador, buscador rápido y botón destacado para abrir el **Asesor IA de Gemini** (`"✨ Recomiéndame una cima"`).
  - Métricas rápidas del catálogo (ej. "+8 cimas emblemáticas", "Altitud máxima 3.718m").
- **Barra de Filtros (`CimaFilters`)**:
  - **Búsqueda por texto**: Filtra en tiempo real por nombre de cima, provincia o cordillera.
  - **Selector de Dificultad**: Botones estilo pills o select (`Todas`, `Fácil`, `Moderada`, `Difícil`, `Muy Difícil`).
  - **Filtro de Altitud**: Control deslizante (slider) o rangos rápidos (ej: `> 3.000m`, `2.000 - 3.000m`, `< 2.000m`).
  - **Selector de Provincia**: Menú desplegable con las provincias disponibles en el catálogo.
  - **Botón de Limpiar Filtros**: Restablece los parámetros con un clic.
- **Cuadrícula de Cimas (`CimaGrid`)**:
  - Muestra las tarjetas que coinciden con los filtros activos.
  - Contador de resultados (ej. `"Mostrando 8 de 8 cimas"`).
  - Estado vacío interactivo si ningún filtro arroja coincidencias.

---

### 2.2. Vista 2: Detalle de Cima (`CimaDetailModal` o Vista Detalle)
Accesible al hacer clic en cualquier tarjeta del catálogo o de las listas.

- **Galería de Fotos (`ImageGallery`)**:
  - Fotografía principal a gran formato con indicador de foto activa.
  - Fila inferior de miniaturas clicables para navegar por la galería.
  - Botón para ver imagen en pantalla completa.
- **Cabecera de Cumbre**:
  - Nombre completo de la cima y provincia.
  - Badge de Dificultad con código cromático.
  - Altitud destacada en gran tamaño (`3.479 m s. n. m.`).
- **Ficha Técnica**:
  - Sistema montañoso / macizo.
  - Desnivel positivo acumulado estimado (ej. `+1.350 m`).
  - Coordenadas GPS (latitud / longitud) con enlace directo para ver en mapa exterior (OpenStreetMap / Google Maps).
- **Descripción y Guía de Ascensión**:
  - Texto descriptivo completo, notas sobre las vías normales de subida, requerimientos de equipo y estacionalidad.
- **Barra de Acciones de Usuario**:
  - Tres botones de estado con tamaño extendido:
    - `❤️ Favorita`: Añade o quita de la lista de favoritas.
    - `📌 Guardada (Por hacer)`: Marca para el plan de ascensiones.
    - `🏔️ ¡Coronada! (Hecha)`: Registra la cumbre como completada.

---

### 2.3. Vista 3: Pestañas de Listas del Usuario (`UserListsTabs`)
Sección dedicada a revisar y gestionar el progreso personal del usuario.

- **Selector de Pestañas con Contadores Dinámicos**:
  - **Favoritas (`❤️ Favoritas (3)`)**: Picos que más inspiran o gustan al usuario.
  - **Guardadas / Por Hacer (`📌 Guardadas (4)`)**: Próximos objetivos o metas de temporada.
  - **Hechas / Coronadas (`🏔️ Coronadas (2)`)**: Historial de cumbres alcanzadas.
- **Cuadrícula de Cimas Filtrada**:
  - Despliega las tarjetas correspondientes a la pestaña activa.
  - Permite desmarcar o cambiar de lista de forma directa.
- **Estado Vacío Amigable (`EmptyListState`)**:
  - Ilustración/icono temático, mensaje motivador (ej. *"Aún no has marcado ninguna cima como hecha. ¡Sal a la montaña y corona tu primer 3.000!"*) y botón `"Explorar el catálogo"`.

---

### 2.4. Módulo 4: Asesor Inteligente Gemini (`GeminiAdvisorModal`)
Diálogo interactivo para recibir recomendaciones automáticas personalizadas.

- **Formulario de Parámetros**:
  - Selector de experiencia: `Iniciación / Senderismo suave`, `Nivel Medio / Rutas largas`, `Avanzado / Alta Montaña`, `Experto / Alpinismo y Trepadas`.
  - Preferencia geográfica: `Cualquiera`, o filtro por zona (`Sierra Nevada`, `Pirineos`, `Picos de Europa`, `Guadarrama`, `Canarias`).
  - Campo opcional de texto libre: *"¿Qué tipo de aventura buscas hoy?"* (ej: *"Queremos ir con perro y evitar pasos con cadenas"*).
- **Respuesta de la IA (`RecommendationView`)**:
  - Indicador de carga con animación alpina mientras Gemini procesa la solicitud.
  - Mensaje introductorio personalizado del guía virtual.
  - Tarjetas de cimas recomendadas con:
    - Nombre y enlace directo a la ficha en Cimapp.
    - `"¿Por qué te la recomendamos?"`: Justificación adaptada al perfil.
    - `"Consejo del Guía"`: Advertencias técnicas y equipo sugerido.

---

## 3. Tarjeta de Cima (`CimaCard`) y Acciones Rápidas

La tarjeta es el componente nuclear de interacción en toda la interfaz.

```
+-----------------------------------------------------------+
| [ Imagen de Portada con efecto zoom en hover ]            |
|                                                           |
| [Badge: Moderada]                          [Alt: 3.479 m] |
+-----------------------------------------------------------+
| Mulhacén                                                  |
| 📍 Granada · Sierra Nevada                                |
|                                                           |
| "Techo de la Península Ibérica, con una panorámica..."   |
+-----------------------------------------------------------+
| [ Ver detalles ]               |  [ ❤️ ]   [ 📌 ]   [ 🏔️ ] |
+-----------------------------------------------------------+
```

### 3.1. Botones de Acción Rápida (`QuickActions`)
Cada tarjeta incorpora 3 botones de acceso directo:
1. **Botón Favorita (`Heart`)**:
   - Inactivo: Borde gris claro, icono con contorno neutro.
   - Activo: Relleno rojo coral (`text-rose-500 fill-rose-500 bg-rose-50 border-rose-200`).
2. **Botón Guardada (`Bookmark`)**:
   - Inactivo: Borde gris claro, icono con contorno neutro.
   - Activo: Relleno azul montaña (`text-sky-600 fill-sky-600 bg-sky-50 border-sky-200`).
3. **Botón Hecha (`CheckCircle` o `Mountain`)**:
   - Inactivo: Borde gris claro, icono con contorno neutro.
   - Activo: Relleno verde bosque (`text-emerald-600 fill-emerald-600 bg-emerald-50 border-emerald-200`).

---

## 4. Guía de Estilos y Tokens de Tailwind CSS

### 4.1. Paleta de Colores Montañera
- **Slate / Pizarra (Neutros primarios)**:
  - Fondo general: `bg-slate-50` / `bg-slate-900`
  - Superficies de tarjetas: `bg-white` / `bg-slate-800`
  - Texto principal: `text-slate-900` / `text-slate-100`
  - Texto secundario: `text-slate-500` / `text-slate-400`
- **Emerald / Bosque (Hechas & Aprobadas & Nivel Fácil)**:
  - `emerald-600`, `emerald-500`, `emerald-50`
- **Sky / Azul Alpino (Nieve, Cielo & Nivel Moderado)**:
  - `sky-600`, `sky-500`, `sky-50`
- **Amber / Naranja (Roca & Nivel Difícil)**:
  - `amber-600`, `amber-500`, `amber-50`
- **Rose / Carmesí (Favoritas & Nivel Muy Difícil)**:
  - `rose-600`, `rose-500`, `rose-50`

### 4.2. Tipografía
- Encabezados: `font-sans tracking-tight font-bold`
- Cifras técnicas (Altitud): `font-mono font-semibold`

---

## 5. Gestión de Estado y Servicios en Cliente

### 5.1. `useCimas.ts`
- Descarga el catálogo desde `GET /api/cimas`.
- Aplica filtros de dificultad, altitud y búsqueda de texto en cliente o delega al backend.
- Mantiene estado de carga (`loading`) y errores (`error`).

### 5.2. `useUserLists.ts`
- Inicializa el estado de las listas desde `GET /api/user-lists`.
- Proporciona la función `toggleCimaInList(cimaId, listType)`:
  - Ejecuta una actualización optimista inmediata en la UI.
  - Sincroniza en segundo plano mediante `POST /api/user-lists/toggle`.
  - Revierte el cambio si la petición de red falla.

### 5.3. `useGeminiAdvisor.ts`
- Maneja el envío del formulario a `POST /api/recommendations`.
- Controla el estado de petición en curso (`isGenerating`), errores y almacena la recomendación actual devuelta por la IA.
