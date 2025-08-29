export enum TipoAtividadeFeed {
  Progresso = 0,
  Avaliacao = 1,
  Lista = 2,
}

export interface ItemFeedApi {
  usuarioId: string;
  usuarioNome: string;
  usuarioAvatarUrl: string;
  tipoAtividade: TipoAtividadeFeed;
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

export interface ItemFeed {
  id: string;
  usuarioId: string;
  usuarioNome: string;
  usuarioAvatarUrl: string;
  tipoAtividade: TipoAtividadeFeed;
  doramaId?: string;
  doramaTitulo?: string;
  temporadaNumero?: number;
  episodioNumero?: number;
  nota?: number;
  comentario?: string;
  prateleiraId?: string;
  prateleiraNome?: string;
  criadoEm: Date;
}

export interface FeedPaginado {
  items: ItemFeed[];
  hasMore: boolean;
  nextPage?: number;
}

export interface FeedContextType {
  feed: ItemFeed[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
  carregarFeed: (reset?: boolean) => Promise<void>;
  carregarMais: () => Promise<void>;
  adicionarItem: (item: ItemFeed) => void;
  limparFeed: () => void;
}

export const getTipoAtividadeTexto = (
  tipo: TipoAtividadeFeed,
  dados: ItemFeed
): string => {
  switch (tipo) {
    case TipoAtividadeFeed.Progresso:
      return `atualizou o progresso de ${dados.doramaTitulo}`;
    case TipoAtividadeFeed.Avaliacao:
      return `avaliou ${dados.doramaTitulo}`;
    case TipoAtividadeFeed.Lista:
      return `criou a lista "${dados.prateleiraNome}"`;
    default:
      return 'realizou uma atividade';
  }
};

export const getTipoAtividadeIcone = (tipo: TipoAtividadeFeed): string => {
  switch (tipo) {
    case TipoAtividadeFeed.Progresso:
      return 'play';
    case TipoAtividadeFeed.Avaliacao:
      return 'star';
    case TipoAtividadeFeed.Lista:
      return 'list';
    default:
      return 'activity';
  }
};

export const getTipoAtividadeCor = (tipo: TipoAtividadeFeed): string => {
  switch (tipo) {
    case TipoAtividadeFeed.Progresso:
      return 'text-blue-600';
    case TipoAtividadeFeed.Avaliacao:
      return 'text-yellow-600';
    case TipoAtividadeFeed.Lista:
      return 'text-purple-600';
    default:
      return 'text-gray-600';
  }
};
