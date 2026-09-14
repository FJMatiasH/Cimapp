import { MOCK_CIMAS } from '../data/mockCimas';
import { Cima, CimasFilterQuery } from '../models/cima.model';

export class CimasService {
  private cimas: Cima[] = [...MOCK_CIMAS];

  public getAll(query: CimasFilterQuery = {}): Cima[] {
    let result = [...this.cimas];

    if (query.search) {
      const searchLower = query.search.toLowerCase().trim();
      result = result.filter(c =>
        c.nombre.toLowerCase().includes(searchLower) ||
        c.provincia.toLowerCase().includes(searchLower) ||
        c.sistemaMontanoso.toLowerCase().includes(searchLower) ||
        c.descripcion.toLowerCase().includes(searchLower)
      );
    }

    if (query.dificultad) {
      result = result.filter(c => c.dificultad.toLowerCase() === query.dificultad?.toLowerCase());
    }

    if (query.provincia) {
      const provLower = query.provincia.toLowerCase().trim();
      result = result.filter(c => c.provincia.toLowerCase().includes(provLower));
    }

    if (query.minAlt !== undefined && !isNaN(Number(query.minAlt))) {
      result = result.filter(c => c.altitud >= Number(query.minAlt));
    }

    if (query.maxAlt !== undefined && !isNaN(Number(query.maxAlt))) {
      result = result.filter(c => c.altitud <= Number(query.maxAlt));
    }

    return result;
  }

  public getById(id: string): Cima | undefined {
    return this.cimas.find(c => c.id.toLowerCase() === id.toLowerCase().trim());
  }

  public getAllRaw(): Cima[] {
    return this.cimas;
  }
}

export const cimasService = new CimasService();
