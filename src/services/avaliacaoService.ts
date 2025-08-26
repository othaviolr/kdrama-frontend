import { ApiService } from './api';
import {
  AvaliacaoApi,
  AvaliacaoCreateApi,
  AvaliacaoUpdateApi,
  Avaliacao,
  AvaliacaoCreate,
  AvaliacaoUpdate,
} from '../types/avaliacao';

export class AvaliacaoService extends ApiService {
  async criarAvaliacao(data: AvaliacaoCreate): Promise<void> {
    const apiData: AvaliacaoCreateApi = {
      temporadaId: data.temporadaId,
      nota: data.nota,
      comentario: data.comentario,
      recomendadoPorNomeLivre: data.recomendadoPorNomeLivre || '',
    };

    return this.makeRequest('/avaliacoes', {
      method: 'POST',
      body: JSON.stringify(apiData),
    });
  }

  async updateAvaliacao(data: AvaliacaoUpdate): Promise<void> {
    const apiData: AvaliacaoUpdateApi = {
      temporadaId: data.temporadaId,
      nota: data.nota,
      comentario: data.comentario,
      recomendadoPorNomeLivre: data.recomendadoPorNomeLivre || '',
    };

    return this.makeRequest('/avaliacoes', {
      method: 'PUT',
      body: JSON.stringify(apiData),
    });
  }

  async getAvaliacao(temporadaId: string): Promise<AvaliacaoApi> {
    return this.makeRequest(`/avaliacoes/${temporadaId}`);
  }

  async getMinhasAvaliacoes(): Promise<AvaliacaoApi[]> {
    return this.makeRequest('/avaliacoes/minhas');
  }

  async deleteAvaliacao(temporadaId: string): Promise<void> {
    return this.makeRequest(`/avaliacoes/${temporadaId}`, {
      method: 'DELETE',
    });
  }

  convertAvaliacaoApi(avaliacao: AvaliacaoApi): Avaliacao {
    return {
      id: avaliacao.id,
      temporadaId: avaliacao.temporadaId,
      nota: avaliacao.nota,
      comentario: avaliacao.comentario,
      recomendadoPor: avaliacao.recomendadoPorNomeLivre || undefined,
      dataAvaliacao: new Date(avaliacao.dataAvaliacao),
    };
  }
}

export const avaliacaoService = new AvaliacaoService();
