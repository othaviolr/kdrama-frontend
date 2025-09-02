'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { usuarioService } from '../services';
import {
  Usuario,
  LoginResponse,
  AuthContextType,
  UsuarioRegistro,
  PerfilApi,
} from '../types/user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    verificarToken();
  }, []);

  const verificarToken = async () => {
    const token = localStorage.getItem('token');
    const savedUsuarioId = localStorage.getItem('usuarioId');

    if (token && savedUsuarioId) {
      try {
        console.log('🔍 Verificando token existente...');
        const perfilApi: PerfilApi = await usuarioService.getPerfil();

        const usuarioData: Usuario = {
          usuarioId: savedUsuarioId,
          nome: perfilApi.nome,
          nomeUsuario: perfilApi.nomeUsuario,
          email: perfilApi.email,
          fotoUrl: perfilApi.fotoUrl ?? null,
        };

        console.log(
          '✅ Usuário autenticado:',
          usuarioData.nomeUsuario,
          'ID:',
          usuarioData.usuarioId
        );
        setUsuario(usuarioData);
      } catch (error) {
        console.error('❌ Token inválido, removendo...');
        logout();
      }
    } else if (token && !savedUsuarioId) {
      console.log('⚠️ Token sem usuarioId, limpando...');
      logout();
    }

    setIsLoading(false);
  };

  const login = async (email: string, senha: string) => {
    console.log('🚀 Iniciando login...');

    try {
      const response: LoginResponse & { fotoUrl?: string | null } =
        await usuarioService.login({
          email,
          senha,
        });

      console.log('✅ Login realizado com sucesso');

      localStorage.setItem('token', response.token);
      localStorage.setItem('usuarioId', response.usuarioId);

      setUsuario({
        usuarioId: response.usuarioId,
        nome: response.nome,
        nomeUsuario: response.nomeUsuario,
        email: response.email,
        fotoUrl: response.fotoUrl ?? null,
      });

      console.log('🔄 Redirecionando para home...');
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw error;
    }
  };

  const registrar = async (dados: UsuarioRegistro) => {
    console.log('📝 Iniciando registro...');

    try {
      const response: LoginResponse & { fotoUrl?: string | null } =
        await usuarioService.registrar(dados);

      console.log('✅ Registro realizado com sucesso');

      localStorage.setItem('token', response.token);
      localStorage.setItem('usuarioId', response.usuarioId);

      setUsuario({
        usuarioId: response.usuarioId,
        nome: response.nome,
        nomeUsuario: response.nomeUsuario,
        email: response.email,
        fotoUrl: response.fotoUrl ?? null,
      });

      console.log('🔄 Redirecionando para home...');
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('👋 Fazendo logout...');
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    setUsuario(null);

    window.location.href = '/login';
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
    throw new Error('useAuth must be usado dentro de AuthProvider');
  }
  return context;
}
