import {
  Cima,
  CimasFilterQuery,
  UserLists,
  ToggleListResponse,
  RecommendationRequest,
  RecommendationResponse,
  ApiResponse
} from '../types/cima';

const API_BASE_URL = 'http://localhost:3000/api';

async function handleResponse<T>(res: Response): Promise<T> {
  const json: ApiResponse<T> = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error || `Error HTTP ${res.status}`);
  }
  return json.data as T;
}

export const api = {
  /**
   * Obtiene el listado de cimas con filtros opcionales
   */
  async getCimas(filters: CimasFilterQuery = {}): Promise<Cima[]> {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.dificultad && filters.dificultad !== 'Todas') params.append('dificultad', filters.dificultad);
    if (filters.provincia && filters.provincia !== 'Todas') params.append('provincia', filters.provincia);
    if (filters.minAlt) params.append('minAlt', String(filters.minAlt));
    if (filters.maxAlt) params.append('maxAlt', String(filters.maxAlt));

    const url = `${API_BASE_URL}/cimas${params.toString() ? `?${params.toString()}` : ''}`;
    const res = await fetch(url);
    return handleResponse<Cima[]>(res);
  },

  /**
   * Obtiene el detalle de una cima por ID
   */
  async getCimaById(id: string): Promise<Cima> {
    const res = await fetch(`${API_BASE_URL}/cimas/${id}`);
    return handleResponse<Cima>(res);
  },

  /**
   * Obtiene las listas del usuario (favoritas, guardadas, hechas)
   */
  async getUserLists(): Promise<UserLists> {
    const res = await fetch(`${API_BASE_URL}/user-lists`);
    return handleResponse<UserLists>(res);
  },

  /**
   * Alterna una cima en una lista de usuario
   */
  async toggleUserList(cimaId: string, listType: 'favoritas' | 'guardadas' | 'hechas'): Promise<ToggleListResponse> {
    const res = await fetch(`${API_BASE_URL}/user-lists/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cimaId, listType }),
    });
    return handleResponse<ToggleListResponse>(res);
  },

  /**
   * Solicita recomendaciones personalizadas al asistente Gemini
   */
  async getRecommendations(data: RecommendationRequest): Promise<RecommendationResponse> {
    const res = await fetch(`${API_BASE_URL}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<RecommendationResponse>(res);
  },

  /**
   * Comprueba el estado y conectividad del backend
   */
  async checkHealth(): Promise<{ status: string; geminiConfigured: boolean }> {
    const res = await fetch(`${API_BASE_URL}/health`);
    return handleResponse<{ status: string; geminiConfigured: boolean }>(res);
  }
};
