# Contexto Global del Proyecto: Cimapp

## 1. Información General
- **Nombre de la Aplicación**: `Cimapp`
- **Dominio**: Plataforma web de exploración, registro y recomendación de cimas de montaña de España.
- **Propósito**: Ofrecer a los montañeros y excursionistas una herramienta intuitiva y moderna para descubrir picos emblemáticos de la geografía española, organizar sus metas montañeras (cimas pendientes, favoritas y coronadas) y recibir sugerencias personalizadas de ascensión mediante Inteligencia Artificial (Google Gemini API).
- **Metodología de Desarrollo**: Spec-Driven Development (SDD), arquitectura limpia y separación modular estricta de responsabilidades.

---

## 2. Funcionalidades Clave

1. **Catálogo Integral de Cimas de España**:
   - Información técnica y descriptiva de cimas de la península e islas:
     * Nombre oficial y alternativo de la cumbre.
     * Altitud en metros sobre el nivel del mar (m s. n. m.).
     * Nivel de dificultad técnica estandarizado (Fácil, Moderada, Difícil, Muy Difícil / Alta Montaña).
     * Galería de fotos de alta resolución utilizando recursos estáticos alojados localmente en la carpeta `/assets/imagenes/` del monorepo.
     * Descripción geográfica, características de ascensión y entorno natural.
     * Ubicación geográfica precisa (Provincia, Sistema Montañoso / Macizo y Coordenadas).
   - Sistema de filtrado y búsqueda avanzada en cliente por nombre, provincia, rango de altitud y dificultad.

2. **Gestión de Listas de Usuario (Progreso Personal)**:
   - **Favoritas (❤️)**: Cimas preferidas o de especial interés para el usuario.
   - **Guardadas / Por Hacer (📌)**: Cimas planificadas para futuras ascensiones (wishlist de montañero).
   - **Hechas / Coronadas (🏔️)**: Registro de cimas completadas con éxito.
   - Acciones rápidas (one-click toggle) desde cualquier tarjeta o vista de detalle.

3. **Recomendaciones Inteligentes con Google Gemini AI**:
   - Integración con el modelo generativo de Gemini mediante la API oficial (`@google/generative-ai`).
   - Generación de sugerencias a medida según:
     * Nivel técnico y experiencia del montañero (iniciación, senderista regular, alpinista experimentado).
     * Preferencias geográficas (provincia, macizo o cercanía).
     * Condicionantes de altitud o tipo de terreno.
   - Consejos técnicos personalizados sobre seguridad, equipo necesario y mejores épocas del año para ascender.

---

## 3. Arquitectura y Stack Tecnológico

El proyecto está estructurado como un **Monorepo**:

```
cimapp/
├── apps/
│   ├── backend/       # API RESTful en Express + TypeScript + Gemini SDK
│   └── frontend/      # SPA React + Tailwind CSS + TypeScript
├── assets/
│   └── imagenes/      # Repositorio de recursos estáticos de fotografías de cimas
├── .specs/            # Especificaciones funcionales y técnicas (SDD)
├── .env               # Variables de entorno raíz (ej. GEMINI_API_KEY, PORT)
├── package.json       # Configuración de workspaces del monorepo
└── README.md          # Documentación general
```

### 3.1. Backend (`apps/backend`)
- **Entorno de ejecución**: Node.js
- **Framework**: Express
- **Lenguaje**: TypeScript
- **Integraciones**: SDK oficial `@google/generative-ai` de Google
- **Utilidades**: `cors`, `dotenv`, validación tipada de datos

### 3.2. Frontend (`apps/frontend`)
- **Librería UI**: React 18 / 19 con Vite
- **Lenguaje**: TypeScript
- **Diseño y Estilos**: Tailwind CSS (paleta natural alpina: pizarras, bosques, cumbres)
- **Iconografía**: Lucide React
- **Consumo API**: Fetch API / Axios con tipado estricto compartido

---

## 4. Principios y Directrices de Desarrollo

1. **Spec-Driven Development (SDD)**:
   - Las especificaciones en `.specs/` actúan como el contrato de verdad absoluto del sistema. Cualquier cambio funcional o estructural se refleja primero en la documentación técnica.
2. **Modularidad y Tipado Estricto**:
   - Interfaces TypeScript uniformes compartidas conceptualmente entre backend y frontend (`Cima`, `UserLists`, `RecommendationRequest`).
3. **Resiliencia y Degradación Elegante**:
   - El motor de recomendaciones IA debe responder con alternativas o sugerencias basadas en reglas si no hay conectividad o se agota la cuota de la API de Gemini.
4. **Experiencia de Usuario (UX) Inspiradora**:
   - Diseño limpio, enfocado en imágenes de naturaleza, tipografía legible y controles rápidos para marcar cimas fácilmente.
