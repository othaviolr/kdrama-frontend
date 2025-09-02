import { useContext, createContext } from 'react';

interface User {
  usuarioId?: string;
  nomeUsuario: string;
  email: string;
  nome?: string;
  fotoUrl?: string | null;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  registrar: (
    nome: string,
    nomeUsuario: string,
    email: string,
    senha: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
