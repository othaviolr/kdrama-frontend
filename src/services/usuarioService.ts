import { ApiService } from './api';
import {
  PerfilApi,
  Usuario,
  LoginResponse,
  UsuarioRegistro,
  UsuarioLogin,
} from '../types/user';

export class UsuarioService extends ApiService {
  async registrar(data: UsuarioRegistro): Promise<LoginResponse> {
    return this.makeRequest('/usuarios/registrar', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: UsuarioLogin): Promise<LoginResponse> {
    return this.makeRequest('/usuarios/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPerfil(): Promise<PerfilApi> {
    return this.makeRequest('/usuarios/perfil');
  }

  async updatePerfil(
    data: Pick<PerfilApi, 'nome' | 'nomeUsuario' | 'bio' | 'fotoUrl'>
  ): Promise<PerfilApi> {
    return await this.makeRequest<PerfilApi>('/usuarios/perfil', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePerfil(): Promise<void> {
    return this.makeRequest('/usuarios/perfil', {
      method: 'DELETE',
    });
  }

  async getUsuario(nomeUsuario: string): Promise<
    PerfilApi & {
      totalSeguidores: number;
      totalSeguindo: number;
      segueUsuarioAtual: boolean;
    }
  > {
    return this.makeRequest(`/usuarios/${nomeUsuario}`);
  }

  async seguirUsuario(id: string): Promise<void> {
    return this.makeRequest(`/usuarios/${id}/seguir`, { method: 'POST' });
  }

  async deixarDeSeguir(id: string): Promise<void> {
    return this.makeRequest(`/usuarios/${id}/deixar-de-seguir`, {
      method: 'POST',
    });
  }

  convertPerfilApi(perfil: PerfilApi): Omit<Usuario, 'usuarioId'> {
    return {
      nome: perfil.nome,
      nomeUsuario: perfil.nomeUsuario,
      email: perfil.email,
    };
  }
}

export const usuarioService = new UsuarioService();
