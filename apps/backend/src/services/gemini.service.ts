import { GoogleGenAI } from '@google/genai';
import { cimasService } from './cimas.service';
import { RecommendationRequest, RecommendationResponse, RecommendedCimaItem } from '../models/recommendation.model';
import { Cima } from '../models/cima.model';

export class GeminiService {
  private ai: GoogleGenAI | null = null;

  private getClient(): GoogleGenAI | null {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!this.ai && apiKey && apiKey !== 'tu_clave_de_gemini_aqui') {
      this.ai = new GoogleGenAI({ apiKey });
    }
    return this.ai;
  }

  public isConfigured(): boolean {
    const key = process.env.GEMINI_API_KEY;
    return Boolean(key && key.trim() !== '' && key !== 'tu_clave_de_gemini_aqui');
  }

  public async getRecommendations(request: RecommendationRequest): Promise<RecommendationResponse> {
    const allCimas = cimasService.getAllRaw();
    const cimasCatalogSummary = allCimas.map(c => ({
      id: c.id,
      nombre: c.nombre,
      altitud: c.altitud,
      dificultad: c.dificultad,
      provincia: c.provincia,
      sistema: c.sistemaMontanoso,
      descripcion: c.descripcion
    }));

    const client = this.getClient();
    if (client && this.isConfigured()) {
      try {
        const prompt = `
Eres Cimapp AI, un experimentado guía de alta montaña y especialista en las cumbres de España.
Tu tarea es analizar las preferencias del usuario y recomendar 2 o 3 cimas EXCLUSIVAMENTE del siguiente catálogo oficial de Cimapp:

Catálogo disponible:
${JSON.stringify(cimasCatalogSummary, null, 2)}

Perfil y preferencias del usuario:
- Nivel técnico o experiencia: ${request.nivel || 'No especificado'}
- Provincia o zona preferida: ${request.provincia || 'Cualquiera en España'}
- Altitud máxima deseada: ${request.altitudMaxima ? `${request.altitudMaxima} metros` : 'Sin límite'}
- Observaciones o deseos adicionales: ${request.preferencias || 'Ninguno'}

Instrucciones:
1. Elige entre 2 y 3 cimas de la lista que mejor encajen.
2. Cada recomendación DEBE usar el 'cimaId' exacto del catálogo (ej: "mulhacen", "veleta", "aneto", "teide", "penalara", etc.).
3. Explica el motivo de la elección de forma cercana y profesional.
4. Añade un consejo técnico o de seguridad vital para esa ruta (equipo, meteorología, hidratación, etc.).

Responde OBLIGATORIAMENTE con un JSON con la siguiente estructura exacta:
{
  "mensaje": "Saludo personalizado y resumen del asesoramiento...",
  "recomendaciones": [
    {
      "cimaId": "id-exacto-del-catalogo",
      "nombre": "Nombre de la cima",
      "motivo": "Por qué es ideal para el usuario...",
      "consejoSeguridad": "Consejo técnico esencial..."
    }
  ]
}
`;

        const response = await client.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          }
        });

        const responseText = response.text || '';
        const parsed = JSON.parse(responseText);

        const cimasMap = new Map(allCimas.map(c => [c.id, c]));
        const cimasDetalle: Cima[] = [];

        if (Array.isArray(parsed.recomendaciones)) {
          for (const rec of parsed.recomendaciones) {
            const found = cimasMap.get(rec.cimaId);
            if (found) {
              cimasDetalle.push(found);
            }
          }
        }

        return {
          mensaje: parsed.mensaje || 'Aquí tienes las recomendaciones personalizadas para tu próxima aventura:',
          recomendaciones: parsed.recomendaciones || [],
          cimasDetalle
        };
      } catch (err: any) {
        console.warn('[GeminiService] Aviso: llamada a la API de Gemini no disponible o denegada, activando fallback local:', err.message || err);
      }
    }

    // Fallback inteligente basado en reglas locales si la API falla o no está disponible
    return this.fallbackRecommendations(request, allCimas);
  }

  private fallbackRecommendations(request: RecommendationRequest, allCimas: Cima[]): RecommendationResponse {
    let filtered = [...allCimas];

    if (request.nivel) {
      const matchNivel = filtered.filter(c => c.dificultad.toLowerCase() === request.nivel?.toLowerCase());
      if (matchNivel.length > 0) filtered = matchNivel;
    }

    if (request.provincia) {
      const p = request.provincia.toLowerCase();
      const byProv = filtered.filter(c => c.provincia.toLowerCase().includes(p));
      if (byProv.length > 0) filtered = byProv;
    }

    if (request.altitudMaxima) {
      const byAlt = filtered.filter(c => c.altitud <= (request.altitudMaxima || 4000));
      if (byAlt.length > 0) filtered = byAlt;
    }

    // Tomar 2 cimas
    const selected = filtered.slice(0, 2).length > 0 ? filtered.slice(0, 2) : allCimas.slice(0, 2);

    const recomendaciones: RecommendedCimaItem[] = selected.map(c => ({
      cimaId: c.id,
      nombre: c.nombre,
      motivo: `Cumbre seleccionada por coincidir con tu nivel (${c.dificultad}) y altitud de ${c.altitud}m en ${c.provincia}.`,
      consejoSeguridad: 'Consulta la previsión meteorológica antes de partir, lleva calzado de montaña adecuado y suficiente agua.'
    }));

    return {
      mensaje: 'Asesor Cimapp: Te sugerimos estas cimas emblemáticas que encajan con tu perfil técnico.',
      recomendaciones,
      cimasDetalle: selected
    };
  }
}

export const geminiService = new GeminiService();
