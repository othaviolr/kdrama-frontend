import { ApiService } from './api';

interface Genero {
  id: string;
  nome: string;
}

interface Ator {
  id: string;
  nome: string;
  nomeCompleto: string;
  anoNascimento: number;
  altura: number;
  pais: string;
  biografia: string;
  fotoUrl: string;
  instagram: string;
}

interface Episodio {
  id: string;
  temporadaId: string;
  numero: number;
  titulo: string;
  duracaoMinutos: number;
  tipo: number;
  sinopse: string;
}

interface Temporada {
  episodios: Episodio[];
  id: string;
  nome: string;
  ordem: number;
  doramaId: string;
  dataEstreia: string;
  dataFim: string | null;
}

interface DoramaCompleto {
  doramaId: string;
  titulo: string;
  tituloOriginal: string;
  sinopse: string;
  capaUrl: string;
  anoLancamento: number;
  paisOrigem: string;
  emExibicao: boolean;
  plataforma: number;
  generos: Genero[];
  atores: Ator[];
  temporadas: Temporada[];
}

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
