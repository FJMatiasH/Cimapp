import { Request, Response } from 'express';
import { geminiService } from '../services/gemini.service';
import { RecommendationRequest } from '../models/recommendation.model';

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const { nivel, provincia, altitudMaxima, preferencias } = req.body;

    const requestData: RecommendationRequest = {
      nivel,
      provincia,
      altitudMaxima: altitudMaxima !== undefined ? Number(altitudMaxima) : undefined,
      preferencias
    };

    const recommendations = await geminiService.getRecommendations(requestData);

    res.json({
      success: true,
      data: recommendations
    });
  } catch (error: any) {
    console.error('Error en controlador de recomendaciones:', error);
    res.status(500).json({
      success: false,
      error: 'Ocurrió un error al procesar las recomendaciones'
    });
  }
};
