import { ApiService } from './api';
import { Ator, AtorResumo, CriarAtorRequest, EditarAtorRequest, PaginacaoResponse } from '../types/ator';

export class AtorService extends ApiService {
  // GET /api/ator/{id}
  async getAtorPorId(id: string): Promise<Ator> {
    return this.makeRequest(`/ator/${id}`);
  }

  // GET /api/ator/nome/{nome}
  async getAtorPorNome(nome: string): Promise<Ator> {
    return this.makeRequest(`/ator/nome/${encodeURIComponent(nome)}`);
  }

  // GET /api/ator?pagina=1&tamanhoPagina=20&completo=true
  async getAtores(
    pagina: number = 1,
    tamanhoPagina: number = 20,
    completo: boolean = true
  ): Promise<PaginacaoResponse<Ator | AtorResumo>> {
    const params = new URLSearchParams({
      pagina: pagina.toString(),
      tamanhoPagina: tamanhoPagina.toString(),
      completo: completo.toString(),
    });
    
    return this.makeRequest(`/ator?${params.toString()}`);
  }

  // POST /api/ator
  async criarAtor(data: CriarAtorRequest): Promise<void> {
    return this.makeRequest('/ator', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT /api/ator/{id}
  async editarAtor(id: string, data: EditarAtorRequest): Promise<void> {
    return this.makeRequest(`/ator/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE /api/ator/{id}
  async excluirAtor(id: string): Promise<void> {
    return this.makeRequest(`/ator/${id}`, {
      method: 'DELETE',
    });
  }
}

export const atorService = new AtorService();