'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { feedService } from '../services/feedService';
import { ItemFeed, FeedContextType } from '../types/feed';

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export function FeedProvider({ children }: { children: ReactNode }) {
  const [feed, setFeed] = useState<ItemFeed[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const carregarFeed = useCallback(async (reset: boolean = false) => {
    if (reset) {
      setCurrentPage(1);
      setFeed([]);
      setHasMore(true);
      setError(null);
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Carregando feed inicial...');
      const resultado = await feedService.getFeed(1);

      setFeed(resultado.items);
      setHasMore(resultado.hasMore);
      setCurrentPage(1);

      console.log('Feed inicial carregado:', resultado.items.length, 'items');
    } catch (error) {
      console.error('Erro ao carregar feed:', error);
      setError('Erro ao carregar o feed');
      setFeed([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const carregarMais = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setError(null);

    try {
      const proximaPagina = currentPage + 1;
      console.log('Carregando mais items - página:', proximaPagina);

      const resultado = await feedService.getFeed(proximaPagina);

      setFeed((prev) => [...prev, ...resultado.items]);
      setHasMore(resultado.hasMore);
      setCurrentPage(proximaPagina);

      console.log('Mais items carregados:', resultado.items.length);
    } catch (error) {
      console.error('Erro ao carregar mais items:', error);
      setError('Erro ao carregar mais itens');
    } finally {
      setLoadingMore(false);
    }
  }, [currentPage, loadingMore, hasMore]);

  const adicionarItem = useCallback((novoItem: ItemFeed) => {
    setFeed((prev) => {
      const existe = prev.some((item) => item.id === novoItem.id);
      if (existe) return prev;

      return [novoItem, ...prev];
    });
  }, []);

  const limparFeed = useCallback(() => {
    setFeed([]);
    setCurrentPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  const value = {
    feed,
    loading,
    loadingMore,
    hasMore,
    error,
    carregarFeed,
    carregarMais,
    adicionarItem,
    limparFeed,
  };

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
}

export function useFeed() {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
}
