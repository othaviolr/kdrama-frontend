export interface Usuario {
  usuarioId: string;
  nome: string;
  nomeUsuario: string;
  email: string;
}

export interface LoginResponse {
  usuarioId: string;
  nome: string;
  nomeUsuario: string;
  email: string;
  token: string;
}

export interface AuthContextType {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  registrar: (dados: any) => Promise<void>;
  logout: () => void;
}
