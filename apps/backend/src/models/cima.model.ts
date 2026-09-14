export type DificultadCima = 'Fácil' | 'Moderada' | 'Difícil' | 'Muy Difícil';

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Cima {
  id: string;
  nombre: string;
  altitud: number; // m s. n. m.
  dificultad: DificultadCima;
  provincia: string;
  sistemaMontanoso: string;
  imagenes: string[];
  descripcion: string;
  desnivelPositivo?: number; // en metros
  coordenadas?: Coordenadas;
}

export interface CimasFilterQuery {
  search?: string;
  dificultad?: DificultadCima;
  provincia?: string;
  minAlt?: number;
  maxAlt?: number;
}
