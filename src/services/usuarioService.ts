import { ApiService } from './api';

interface Usuario {
  usuarioId: string;
  nome: string;
  nomeUsuario: string;
  email: string;
}

interface LoginResponse {
  usuarioId: string;
  nome: string;
  nomeUsuario: string;
  email: string;
  token: string;
}

export class UsuarioService extends ApiService {
  async registrar(data: {
    nomeUsuario: string;
    email: string;
    senha: string;
  }): Promise<LoginResponse> {
    return this.makeRequest('/usuarios/registrar', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; senha: string }): Promise<LoginResponse> {
    return this.makeRequest('/usuarios/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPerfil(): Promise<Usuario> {
    return this.makeRequest('/usuarios/perfil');
  }

  async updatePerfil(data: any): Promise<void> {
    return this.makeRequest('/usuarios/perfil', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePerfil(): Promise<void> {
    return this.makeRequest('/usuarios/perfil', {
      method: 'DELETE',
    });
  }

  async getUsuario(nomeUsuario: string): Promise<Usuario> {
    return this.makeRequest(`/usuarios/${nomeUsuario}`);
  }

  async seguirUsuario(id: string): Promise<void> {
    return this.makeRequest(`/usuarios/${id}/seguir`, {
      method: 'POST',
    });
  }

  async deixarDeSeguir(id: string): Promise<void> {
    return this.makeRequest(`/usuarios/${id}/deixar-de-seguir`, {
      method: 'POST',
    });
  }
}

export const usuarioService = new UsuarioService();
