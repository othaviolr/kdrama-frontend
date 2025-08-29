import { ApiService } from './api';
import { ItemFeedApi, ItemFeed, FeedPaginado } from '../types/feed';

export class FeedService extends ApiService {
  private readonly DEFAULT_PAGE_SIZE = 20;

  async getFeed(
    page: number = 1,
    pageSize: number = this.DEFAULT_PAGE_SIZE
  ): Promise<FeedPaginado> {
    try {
      console.log(`Buscando feed - página ${page}, tamanho ${pageSize}`);

      const quantidade = page * pageSize;
      const response = await this.makeRequest<ItemFeedApi[]>(
        `/atividades/feed/${quantidade}`
      );

      const items = response.map(this.convertItemFeedApi);

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const itemsPagina = items.slice(startIndex, endIndex);

      const hasMore = items.length > page * pageSize;

      console.log(
        `Feed carregado - página ${page}: ${itemsPagina.length} items, hasMore: ${hasMore}`
      );

      return {
        items: itemsPagina,
        hasMore,
        nextPage: hasMore ? page + 1 : undefined,
      };
    } catch (error) {
      console.error('Erro ao buscar feed:', error);
      return {
        items: [],
        hasMore: false,
      };
    }
  }

  async getFeedCompleto(quantidade: number = 50): Promise<ItemFeed[]> {
    try {
      console.log(`Buscando feed completo - ${quantidade} items`);

      const response = await this.makeRequest<ItemFeedApi[]>(
        `/atividades/feed/${quantidade}`
      );
      const items = response.map(this.convertItemFeedApi);

      console.log(`Feed completo carregado: ${items.length} items`);
      return items;
    } catch (error) {
      console.error('Erro ao buscar feed completo:', error);
      return [];
    }
  }

  private convertItemFeedApi(item: ItemFeedApi): ItemFeed {
    const id = `${item.usuarioId}-${item.tipoAtividade}-${item.criadoEm}`;

    return {
      id,
      usuarioId: item.usuarioId,
      usuarioNome: item.usuarioNome,
      usuarioAvatarUrl: item.usuarioAvatarUrl,
      tipoAtividade: item.tipoAtividade,
      doramaId: item.doramaId || undefined,
      doramaTitulo: item.doramaTitulo || undefined,
      temporadaNumero: item.temporadaNumero || undefined,
      episodioNumero: item.episodioNumero || undefined,
      nota: item.nota || undefined,
      comentario: item.comentario || undefined,
      prateleiraId: item.prateleiraId || undefined,
      prateleiraNome: item.prateleiraNome || undefined,
      criadoEm: new Date(item.criadoEm),
    };
  }
}

export const feedService = new FeedService();
