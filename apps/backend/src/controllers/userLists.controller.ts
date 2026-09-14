import { Request, Response } from 'express';
import { userListsService } from '../services/userLists.service';
import { cimasService } from '../services/cimas.service';
import { TipoLista } from '../models/userLists.model';

const VALID_LIST_TYPES: TipoLista[] = ['favoritas', 'guardadas', 'hechas'];

export const getUserLists = (req: Request, res: Response) => {
  const populate = req.query.populate === 'true';
  const lists = userListsService.getLists(populate);

  res.json({
    success: true,
    data: lists
  });
};

export const toggleUserList = (req: Request, res: Response) => {
  const { cimaId, listType } = req.body;

  if (!cimaId || typeof cimaId !== 'string') {
    res.status(400).json({
      success: false,
      error: 'El campo cimaId es obligatorio'
    });
    return;
  }

  if (!VALID_LIST_TYPES.includes(listType)) {
    res.status(400).json({
      success: false,
      error: `listType inválido. Debe ser uno de: ${VALID_LIST_TYPES.join(', ')}`
    });
    return;
  }

  const cima = cimasService.getById(cimaId);
  if (!cima) {
    res.status(404).json({
      success: false,
      error: `La cima '${cimaId}' no existe en el catálogo`
    });
    return;
  }

  const result = userListsService.toggle(cimaId, listType);

  res.json({
    success: true,
    data: result
  });
};

export const addToList = (req: Request, res: Response) => {
  const listType = String(req.params.listType);
  const cimaId = String(req.params.cimaId);

  if (!VALID_LIST_TYPES.includes(listType as TipoLista)) {
    res.status(400).json({
      success: false,
      error: `listType inválido. Debe ser uno de: ${VALID_LIST_TYPES.join(', ')}`
    });
    return;
  }

  const cima = cimasService.getById(cimaId);
  if (!cima) {
    res.status(404).json({
      success: false,
      error: `La cima '${cimaId}' no existe en el catálogo`
    });
    return;
  }

  const updatedLists = userListsService.add(cimaId, listType as TipoLista);

  res.json({
    success: true,
    data: updatedLists
  });
};

export const removeFromList = (req: Request, res: Response) => {
  const listType = String(req.params.listType);
  const cimaId = String(req.params.cimaId);

  if (!VALID_LIST_TYPES.includes(listType as TipoLista)) {
    res.status(400).json({
      success: false,
      error: `listType inválido. Debe ser uno de: ${VALID_LIST_TYPES.join(', ')}`
    });
    return;
  }

  const updatedLists = userListsService.remove(cimaId, listType as TipoLista);

  res.json({
    success: true,
    data: updatedLists
  });
};
