import { ApiService } from './api';
import { Temporada } from '../types/dorama';

export class TemporadaService extends ApiService {
  async getTemporada(temporadaId: string): Promise<Temporada> {
    return this.makeRequest(`/Temporada/${temporadaId}`);
  }
}

export const temporadaService = new TemporadaService();
