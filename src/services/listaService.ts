import { ApiService } from './api';

export class ListaService extends ApiService {
  async getListasPublicas() {
    return this.makeRequest('/listas-prateleira/publicas');
  }

  async getLista(listaId: string) {
    return this.makeRequest(`/listas-prateleira/${listaId}`);
  }

  async criarLista(data: any) {
    return this.makeRequest('/listas-prateleira', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateLista(listaId: string, data: any) {
    return this.makeRequest(`/listas-prateleira/${listaId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteLista(listaId: string) {
    return this.makeRequest(`/listas-prateleira/${listaId}`, {
      method: 'DELETE',
    });
  }

  async adicionarDoramaLista(data: any) {
    return this.makeRequest('/dorama-lista', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async removerDoramaLista(data: any) {
    return this.makeRequest('/dorama-lista', {
      method: 'DELETE',
      body: JSON.stringify(data),
    });
  }
}

export const listaService = new ListaService();
