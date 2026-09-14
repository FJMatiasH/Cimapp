export type DificultadCima = 'Fácil' | 'Moderada' | 'Difícil' | 'Muy Difícil';

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Cima {
  id: string;
  nombre: string;
  altitud: number; // en metros (m s. n. m.)
  dificultad: DificultadCima;
  provincia: string;
  sistemaMontanoso: string;
  imagenes: string[];
  descripcion: string;
  desnivelPositivo?: number;
  coordenadas?: Coordenadas;
}

export interface CimasFilterQuery {
  search?: string;
  dificultad?: string;
  provincia?: string;
  minAlt?: number;
  maxAlt?: number;
}

export type TipoLista = 'favoritas' | 'guardadas' | 'hechas';

export interface UserLists {
  favoritas: string[];
  guardadas: string[];
  hechas: string[];
}

export interface ToggleListResponse {
  cimaId: string;
  listType: TipoLista;
  active: boolean;
  lists: UserLists;
}

export interface RecommendationRequest {
  nivel?: string;
  provincia?: string;
  altitudMaxima?: number;
  preferencias?: string;
}

export interface RecommendedCimaItem {
  cimaId: string;
  nombre: string;
  motivo: string;
  consejoSeguridad: string;
}

export interface RecommendationResponse {
  mensaje: string;
  recomendaciones: RecommendedCimaItem[];
  cimasDetalle?: Cima[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}
