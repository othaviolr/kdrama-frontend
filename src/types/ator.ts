export interface Ator {
  id: string;
  nome: string;
  nomeCompleto: string;
  anoNascimento: number;
  altura: number;
  pais: string;
  biografia: string;
  fotoUrl: string;
  instagram: string;
  doramas?: DoramaResumo[]; 
}

export interface DoramaResumo {
  doramaId: string;
  titulo: string;
  tituloOriginal: string;
  capaUrl: string;
  anoLancamento: number;
}

export interface AtorResumo {
  id: string;
  nome: string;
  fotoUrl: string;
}

export interface CriarAtorRequest {
  nome: string;
  nomeCompleto: string;
  anoNascimento: number;
  altura: number;
  pais: string;
  biografia: string;
  fotoUrl: string;
  instagram: string;
}

export interface EditarAtorRequest extends CriarAtorRequest {
  id: string;
}

export interface PaginacaoResponse<T> {
  itens: T[]; 
  paginaAtual: number;
  tamanhoPagina: number;
  totalItens: number;
  totalPaginas: number;
  temPaginaAnterior: boolean;
  temProximaPagina: boolean;
}

export interface AtorContextType {
  atores: Ator[];
  atorAtual: Ator | null;
  loading: boolean;
  loadingAtor: boolean;
  paginaAtual: number;
  totalPaginas: number;
  totalItens: number;
  temProximaPagina: boolean;
  carregarAtores: (pagina?: number, tamanhoPagina?: number, completo?: boolean, acumular?: boolean) => Promise<void>;
  carregarMaisAtores: () => Promise<void>; 
  carregarAtor: (id: string) => Promise<void>;
  carregarAtorPorNome: (nome: string) => Promise<void>;
  criarAtor: (data: CriarAtorRequest) => Promise<void>;
  editarAtor: (id: string, data: EditarAtorRequest) => Promise<void>;
  excluirAtor: (id: string) => Promise<void>;
  limparAtorAtual: () => void;
  buscarAtorPorId: (id: string) => Ator | undefined;
}