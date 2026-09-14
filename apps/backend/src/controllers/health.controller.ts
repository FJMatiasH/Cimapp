import { Request, Response } from 'express';
import { geminiService } from '../services/gemini.service';

export const getHealth = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'cimapp-backend',
      timestamp: new Date().toISOString(),
      geminiConfigured: geminiService.isConfigured()
    }
  });
};
