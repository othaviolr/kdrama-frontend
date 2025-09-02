export interface CreateDoramaRequest {
  usuarioCriadorId: string;
  titulo: string;
  tituloOriginal: string;
  paisOrigem: string;
  anoLancamento: number;
  emExibicao: boolean;
  plataforma: number;
  generoIds: string[];
  sinopse: string;
  atorIds: string[];
  imagemCapaUrl: string;
}

export interface CreateTemporadaRequest {
  doramaId: string;
  numero: number;
  anoLancamento: number;
  emExibicao: boolean;
  nome: string;
  sinopse: string;
}

export interface CreateEpisodioRequest {
  temporadaId: string;
  numero: number;
  titulo: string;
  duracaoMinutos: number;
  tipo: number;
  sinopse: string;
}

export interface CreateAtorRequest {
  nome: string;
  nomeCompleto: string;
  anoNascimento: number;
  altura: number;
  pais: string;
  biografia: string;
  fotoUrl: string;
  instagram?: string;
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
  instagram?: string;
}

export interface AtorBusca {
  id: string;
  nome: string;
  fotoUrl: string;
}

export interface Temporada {
  id: string;
  nome: string;
  ordem: number;
  doramaId: string;
  dataEstreia: string;
  numeroEpisodios: number;
  episodios: Episodio[];
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

export enum Plataforma {
  Netflix = 0,
  PrimeVideo = 1,
  Disney = 2,
  Viki = 3,
}

export enum TipoEpisodio {
  Normal = 0,
  Especial = 1,
  Final = 2,
}
