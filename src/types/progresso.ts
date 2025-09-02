export enum StatusDoramaEnum {
  PlanejoAssistir = 0,
  Assistindo = 1,
  Pausado = 2,
  Abandonado = 3,
  Concluido = 4,
}

export interface ProgressoTemporada {
  id: string;
  usuarioId: string;
  temporadaId: string;
  episodiosAssistidos: number;
  status: StatusDoramaEnum;
  dataAtualizacao: string;
}

export interface AtualizarProgressoRequest {
  temporadaId: string;
  episodiosAssistidos: number;
}

export interface AtualizarStatusRequest {
  temporadaId: string;
  status: StatusDoramaEnum;
}

export interface ProgressoContextType {
  progressos: ProgressoTemporada[];
  loading: boolean;
  atualizarProgresso: (
    request: AtualizarProgressoRequest
  ) => Promise<ProgressoTemporada>;
  atualizarStatus: (
    request: AtualizarStatusRequest
  ) => Promise<ProgressoTemporada>;
  removerProgresso: (temporadaId: string) => Promise<void>;
  obterProgresso: (temporadaId: string) => ProgressoTemporada | undefined;
  carregarProgressos: () => Promise<void>;
  carregarProgressosPorUsuario: (
    usuarioId: string
  ) => Promise<ProgressoTemporada[]>;
}

export const StatusDoramaLabels: Record<StatusDoramaEnum, string> = {
  [StatusDoramaEnum.PlanejoAssistir]: 'Planejo Assistir',
  [StatusDoramaEnum.Assistindo]: 'Assistindo',
  [StatusDoramaEnum.Pausado]: 'Pausado',
  [StatusDoramaEnum.Abandonado]: 'Abandonado',
  [StatusDoramaEnum.Concluido]: 'Concluído',
};

export const StatusDoramaColors: Record<StatusDoramaEnum, string> = {
  [StatusDoramaEnum.PlanejoAssistir]: 'bg-blue-100 text-blue-800',
  [StatusDoramaEnum.Assistindo]: 'bg-green-100 text-green-800',
  [StatusDoramaEnum.Pausado]: 'bg-yellow-100 text-yellow-800',
  [StatusDoramaEnum.Abandonado]: 'bg-red-100 text-red-800',
  [StatusDoramaEnum.Concluido]: 'bg-purple-100 text-purple-800',
};
