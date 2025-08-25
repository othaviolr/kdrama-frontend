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

export interface Atividade {
  id: string;
  usuarioId: string;
  usuarioNome: string;
  usuarioAvatarUrl: string;
  tipo: TipoAtividade;
  dados: AtividadeDados;
  dataCriacao: Date;
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

export interface AtividadeContextType {
  atividades: Atividade[];
  loading: boolean;
  feedAtividades: (quantidade: number) => Promise<void>;
  atividadesUsuario: (usuarioId: string) => Promise<void>;
  limparAtividades: () => void;
}
