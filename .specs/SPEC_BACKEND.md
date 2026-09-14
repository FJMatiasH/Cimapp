# Backend Specification: Cimapp (`apps/backend`)

**Versión**: 1.0.0  
**Stack**: Node.js, Express, TypeScript, `@google/generative-ai`  
**Referencia**: [.specs/MASTER_SPEC.md](file:///c:/Users/enelf/Desktop/cimapp/.specs/MASTER_SPEC.md)

---

## 1. Visión y Responsabilidades del Backend

El backend de `Cimapp` se encarga de:
1. Proveer la API REST para consultar el catálogo de cimas de España con capacidades de filtrado y búsqueda.
2. Gestionar el estado de las listas de usuario (Favoritas, Guardadas y Hechas) con soporte en memoria o almacenamiento persistente ligero.
3. Conectar de forma segura con la API de Google Gemini utilizando la clave `GEMINI_API_KEY` para generar recomendaciones de cimas inteligentes basadas en la experiencia y parámetros del usuario.
4. Proveer un conjunto de datos iniciales simulados (Mock Data) representativo de las principales cimas y cordilleras de España.

---

## 2. Estructura de Directorios

```
apps/backend/
├── .env.example
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                     # Entrada y arranque del servidor Express
    ├── config/
    │   ├── env.ts                   # Validación de variables de entorno (PORT, GEMINI_API_KEY)
    │   └── gemini.ts                # Inicialización del cliente GoogleGenerativeAI
    ├── controllers/
    │   ├── health.controller.ts     # Endpoint de verificación de estado
    │   ├── cimas.controller.ts      # Manejo de peticiones de cimas (listado, detalle)
    │   ├── userLists.controller.ts  # Manejo de listas de usuario
    │   └── recommendations.controller.ts # Recomendaciones con Gemini AI
    ├── routes/
    │   ├── index.ts                 # Enrutador general (/api)
    │   ├── cimas.routes.ts          # Rutas /api/cimas
    │   ├── userLists.routes.ts      # Rutas /api/user-lists
    │   └── recommendations.routes.ts# Rutas /api/recommendations
    ├── services/
    │   ├── cimas.service.ts         # Búsqueda, filtrado y obtención de cimas
    │   ├── userLists.service.ts     # Lógica de listas (añadir, toggle, eliminar)
    │   └── gemini.service.ts        # Llamadas y prompts hacia Google Gemini
    ├── models/
    │   ├── cima.model.ts            # Interfaces TypeScript de Cima
    │   └── userLists.model.ts       # Interfaces TypeScript de listas
    ├── data/
    │   └── mockCimas.ts             # Dataset inicial de cimas de España
    └── middlewares/
        ├── cors.middleware.ts       # Configuración de CORS para el frontend
        └── error.middleware.ts      # Manejador centralizado de errores HTTP
```

---

## 3. Variables de Entorno (`.env`)

```ini
PORT=3001
CORS_ORIGIN=http://localhost:5173
GEMINI_API_KEY=tu_clave_de_gemini_aqui
```

---

## 4. Endpoints REST detallados

### 4.1. Catálogo de Cimas

#### `GET /api/cimas`
Obtiene la lista de cimas disponibles, permitiendo filtros combinados por query params.

- **Query Parameters**:
  - `search` (opcional, string): Búsqueda por coincidencia en nombre, provincia o sistema montañoso.
  - `dificultad` (opcional, string): `'Fácil' | 'Moderada' | 'Difícil' | 'Muy Difícil'`.
  - `provincia` (opcional, string): Filtrar por provincia exacta o parcial.
  - `minAlt` (opcional, number): Altitud mínima en metros.
  - `maxAlt` (opcional, number): Altitud máxima en metros.
- **Respuesta Exitosa (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "mulhacen",
        "nombre": "Mulhacén",
        "altitud": 3479,
        "dificultad": "Moderada",
        "provincia": "Granada",
        "sistemaMontanoso": "Sierra Nevada",
        "imagenes": ["https://images.unsplash.com/..."],
        "descripcion": "Techo de la Península Ibérica...",
        "desnivelPositivo": 1350,
        "coordenadas": { "lat": 37.0531, "lng": -3.3114 }
      }
    ],
    "count": 1
  }
  ```

#### `GET /api/cimas/:id`
Obtiene los detalles completos de una cima específica.

- **Parámetros URL**:
  - `id` (string): Identificador único de la cima (ej: `teide`, `aneto`).
- **Respuesta Exitosa (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": { ...detalle de la cima... }
  }
  ```
- **Respuesta Error (`404 Not Found`)**:
  ```json
  {
    "success": false,
    "error": "Cima no encontrada con el id proporcionado"
  }
  ```

---

### 4.2. Listas de Usuario

El backend mantiene las listas de usuario (`favoritas`, `guardadas`, `hechas`). En esta fase se gestiona en memoria o sesión local:

#### `GET /api/user-lists`
Obtiene el estado actual de las listas del usuario.

- **Query Parameters**:
  - `populate` (opcional, boolean): Si es `true`, devuelve los objetos `Cima[]` completos en lugar de solo los `string[]` de IDs.
- **Respuesta Exitosa (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": {
      "favoritas": ["mulhacen", "aneto"],
      "guardadas": ["teide"],
      "hechas": ["penalara"]
    }
  }
  ```

#### `POST /api/user-lists/toggle`
Alterna la presencia de una cima en una lista (si está la quita, si no está la añade).

- **Body (`application/json`)**:
  ```json
  {
    "cimaId": "teide",
    "listType": "favoritas"
  }
  ```
- **Validaciones**:
  - `listType` debe ser estrictamente `'favoritas' | 'guardadas' | 'hechas'`.
  - `cimaId` debe corresponder a una cima existente.
- **Respuesta Exitosa (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": {
      "cimaId": "teide",
      "listType": "favoritas",
      "active": true,
      "lists": {
        "favoritas": ["mulhacen", "aneto", "teide"],
        "guardadas": [],
        "hechas": ["penalara"]
      }
    }
  }
  ```

#### `POST /api/user-lists/:listType/:cimaId`
Añade explícitamente una cima a una lista.

#### `DELETE /api/user-lists/:listType/:cimaId`
Elimina explícitamente una cima de una lista.

---

### 4.3. Recomendaciones Inteligentes con Google Gemini

#### `POST /api/recommendations`
Genera recomendaciones hiper-personalizadas utilizando el modelo `gemini-1.5-flash` de Google.

- **Body (`application/json`)**:
  ```json
  {
    "nivel": "Moderada",
    "provincia": "Granada",
    "altitudMaxima": 3500,
    "preferencias": "Busco una ascensión panorámica sin pasos aéreos complicados"
  }
  ```

- **Lógica del Servicio (`gemini.service.ts`)**:
  1. Construye el prompt inyectando el catálogo de cimas disponibles como contexto estructurado en formato JSON reducido.
  2. Define una directiva de rol estricta:
     > "Actúa como guía de montaña experto en España. Analiza las cimas disponibles en nuestro catálogo y selecciona las 2 o 3 más idóneas según el nivel técnico y preferencias del usuario. Responde en formato JSON válido según el esquema solicitado."
  3. Solicita a Gemini estructurar la salida con:
     - `mensaje`: Saludo y diagnóstico breve del perfil.
     - `recomendaciones`: Array con `cimaId`, `nombre`, `motivo` y `consejoSeguridad`.
  4. El backend cruza las recomendaciones devueltas con el catálogo y adjunta los datos completos de las cimas en `cimasDetalle`.

- **Respuesta Exitosa (`200 OK`)**:
  ```json
  {
    "success": true,
    "data": {
      "mensaje": "Para un nivel moderado y con preferencia en Granada, Sierra Nevada ofrece opciones de ensueño.",
      "recomendaciones": [
        {
          "cimaId": "veleta",
          "nombre": "Pico Veleta",
          "motivo": "Gran altitud por encima de los 3.000 m con acceso técnico sencillo por pista o vereda en época estival.",
          "consejoSeguridad": "Lleva protección solar extrema y cortavientos; el cambio térmico es abrupto."
        },
        {
          "cimaId": "mulhacen",
          "nombre": "Mulhacén",
          "motivo": "El techo peninsular ofrece una ascensión exigente a nivel físico pero noble técnicamente por la Hoya del Portillo o Capileira.",
          "consejoSeguridad": "Prever reserva previa si se utiliza la lanzadera del parque nacional y consultar previsión meteorológica."
        }
      ],
      "cimasDetalle": [ /* Objetos completos Cima */ ]
    }
  }
  ```

- **Manejo de Fallback (Resiliencia)**:
  - Si `GEMINI_API_KEY` no está configurada o la cuota de la API se excede, el servicio activa un motor de recomendación algorítmico local basado en filtros del dataset para que la UI continúe respondiendo sin fallos.

---

## 5. Datos Iniciales Simulados (Mock Data)

El archivo `src/data/mockCimas.ts` contendrá al menos las siguientes cimas emblemáticas con información verídica:

1. **Teide** (`id: "teide"`):
   - Altitud: `3718` m | Dificultad: `Moderada`
   - Provincia: `Santa Cruz de Tenerife` | Sistema: `Islas Canarias / Tenerife`
   - Descripción: Volcán y cumbre más alta de España, ubicado en el Parque Nacional del Teide. Requiere permiso especial para el tramo final del cráter (Sendero Telesforo Bravo).
   - Desnivel: `1500` m (a pie desde Montaña Blanca)

2. **Mulhacén** (`id: "mulhacen"`):
   - Altitud: `3479` m | Dificultad: `Moderada`
   - Provincia: `Granada` | Sistema: `Sierra Nevada`
   - Descripción: Techo de la Península Ibérica. Ascensión noble por su ladera sur en verano, pero muy severa en condiciones invernales por presencia de nieve y hielo.
   - Desnivel: `1350` m

3. **Aneto** (`id: "aneto"`):
   - Altitud: `3404` m | Dificultad: `Difícil`
   - Provincia: `Huesca` | Sistema: `Pirineos (Macizo de la Maladeta)`
   - Descripción: Cima máxima de los Pirineos. Exige travesía por glaciar (crampones y piolet obligatorios) y superar el aéreo 'Paso de Mahoma' antes de la cruz de la cumbre.
   - Desnivel: `1500` m

4. **Veleta** (`id: "veleta"`):
   - Altitud: `3398` m | Dificultad: `Fácil`
   - Provincia: `Granada` | Sistema: `Sierra Nevada`
   - Descripción: La segunda cumbre más alta de Sierra Nevada. Ruta muy accesible en verano, ideal para aclimatarse a cotas superiores a 3.000 metros.
   - Desnivel: `850` m desde Hoya de la Mora

5. **Monte Perdido** (`id: "monte-perdido"`):
   - Altitud: `3355` m | Dificultad: `Difícil`
   - Provincia: `Huesca` | Sistema: `Pirineos (Ordesa y Monte Perdido)`
   - Descripción: Majestuoso macizo calcáreo. El tramo de 'La Escupidera' requiere prudencia máxima, especialmente si persiste nieve o grava suelta.
   - Desnivel: `1200` m desde refugio de Góriz

6. **Naranjo de Bulnes / Picu Urriellu** (`id: "naranjo-de-bulnes"`):
   - Altitud: `2519` m | Dificultad: `Muy Difícil`
   - Provincia: `Asturias` | Sistema: `Picos de Europa (Macizo Central)`
   - Descripción: El tótem de la escalada en roca en España. No cuenta con ruta senderista ordinaria; todas sus vías de acceso exigen escalada clásica (mínimo V grado en la cara sur).
   - Desnivel: `1100` m hasta el refugio de la base + vía de escalada

7. **Torre Cerredo** (`id: "torre-cerredo"`):
   - Altitud: `2648` m | Dificultad: `Difícil`
   - Provincia: `Asturias / León` | Sistema: `Picos de Europa`
   - Descripción: Techo de los Picos de Europa y de la Cordillera Cantábrica. Tramo final con trepada expuesta de grado II+ por roca caliza quebrada.
   - Desnivel: `1400` m

8. **Peñalara** (`id: "penalara"`):
   - Altitud: `2428` m | Dificultad: `Fácil`
   - Provincia: `Madrid / Segovia` | Sistema: `Sierra de Guadarrama`
   - Descripción: Cima más alta del Sistema Central madrileño. Ruta clásica desde el Puerto de Cotos pasando por el circo glaciar y las lagunas de Peñalara.
   - Desnivel: `600` m
