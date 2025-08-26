export interface ListaApi {
  id: string;
  nome: string;
  descricao: string;
  imagemCapaUrl: string;
  privacidade: number;
  shareToken: string | null;
  usuarioId: string;
  dataCriacao: string;
  doramas: DoramaListaApi[];
}

export interface DoramaListaApi {
  doramaId: string;
  dataAdicao: string;
}

export interface ListaCreateApi {
  nome: string;
  descricao: string;
  imagemCapaUrl: string;
  privacidade: number;
}

export interface Lista {
  id: string;
  nome: string;
  descricao: string;
  imagemCapaUrl: string;
  publica: boolean;
  shareToken?: string;
  usuarioId: string;
  dataCriacao: Date;
  doramas: DoramaLista[];
}

export interface DoramaLista {
  doramaId: string;
  dataAdicao: Date;
}

export interface ListaCreate {
  nome: string;
  descricao: string;
  imagemCapaUrl: string;
  publica: boolean;
}

export interface ListaUpdate {
  nome?: string;
  descricao?: string;
  imagemCapaUrl?: string;
  publica?: boolean;
}

export interface AdicionarDoramaLista {
  listaId: string;
  doramaId: string;
}

export interface RemoverDoramaLista {
  listaId: string;
  doramaId: string;
}

export interface ListaContextType {
  listas: Lista[];
  minhasListas: Lista[];
  listaAtual: Lista | null;
  loading: boolean;
  loadingLista: boolean;
  carregarListasPublicas: () => Promise<void>;
  carregarMinhasListas: () => Promise<void>;
  carregarLista: (listaId: string) => Promise<void>;
  criarLista: (data: ListaCreate) => Promise<void>;
  atualizarLista: (listaId: string, data: ListaUpdate) => Promise<void>;
  deletarLista: (listaId: string) => Promise<void>;
  compartilharLista: (listaId: string) => Promise<string>;
  adicionarDoramaLista: (data: AdicionarDoramaLista) => Promise<void>;
  removerDoramaLista: (data: RemoverDoramaLista) => Promise<void>;
}
