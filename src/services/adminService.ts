// adminService.ts - Serviços para funcionalidades administrativas

import { ApiService } from './api';
import {
  CreateDoramaRequest,
  CreateTemporadaRequest,
  CreateEpisodioRequest,
  CreateAtorRequest,
  DoramaCompleto,
  Ator,
  AtorBusca,
  Genero,
} from '../types/admin';

export class AdminService extends ApiService {
  // CRIAR - Métodos de criação
  async createDorama(data: CreateDoramaRequest): Promise<string> {
    return this.makeRequest<string>('/doramas', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createTemporada(data: CreateTemporadaRequest): Promise<string> {
    return this.makeRequest<string>('/Temporada', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createEpisodio(data: CreateEpisodioRequest): Promise<string> {
    return this.makeRequest<string>('/Episodio', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async createAtor(data: CreateAtorRequest): Promise<string> {
    return this.makeRequest<string>('/Ator', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // BUSCAR - Métodos de busca específicos
  async buscarAtoresPorNome(nome: string): Promise<AtorBusca[]> {
    if (!nome.trim()) return [];

    try {
      console.log('🔍 Buscando atores para:', nome);

      // Buscar todos os atores do endpoint /Ator
      const todosAtores = await this.makeRequest<AtorBusca[]>('/Ator');
      console.log('📥 Total de atores recebidos:', todosAtores.length);

      // Filtrar por nome no frontend
      const atoresFiltrados = todosAtores.filter((ator) =>
        ator.nome.toLowerCase().includes(nome.toLowerCase())
      );

      console.log('✅ Atores filtrados:', atoresFiltrados);
      return atoresFiltrados;
    } catch (error) {
      console.error('❌ Erro na busca de atores:', error);
      return [];
    }
  }

  async buscarDoramasPorTitulo(titulo: string): Promise<DoramaCompleto[]> {
    if (!titulo.trim()) return [];
    return this.makeRequest<DoramaCompleto[]>(
      `/doramas/titulo/${encodeURIComponent(titulo)}`
    );
  }

  async getTemporadasPorDorama(nomeDorama: string): Promise<any[]> {
    if (!nomeDorama.trim()) return [];
    return this.makeRequest<any[]>(
      `/Temporada/dorama/${encodeURIComponent(nomeDorama)}`
    );
  }

  // LISTAR - Métodos de listagem completa
  async getAllAtores(): Promise<Ator[]> {
    return this.makeRequest<Ator[]>('/Ator');
  }

  async getAllDoramasCompleto(): Promise<DoramaCompleto[]> {
    return this.makeRequest<DoramaCompleto[]>('/doramas/completo');
  }

  async getAllGeneros(): Promise<Genero[]> {
    return this.makeRequest<Genero[]>('/Genero');
  }

  // GET INDIVIDUAL - Métodos para buscar por ID
  async getDoramaCompleto(id: string): Promise<DoramaCompleto> {
    return this.makeRequest<DoramaCompleto>(`/doramas/${id}/completo`);
  }

  async getAtor(id: string): Promise<Ator> {
    return this.makeRequest<Ator>(`/Ator/${id}`);
  }

  async getDorama(id: string): Promise<any> {
    return this.makeRequest<any>(`/doramas/${id}`);
  }

  async getTemporada(id: string): Promise<any> {
    return this.makeRequest<any>(`/Temporada/${id}`);
  }

  async getEpisodio(id: string): Promise<any> {
    return this.makeRequest<any>(`/Episodio/${id}`);
  }

  // MÉTODO ESPECIAL - Criar dorama completo com temporadas e episódios
  async createDoramaCompleto(
    doramaData: CreateDoramaRequest,
    temporadas?: CreateTemporadaRequest[],
    episodiosPorTemporada?: {
      [temporadaIndex: number]: CreateEpisodioRequest[];
    }
  ): Promise<{
    doramaId: string;
    temporadaIds: string[];
    episodioIds: string[];
  }> {
    try {
      // 1. Criar o dorama
      const doramaId = await this.createDorama(doramaData);

      const temporadaIds: string[] = [];
      const episodioIds: string[] = [];

      // 2. Criar temporadas se fornecidas
      if (temporadas && temporadas.length > 0) {
        for (const temporadaData of temporadas) {
          const temporadaComId = { ...temporadaData, doramaId };
          const temporadaId = await this.createTemporada(temporadaComId);
          temporadaIds.push(temporadaId);

          // 3. Criar episódios para esta temporada
          const temporadaIndex = temporadas.indexOf(temporadaData);
          const episodios = episodiosPorTemporada?.[temporadaIndex];

          if (episodios && episodios.length > 0) {
            for (const episodioData of episodios) {
              const episodioComId = { ...episodioData, temporadaId };
              const episodioId = await this.createEpisodio(episodioComId);
              episodioIds.push(episodioId);
            }
          }
        }
      }

      return {
        doramaId,
        temporadaIds,
        episodioIds,
      };
    } catch (error) {
      console.error('Erro ao criar dorama completo:', error);
      throw error;
    }
  }
}

// Exportar instância singleton
export const adminService = new AdminService();

// VALIDAÇÕES - Helper functions para validação
export const validateDoramaData = (data: CreateDoramaRequest): string[] => {
  const errors: string[] = [];

  if (!data.titulo.trim()) errors.push('Título é obrigatório');
  if (!data.tituloOriginal.trim()) errors.push('Título original é obrigatório');
  if (!data.paisOrigem.trim()) errors.push('País de origem é obrigatório');
  if (!data.sinopse.trim()) errors.push('Sinopse é obrigatória');
  // Removido: usuarioCriadorId validation
  if (
    data.anoLancamento < 1900 ||
    data.anoLancamento > new Date().getFullYear() + 5
  ) {
    errors.push('Ano de lançamento inválido');
  }

  return errors;
};

export const validateAtorData = (data: CreateAtorRequest): string[] => {
  const errors: string[] = [];

  if (!data.nome.trim()) errors.push('Nome é obrigatório');
  if (!data.nomeCompleto.trim()) errors.push('Nome completo é obrigatório');
  if (!data.pais.trim()) errors.push('País é obrigatório');
  if (
    data.anoNascimento < 1900 ||
    data.anoNascimento > new Date().getFullYear()
  ) {
    errors.push('Ano de nascimento inválido');
  }
  if (data.altura < 0.5 || data.altura > 3.0) {
    errors.push('Altura deve estar entre 0.5m e 3.0m');
  }

  return errors;
};

export const validateTemporadaData = (
  data: CreateTemporadaRequest
): string[] => {
  const errors: string[] = [];

  if (!data.doramaId.trim()) errors.push('ID do dorama é obrigatório');
  if (!data.nome.trim()) errors.push('Nome da temporada é obrigatório');
  if (data.numero < 1) errors.push('Número da temporada deve ser maior que 0');

  return errors;
};

export const validateEpisodioData = (data: CreateEpisodioRequest): string[] => {
  const errors: string[] = [];

  if (!data.temporadaId.trim()) errors.push('ID da temporada é obrigatório');
  if (!data.titulo.trim()) errors.push('Título do episódio é obrigatório');
  if (data.numero < 1) errors.push('Número do episódio deve ser maior que 0');
  if (data.duracaoMinutos < 1)
    errors.push('Duração deve ser maior que 0 minutos');

  return errors;
};
