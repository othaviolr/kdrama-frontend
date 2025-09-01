import { ApiService } from './api';
import {
  PerfilApi,
  Usuario,
  LoginResponse,
  UsuarioRegistro,
  UsuarioLogin,
  UsuarioSeguidor,
  PerfilPublico,
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

  async getUsuario(nomeUsuario: string): Promise<PerfilPublico> {
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

  async getAvaliacoesUsuario(usuarioId: string): Promise<any[]> {
    return this.makeRequest(`/avaliacoes/usuario/${usuarioId}`);
  }

  async getListasUsuario(usuarioId: string): Promise<any[]> {
    return this.makeRequest(`/listas-prateleira/usuario/${usuarioId}`);
  }

  async getMeusSeguidores(): Promise<UsuarioSeguidor[]> {
    return this.makeRequest('/usuarios/seguidores');
  }

  async getMeusSeguindo(): Promise<UsuarioSeguidor[]> {
    return this.makeRequest('/usuarios/seguindo');
  }

  async getSeguidores(usuarioId: string): Promise<UsuarioSeguidor[]> {
    return this.makeRequest(`/usuarios/${usuarioId}/seguidores`);
  }

  async getSeguindo(usuarioId: string): Promise<UsuarioSeguidor[]> {
    return this.makeRequest(`/usuarios/${usuarioId}/seguindo`);
  }

  convertPerfilApi(perfil: PerfilApi): Omit<Usuario, 'usuarioId'> {
    return {
      nome: perfil.nome,
      nomeUsuario: perfil.nomeUsuario,
      email: perfil.email,
    };
  }

  convertUsuarioSeguidor(usuario: UsuarioSeguidor): Partial<Usuario> {
    return {
      usuarioId: usuario.usuarioId,
      nomeUsuario: usuario.nomeUsuario,
      nome: usuario.nome,
      fotoUrl: usuario.fotoPerfilUrl,
    };
  }
}

export const usuarioService = new UsuarioService();
