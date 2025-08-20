export interface ListaPrateleira {
  id: string;
  titulo: string;
  descricao?: string;
  usuarioId: string;
  usuario: {
    nomeUsuario: string;
    nomeExibicao?: string;
    avatar?: string;
  };
  doramas: DoramaLista[];
  publica: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date;
}

export interface DoramaLista {
  id: string;
  doramaId: string;
  listaId: string;
  dataAdicao: Date;
  ordem: number;
  notas?: string;
  dorama: {
    id: string;
    titulo: string;
    imagemCapa: string;
    ano: number;
  };
}

export interface ListaCreate {
  titulo: string;
  descricao?: string;
  publica: boolean;
}

export interface ListaUpdate {
  titulo?: string;
  descricao?: string;
  publica?: boolean;
}

export interface AdicionarDoramaLista {
  listaId: string;
  doramaId: string;
  notas?: string;
  ordem?: number;
}

export interface RemoverDoramaLista {
  listaId: string;
  doramaId: string;
}

export interface ListaWithDoramas extends ListaPrateleira {
  doramas: Array<{
    id: string;
    ordem: number;
    notas?: string;
    dataAdicao: Date;
    dorama: {
      id: string;
      titulo: string;
      imagemCapa: string;
      ano: number;
      pais: string;
      status: string;
      generos: string[];
    };
  }>;
}
