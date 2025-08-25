import { ApiService } from './api';
import { DoramaCompleto } from '../types/dorama';

export class DoramaService extends ApiService {
  async getDoramas(): Promise<DoramaCompleto[]> {
    return this.makeRequest('/doramas/completo');
  }

  async getDoramaCompleto(id: string): Promise<DoramaCompleto> {
    return this.makeRequest(`/doramas/${id}/completo`);
  }

  async criarDorama(data: any): Promise<void> {
    return this.makeRequest('/doramas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDorama(id: string, data: any): Promise<void> {
    return this.makeRequest(`/doramas/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDorama(id: string): Promise<void> {
    return this.makeRequest(`/doramas/${id}`, {
      method: 'DELETE',
    });
  }
}

export const doramaService = new DoramaService();
