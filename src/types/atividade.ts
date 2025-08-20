export type TipoAtividade =
  | 'REGISTRO'
  | 'LOGIN'
  | 'DORAMA_ADICIONADO'
  | 'DORAMA_ATUALIZADO'
  | 'AVALIACAO_ADICIONADA'
  | 'AVALIACAO_ATUALIZADA'
  | 'LISTA_CRIADA'
  | 'DORAMA_LISTA_ADICIONADO'
  | 'SEGUIR_USUARIO'
  | 'PROGRESSO_ATUALIZADO'
  | 'STATUS_ATUALIZADO';

export interface Atividade {
  id: string;
  tipo: TipoAtividade;
  usuarioId: string;
  usuario: {
    nomeUsuario: string;
    nomeExibicao?: string;
    avatar?: string;
  };
  dados: AtividadeDados;
  dataCriacao: Date;
}

export type AtividadeDados =
  | AtividadeDorama
  | AtividadeAvaliacao
  | AtividadeLista
  | AtividadeUsuario
  | AtividadeProgresso;

export interface AtividadeDorama {
  doramaId: string;
  doramaTitulo: string;
  doramaImagem: string;
  temporadaNumero?: number;
}

export interface AtividadeAvaliacao {
  doramaId: string;
  doramaTitulo: string;
  doramaImagem: string;
  temporadaId: string;
  temporadaNumero: number;
  nota: number;
  comentario?: string;
}

export interface AtividadeLista {
  listaId: string;
  listaTitulo: string;
  doramaId?: string;
  doramaTitulo?: string;
  doramaImagem?: string;
}

export interface AtividadeUsuario {
  usuarioAlvoId: string;
  usuarioAlvoNome: string;
}

export interface AtividadeProgresso {
  doramaId: string;
  doramaTitulo: string;
  doramaImagem: string;
  temporadaId: string;
  temporadaNumero: number;
  episodioAtual: number;
  totalEpisodios: number;
  statusAnterior?: string;
  statusNovo?: string;
}

export interface ProgressoTemporada {
  id: string;
  usuarioId: string;
  temporadaId: string;
  episodioAtual: number;
  status: StatusTemporada;
  dataInicio?: Date;
  dataConclusao?: Date;
  temporada: {
    numero: number;
    titulo: string;
    episodios: number;
    dorama: {
      id: string;
      titulo: string;
      imagemCapa: string;
    };
  };
}

export type StatusTemporada =
  | 'NAO_INICIADO'
  | 'ASSISTINDO'
  | 'PAUSADO'
  | 'ABANDONADO'
  | 'CONCLUIDO';

export interface UpdateProgressoData {
  temporadaId: string;
  episodioAtual: number;
}

export interface UpdateStatusData {
  temporadaId: string;
  status: StatusTemporada;
}

export interface FeedAtividades {
  atividades: Atividade[];
  total: number;
  hasMore: boolean;
}
