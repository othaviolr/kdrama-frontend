import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { usuarioService } from '../services';
import { Usuario, LoginResponse, AuthContextType } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verificarToken();
  }, []);

  const verificarToken = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const perfil = await usuarioService.getPerfil();
        setUsuario({
          usuarioId: perfil.usuarioId,
          nome: perfil.nome,
          nomeUsuario: perfil.nomeUsuario,
          email: perfil.email,
        });
      } catch (error) {
        logout();
      }
    }

    setIsLoading(false);
  };

  const login = async (email: string, senha: string) => {
    try {
      const response: LoginResponse = await usuarioService.login({
        email,
        senha,
      });

      localStorage.setItem('token', response.token);

      setUsuario({
        usuarioId: response.usuarioId,
        nome: response.nome,
        nomeUsuario: response.nomeUsuario,
        email: response.email,
      });
    } catch (error) {
      throw error;
    }
  };

  const registrar = async (dados: any) => {
    try {
      const response: LoginResponse = await usuarioService.registrar(dados);

      // Auto-login após registro
      localStorage.setItem('token', response.token);
      setUsuario({
        usuarioId: response.usuarioId,
        nome: response.nome,
        nomeUsuario: response.nomeUsuario,
        email: response.email,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  const value = {
    usuario,
    isAuthenticated: !!usuario,
    isLoading,
    login,
    registrar,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
