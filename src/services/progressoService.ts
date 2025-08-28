import { ApiService } from './api';
import {
  ProgressoTemporada,
  AtualizarProgressoRequest,
  AtualizarStatusRequest,
} from '../types/progresso';

class ProgressoService extends ApiService {
  async getProgressos(): Promise<ProgressoTemporada[]> {
    try {
      console.log('📊 Buscando progressos do usuário logado...');
      const progressos = await this.makeRequest<ProgressoTemporada[]>(
        '/progresso-temporada'
      );
      console.log('✅ Progressos carregados:', progressos.length);
      return progressos;
    } catch (error) {
      console.error('❌ Erro ao buscar progressos:', error);
      return [];
    }
  }

  async getProgressosPorUsuario(
    usuarioId: string
  ): Promise<ProgressoTemporada[]> {
    try {
      console.log('📊 Buscando progressos do usuário:', usuarioId);
      const progressos = await this.makeRequest<ProgressoTemporada[]>(
        `/progresso-temporada/usuario/${usuarioId}`
      );
      console.log('✅ Progressos carregados:', progressos.length);
      return progressos;
    } catch (error) {
      console.error('❌ Erro ao buscar progressos do usuário:', error);
      return [];
    }
  }

  async getProgresso(temporadaId: string): Promise<ProgressoTemporada | null> {
    try {
      console.log('📊 Buscando progresso da temporada:', temporadaId);
      const progresso = await this.makeRequest<ProgressoTemporada>(
        `/progresso-temporada/${temporadaId}`
      );
      console.log('✅ Progresso encontrado:', progresso);
      return progresso;
    } catch (error) {
      console.error('❌ Erro ao buscar progresso:', error);
      if (error instanceof Error && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }

  async atualizarProgresso(
    request: AtualizarProgressoRequest
  ): Promise<ProgressoTemporada> {
    try {
      console.log('📊 Atualizando progresso:', request);
      const progresso = await this.makeRequest<ProgressoTemporada>(
        '/progresso-temporada/progresso',
        {
          method: 'PUT',
          body: JSON.stringify(request),
        }
      );
      console.log('✅ Progresso atualizado:', progresso);
      return progresso;
    } catch (error) {
      console.error('❌ Erro ao atualizar progresso:', error);
      throw error;
    }
  }

  async atualizarStatus(
    request: AtualizarStatusRequest
  ): Promise<ProgressoTemporada> {
    try {
      console.log('🚀 SERVICE - Enviando atualizarStatus:', request);
      console.log('🌐 URL:', '/progresso-temporada/status');

      const progresso = await this.makeRequest<ProgressoTemporada>(
        '/progresso-temporada/status',
        {
          method: 'PUT',
          body: JSON.stringify(request),
        }
      );

      console.log('🎯 SERVICE - Resposta recebida:', progresso);
      console.log('🔍 SERVICE - Campo temporadaId:', progresso?.temporadaId);

      return progresso;
    } catch (error) {
      console.error('❌ Erro ao atualizar status:', error);
      throw error;
    }
  }

  async removerProgresso(temporadaId: string): Promise<void> {
    try {
      console.log('📊 Removendo progresso da temporada:', temporadaId);
      await this.makeRequest<void>(`/progresso-temporada/${temporadaId}`, {
        method: 'DELETE',
      });
      console.log('✅ Progresso removido');
    } catch (error) {
      console.error('❌ Erro ao remover progresso:', error);
      throw error;
    }
  }
}

export const progressoService = new ProgressoService();
