import { Cima, DificultadCima } from './cima.model';

export interface RecommendationRequest {
  nivel?: DificultadCima | string;
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
