export type StatusTemporada =
  | 'NAO_INICIADO'
  | 'ASSISTINDO'
  | 'PAUSADO'
  | 'ABANDONADO'
  | 'CONCLUIDO';

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

export interface UpdateProgressoData {
  temporadaId: string;
  episodioAtual: number;
}

export interface UpdateStatusData {
  temporadaId: string;
  status: StatusTemporada;
}
