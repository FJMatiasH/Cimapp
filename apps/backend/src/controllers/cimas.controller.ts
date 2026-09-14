import { Request, Response } from 'express';
import { cimasService } from '../services/cimas.service';
import { DificultadCima } from '../models/cima.model';

export const listCimas = (req: Request, res: Response) => {
  const { search, dificultad, provincia, minAlt, maxAlt } = req.query;

  const filters = {
    search: search ? String(search) : undefined,
    dificultad: dificultad ? (String(dificultad) as DificultadCima) : undefined,
    provincia: provincia ? String(provincia) : undefined,
    minAlt: minAlt !== undefined ? Number(minAlt) : undefined,
    maxAlt: maxAlt !== undefined ? Number(maxAlt) : undefined,
  };

  const cimas = cimasService.getAll(filters);

  res.json({
    success: true,
    data: cimas,
    count: cimas.length
  });
};

export const getCimaDetail = (req: Request, res: Response) => {
  const id = String(req.params.id);
  const cima = cimasService.getById(id);

  if (!cima) {
    res.status(404).json({
      success: false,
      error: `No se encontró ninguna cima con el identificador '${id}'`
    });
    return;
  }

  res.json({
    success: true,
    data: cima
  });
};
