export interface Avaliacao {
  id: string;
  usuarioId: string;
  temporadaId: string;
  nota: number;
  comentario?: string;
  dataAvaliacao: Date;
  spoiler: boolean;
}

export interface AvaliacaoCreate {
  temporadaId: string;
  nota: number;
  comentario?: string;
  spoiler?: boolean;
}

export interface AvaliacaoUpdate {
  nota?: number;
  comentario?: string;
  spoiler?: boolean;
}
