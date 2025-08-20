import { ApiService } from './api';

export class AvaliacaoService extends ApiService {
  async criarAvaliacao(data: any) {
    return this.makeRequest('/avaliacoes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAvaliacao(data: any) {
    return this.makeRequest('/avaliacoes', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async getAvaliacao(temporadaId: string) {
    return this.makeRequest(`/avaliacoes/${temporadaId}`);
  }

  async deleteAvaliacao(temporadaId: string) {
    return this.makeRequest(`/avaliacoes/${temporadaId}`, {
      method: 'DELETE',
    });
  }
}

export const avaliacaoService = new AvaliacaoService();
