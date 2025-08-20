import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { usuarioService } from '@/src/services';

interface User {
  id: string;
  nomeUsuario: string;
  email: string;
  // adicione outros campos do seu usuário
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  registrar: (nomeUsuario: string, email: string, senha: string) => Promise<boolean>;
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      const userData = await usuarioService.getPerfil();
      setUser(userData);
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await usuarioService.login({ email, senha });
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.usuario);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const registrar = async (nomeUsuario: string, email: string, senha: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await usuarioService.registrar({ nomeUsuario, email, senha });
      
      if (response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        setUser(response.usuario);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no registro:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        registrar,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};