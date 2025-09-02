export interface PerfilApi {
  usuarioId?: string;
  nome: string;
  nomeUsuario: string;
  email: string;
  fotoUrl: string;
  bio: string;
}

export interface Usuario {
  usuarioId?: string;
  nome: string;
  nomeUsuario: string;
  email: string;
  fotoUrl?: string | null;
}

export interface LoginResponse {
  usuarioId: string;
  nome: string;
  nomeUsuario: string;
  email: string;
  token: string;
  fotoUrl?: string | null;
}

export interface AuthContextType {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  registrar: (dados: any) => Promise<void>;
  logout: () => void;
}

export interface UsuarioRegistro {
  nome: string;
  nomeUsuario: string;
  email: string;
  senha: string;
}

export interface UsuarioLogin {
  email: string;
  senha: string;
}

export interface UsuarioUpdate {
  nomeExibicao?: string;
  bio?: string;
  avatar?: string;
}

export interface EstatisticasPerfil {
  doramasAssistidos: number;
  doramasAssistindo: number;
  avaliacoes: number;
  listas: number;
  seguidores: number;
  seguindo: number;
  tempoTotalAssistido?: number;
}

export interface UsuarioSeguidor {
  usuarioId: string;
  nomeUsuario: string;
  nome: string;
  fotoPerfilUrl: string;
}

export interface PerfilPublico {
  usuarioId: string;
  nome: string;
  nomeUsuario: string;
  email: string;
  fotoUrl: string;
  bio: string;
  totalSeguidores: number;
  totalSeguindo: number;
  segueUsuarioAtual: boolean;
}
