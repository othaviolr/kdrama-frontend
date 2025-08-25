export interface Genero {
  id: string;
  nome: string;
}

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
}

export interface Episodio {
  id: string;
  temporadaId: string;
  numero: number;
  titulo: string;
  duracaoMinutos: number;
  tipo: number;
  sinopse: string;
}

export interface Temporada {
  episodios: Episodio[];
  id: string;
  nome: string;
  ordem: number;
  doramaId: string;
  dataEstreia: string;
  numeroEpisodios: number;
}

export interface DoramaCompleto {
  doramaId: string;
  titulo: string;
  tituloOriginal: string;
  sinopse: string;
  capaUrl: string;
  anoLancamento: number;
  paisOrigem: string;
  emExibicao: boolean;
  plataforma: number;
  generos: Genero[];
  atores: Ator[];
  temporadas: Temporada[];
}

export interface DoramaContextType {
  doramas: DoramaCompleto[];
  doramaAtual: DoramaCompleto | null;
  loading: boolean;
  loadingDorama: boolean;
  carregarDoramas: () => Promise<void>;
  carregarDorama: (id: string) => Promise<void>;
  limparDoramaAtual: () => void;
  buscarDoramaPorId: (id: string) => DoramaCompleto | undefined;
}
