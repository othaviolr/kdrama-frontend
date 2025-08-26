import { DoramaCompleto, Temporada } from './dorama';

export interface AvaliacaoApi {
  id: string;
  temporadaId: string;
  nota: number;
  comentario: string;
  recomendadoPorUsuarioId: string | null;
  recomendadoPorNomeLivre: string;
  dataAvaliacao: string;
}

export interface AvaliacaoCreateApi {
  temporadaId: string;
  nota: number;
  comentario: string;
  recomendadoPorUsuarioId?: string;
  recomendadoPorNomeLivre?: string;
}

export interface AvaliacaoUpdateApi {
  temporadaId: string;
  nota: number;
  comentario: string;
  recomendadoPorUsuarioId?: string;
  recomendadoPorNomeLivre?: string;
}

export interface Avaliacao {
  id: string;
  temporadaId: string;
  nota: number;
  comentario: string;
  recomendadoPor?: string;
  dataAvaliacao: Date;
}

export interface AvaliacaoCompleta extends Avaliacao {
  temporada?: Temporada;
  dorama?: DoramaCompleto;
}

export interface AvaliacaoCreate {
  temporadaId: string;
  nota: number;
  comentario: string;
  recomendadoPorNomeLivre?: string;
}

export interface AvaliacaoUpdate {
  temporadaId: string;
  nota: number;
  comentario: string;
  recomendadoPorNomeLivre?: string;
}

export interface AvaliacaoContextType {
  minhaAvaliacao: Avaliacao | null;
  minhasAvaliacoes: Avaliacao[];
  loading: boolean;
  loadingAvaliacoes: boolean;
  criarAvaliacao: (data: AvaliacaoCreate) => Promise<void>;
  atualizarAvaliacao: (data: AvaliacaoUpdate) => Promise<void>;
  obterAvaliacao: (temporadaId: string) => Promise<void>;
  carregarMinhasAvaliacoes: () => Promise<void>;
  deletarAvaliacao: (temporadaId: string) => Promise<void>;
  limparAvaliacao: () => void;
}
