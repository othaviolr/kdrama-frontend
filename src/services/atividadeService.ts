import { ApiService } from './api';

export class AtividadeService extends ApiService {
  async getFeedAtividades(quantidade: number) {
    return this.makeRequest(`/atividades/feed/${quantidade}`);
  }

  async getAtividadesUsuario(usuarioId: string) {
    return this.makeRequest(`/atividades/usuario/${usuarioId}`);
  }

  async updateProgressoTemporada(data: any) {
    return this.makeRequest('/progresso-temporada/progresso', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async updateStatusTemporada(data: any) {
    return this.makeRequest('/progresso-temporada/status', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProgressoTemporada(temporadaId: string) {
    return this.makeRequest(`/progresso-temporada/${temporadaId}`, {
      method: 'DELETE',
    });
  }
}

export const atividadeService = new AtividadeService();
