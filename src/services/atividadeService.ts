import { ApiService } from './api';
import { AtividadeApi, Atividade, TipoAtividade } from '../types/atividade';

export class AtividadeService extends ApiService {
  async getFeedAtividades(quantidade: number): Promise<AtividadeApi[]> {
    return this.makeRequest(`/atividades/feed/${quantidade}`);
  }

  async getMinhasAtividades(): Promise<AtividadeApi[]> {
    return this.makeRequest('/atividades/minhas');
  }

  async getAtividadesUsuario(usuarioId: string): Promise<AtividadeApi[]> {
    return this.makeRequest(`/atividades/usuario/${usuarioId}`);
  }

  convertAtividadeApi(atividade: AtividadeApi): Atividade {
    const getTipo = (tipoAtividade: number): TipoAtividade => {
      switch (tipoAtividade) {
        case 0:
          return 'PROGRESSO_TEMPORADA';
        case 1:
          return 'AVALIACAO';
        case 2:
          return 'PRATELEIRA';
        default:
          return 'PROGRESSO_TEMPORADA';
      }
    };

    return {
      id: `${atividade.usuarioId}-${atividade.tipoAtividade}-${atividade.criadoEm}`,
      usuario: {
        id: atividade.usuarioId,
        nome: atividade.usuarioNome,
        avatarUrl: atividade.usuarioAvatarUrl,
      },
      tipo: getTipo(atividade.tipoAtividade),
      dados: {
        doramaId: atividade.doramaId || undefined,
        doramaTitulo: atividade.doramaTitulo || undefined,
        temporadaNumero: atividade.temporadaNumero || undefined,
        episodioNumero: atividade.episodioNumero || undefined,
        nota: atividade.nota || undefined,
        comentario: atividade.comentario || undefined,
        prateleiraId: atividade.prateleiraId || undefined,
        prateleiraNome: atividade.prateleiraNome || undefined,
      },
      dataCriacao: new Date(atividade.criadoEm),
    };
  }
}

export const atividadeService = new AtividadeService();
