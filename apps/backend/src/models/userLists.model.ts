import { Cima } from './cima.model';

export type TipoLista = 'favoritas' | 'guardadas' | 'hechas';

export interface UserLists {
  favoritas: string[];
  guardadas: string[];
  hechas: string[];
}

export interface PopulatedUserLists {
  favoritas: Cima[];
  guardadas: Cima[];
  hechas: Cima[];
}

export interface ToggleListRequest {
  cimaId: string;
  listType: TipoLista;
}

export interface ToggleListResponse {
  cimaId: string;
  listType: TipoLista;
  active: boolean;
  lists: UserLists;
}
