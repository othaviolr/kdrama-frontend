export interface AtividadeApi {
  usuarioId: string;
  usuarioNome: string;
  usuarioAvatarUrl: string;
  tipoAtividade: number;
  doramaId: string | null;
  doramaTitulo: string | null;
  temporadaNumero: number | null;
  episodioNumero: number | null;
  nota: number | null;
  comentario: string | null;
  prateleiraId: string | null;
  prateleiraNome: string | null;
  criadoEm: string;
}

export type TipoAtividade = 'PROGRESSO_TEMPORADA' | 'AVALIACAO' | 'PRATELEIRA';

export interface AtividadeDados {
  doramaId?: string;
  doramaTitulo?: string;
  temporadaNumero?: number;
  episodioNumero?: number;
  nota?: number;
  comentario?: string;
  prateleiraId?: string;
  prateleiraNome?: string;
}

export interface Atividade {
  id: string;
  usuario: {
    id: string;
    nome: string;
    avatarUrl: string;
  };
  tipo: TipoAtividade;
  dados: AtividadeDados;
  dataCriacao: Date;
}

export interface AtividadeContextType {
  atividades: Atividade[];
  minhasAtividades: Atividade[];
  loading: boolean;
  loadingMinhas: boolean;
  carregarFeed: (quantidade: number) => Promise<void>;
  carregarMinhasAtividades: () => Promise<void>;
  carregarAtividadesUsuario: (usuarioId: string) => Promise<void>;
  limparAtividades: () => void;
}
