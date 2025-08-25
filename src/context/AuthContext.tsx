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

    if (token) {
      try {
        console.log('🔍 Verificando token existente...');
        const perfilApi: PerfilApi = await usuarioService.getPerfil();

        // Converter PerfilApi para Usuario (sem usuarioId)
        const usuarioData: Usuario = {
          nome: perfilApi.nome,
          nomeUsuario: perfilApi.nomeUsuario,
          email: perfilApi.email,
          fotoUrl: perfilApi.fotoUrl ?? null,
        };

        console.log('✅ Usuário autenticado:', usuarioData.nomeUsuario);
        setUsuario(usuarioData);
      } catch (error) {
        console.error('❌ Token inválido, removendo...');
        logout();
      }
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

      setUsuario({
        nome: response.nome,
        nomeUsuario: response.nomeUsuario,
        email: response.email,
        fotoUrl: response.fotoUrl ?? null,
      });
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
      setUsuario({
        nome: response.nome,
        nomeUsuario: response.nomeUsuario,
        email: response.email,
        fotoUrl: response.fotoUrl ?? null,
      });
    } catch (error) {
      console.error('❌ Erro no registro:', error);
      throw error;
    }
  };

  const logout = () => {
    console.log('👋 Fazendo logout...');
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
    throw new Error('useAuth must be usado dentro de AuthProvider');
  }
  return context;
}
