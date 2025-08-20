export interface Dorama {
  id: string;
  titulo: string;
  tituloAlternativo?: string;
  descricao: string;
  imagemCapa: string;
  ano: number;
  pais: string;
  status: 'Em andamento' | 'Completo' | 'Cancelado';
  generos: string[];
  elenco: string[];
  diretor: string;
  temporadas: Temporada[];
}

export interface Temporada {
  id: string;
  numero: number;
  titulo: string;
  episodios: number;
  duracaoEpisodio: number;
  dataLancamento: Date;
}

export interface DoramaCreate {
  titulo: string;
  tituloAlternativo?: string;
  descricao: string;
  ano: number;
  pais: string;
  generos: string[];
  // ... outros campos
}
