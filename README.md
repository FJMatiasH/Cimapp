```markdown
# Cimapp 🏔️
> Plataforma web para la exploración, registro y recomendación inteligente de cimas de montaña en España.

[![React](https://img.shields.io/badge/React-18%2F19-61DAFB?logo=react&logoColor=black)](#)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs&logoColor=white)](#)
[![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwindcss&logoColor=white)](#)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E75B2?logo=googlegemini&logoColor=white)](#)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](#)

---

## 📌 Descripción General

**Cimapp** es una aplicación monolítica estructurada como monorepo diseñada para montañeros y excursionistas. Permite descubrir picos emblemáticos de la geografía española, realizar un seguimiento del progreso personal (cimas pendientes, favoritas y coronadas) y recibir asesoramiento técnico personalizado impulsado por Inteligencia Artificial generativa mediante la API de **Google Gemini**.

---

## ✨ Características Clave

* 🗺️ **Catálogo Interactivo de Cimas**: Fichas detalladas de picos emblemáticos (Mulhacén, Teide, Aneto, Peñalara, etc.) con altitud, grado de dificultad técnica, provincia, sistema montañoso, fotografías y descripciones.
* 🎯 **Gestión de Listas Personales**:
  * **Favoritas (❤️)**: Selección de cumbres preferidas o inspiradoras.
  * **Guardadas / Por Hacer (📌)**: Plan de ascensiones y lista de deseos (*wishlist*).
  * **Coronadas / Hechas (🏔️)**: Registro e historial de cumbres alcanzadas.
* 🔍 **Búsqueda y Filtros Avanzados**: Filtrado dinámico en tiempo real por texto libre, provincia, rango de altitud y nivel de dificultad técnica (Fácil, Moderada, Difícil, Muy Difícil).
* ✨ **Asesor IA con Google Gemini**: Recomendaciones personalizadas basadas en el nivel del montañero, preferencias geográficas y terreno, incluyendo consejos clave de seguridad y época recomendada.
* 🛡️ **Resiliencia & Fallback**: Sistema de recomendaciones con motor algorítmico local en caso de ausencia de clave de API o agotamiento de cuota externa.

---

## 🏗️ Arquitectura y Metodología

El proyecto está organizado en un **Monorepo** modular con estricta separación de responsabilidades:

```text
cimapp/
├── apps/
│   ├── backend/               # API RESTful en Express + TypeScript
│   │   ├── src/
│   │   │   ├── config/        # Variables de entorno y cliente Gemini AI
│   │   │   ├── controllers/   # Controladores de cimas, listas e IA
│   │   │   ├── data/          # Mock Dataset con cimas de España
│   │   │   ├── routes/        # Enrutador REST /api
│   │   │   └── services/      # Lógica de negocio y motor de recomendación
│   │   └── package.json
│   └── frontend/              # SPA en React + Tailwind CSS + TypeScript
│       ├── src/
│       │   ├── components/    # UI, Layout, Cimas, Modales y Asesor IA
│       │   ├── hooks/         # Custom hooks (useCimas, useUserLists, etc.)
│       │   ├── services/      # Cliente HTTP centralizado
│       │   └── types/         # Interfaces tipadas del dominio
│       └── package.json
├── .specs/                    # Especificaciones funcionales y técnicas (SDD)
│   ├── CONTEXTO_GLOBAL.md
│   ├── MASTER_SPEC.md
│   ├── SPEC_BACKEND.md
│   └── SPEC_FRONTEND.md
├── .env                       # Variables de entorno raíz
└── README.md                  # Documentación principal

```

### 📐 Spec-Driven Development (SDD) e Ingeniería de Contexto

Toda la aplicación ha sido diseñada siguiendo la metodología **Spec-Driven Development**. Las especificaciones ubicadas en `.specs/` constituyen el *contrato de verdad único* del proyecto. Esto garantiza un desarrollo desacoplado, mantenible y guiado por requisitos técnicos bien definidos desde la fase de arquitectura.

---

## 🚀 Guía de Instalación y Despliegue Local

### Requisitos Previos

* **Node.js**: Versión 18.0 o superior
* **npm**: Versión 9.0 o superior
* **Git**

### 1. Clonar el repositorio

```bash
git clone [https://github.com/FJMatiasH/Cimapp.git](https://github.com/FJMatiasH/Cimapp.git)
cd Cimapp

```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (o dentro de `apps/backend/`):

```ini
PORT=3000
CORS_ORIGIN=http://localhost:5173
GEMINI_API_KEY=tu_clave_de_api_gemini_aqui

```

> **Nota**: Puedes obtener una API Key gratuita en [Google AI Studio](https://aistudio.google.com/).

### 3. Instalación de dependencias y ejecución

#### Backend (`apps/backend`):

```bash
cd apps/backend
npm install
npm run dev

```

*El servidor iniciará en `http://localhost:3000`.*

#### Frontend (`apps/frontend`):

En una nueva terminal:

```bash
cd apps/frontend
npm install
npm run dev

```

*La interfaz web se abrirá en `http://localhost:5173`.*

---

## 📡 Resumen de la API REST

| Método | Endpoint | Parámetros / Body | Descripción |
| --- | --- | --- | --- |
| `GET` | `/api/health` | N/A | Verifica el estado del servidor y conexión con Gemini |
| `GET` | `/api/cimas` | Query: `search`, `dificultad`, `provincia`, `minAlt`, `maxAlt` | Obtiene el catálogo completo de cimas con filtros |
| `GET` | `/api/cimas/:id` | Params: `id` | Obtiene los detalles completos de una cima específica |
| `GET` | `/api/user-lists` | Query: `populate` (`boolean`) | Devuelve las listas del usuario (favoritas, guardadas, hechas) |
| `POST` | `/api/user-lists/toggle` | Body: `{ cimaId, listType }` | Alterna una cima dentro de una lista específica |
| `POST` | `/api/recommendations` | Body: `RecommendationRequest` | Genera recomendaciones inteligentes con Gemini AI |

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo de licencia para más detalles.

---

*Desarrollado para amantes de la montaña y el software libre.* 🏔️✨

```

```