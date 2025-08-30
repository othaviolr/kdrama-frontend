import { ApiService } from './api';
import {
  ListaApi,
  ListaCreateApi,
  Lista,
  ListaCreate,
  ListaUpdate,
  AdicionarDoramaLista,
  RemoverDoramaLista,
} from '../types/lista';

export class ListaService extends ApiService {
  async getListasPublicas(): Promise<ListaApi[]> {
    return this.makeRequest('/listas-prateleira/publicas');
  }

  async getMinhasListas(): Promise<ListaApi[]> {
    return this.makeRequest('/listas-prateleira/minhas');
  }

  async getLista(listaId: string): Promise<ListaApi> {
    return this.makeRequest(`/listas-prateleira/${listaId}`);
  }

  async criarLista(data: ListaCreate): Promise<void> {
    const apiData: ListaCreateApi = {
      nome: data.nome,
      descricao: data.descricao,
      imagemCapaUrl: data.imagemCapaUrl,
      privacidade: data.publica ? 1 : 0,
    };

    return this.makeRequest('/listas-prateleira', {
      method: 'POST',
      body: JSON.stringify(apiData),
    });
  }

  async updateLista(listaId: string, data: ListaUpdate): Promise<void> {
    const apiData: Partial<ListaCreateApi> = {};

    if (data.nome !== undefined) apiData.nome = data.nome;
    if (data.descricao !== undefined) apiData.descricao = data.descricao;
    if (data.imagemCapaUrl !== undefined)
      apiData.imagemCapaUrl = data.imagemCapaUrl;
    if (data.publica !== undefined) apiData.privacidade = data.publica ? 1 : 0;

    return this.makeRequest(`/listas-prateleira/${listaId}`, {
      method: 'PUT',
      body: JSON.stringify(apiData),
    });
  }

  async deleteLista(listaId: string): Promise<void> {
    return this.makeRequest(`/listas-prateleira/${listaId}`, {
      method: 'DELETE',
    });
  }

  async getListasUsuario(usuarioId: string): Promise<any[]> {
    return this.makeRequest(`/listas-prateleira/usuario/${usuarioId}`);
  }

  async compartilharLista(listaId: string): Promise<{ shareToken: string }> {
    return this.makeRequest(`/listas-prateleira/${listaId}/compartilhar`, {
      method: 'POST',
    });
  }

  async adicionarDoramaLista(data: AdicionarDoramaLista): Promise<void> {
    return this.makeRequest('/dorama-lista', {
      method: 'POST',
      body: JSON.stringify({
        listaPrateleiraId: data.listaId,
        doramaId: data.doramaId,
      }),
    });
  }

  async removerDoramaLista(data: RemoverDoramaLista): Promise<void> {
    return this.makeRequest('/dorama-lista', {
      method: 'DELETE',
      body: JSON.stringify({
        listaPrateleiraId: data.listaId,
        doramaId: data.doramaId,
      }),
    });
  }

  convertListaApi(lista: ListaApi): Lista {
    return {
      id: lista.id,
      nome: lista.nome,
      descricao: lista.descricao,
      imagemCapaUrl: lista.imagemCapaUrl,
      publica: lista.privacidade === 1,
      shareToken: lista.shareToken || undefined,
      usuarioId: lista.usuarioId,
      dataCriacao: new Date(lista.dataCriacao),
      doramas: lista.doramas.map((dorama) => ({
        doramaId: dorama.doramaId,
        dataAdicao: new Date(dorama.dataAdicao),
      })),
    };
  }
}

export const listaService = new ListaService();
