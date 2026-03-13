'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from 'react';
import { doramaService } from '../services';
import { DoramaCompleto, DoramaContextType } from '../types/dorama';

const DoramaContext = createContext<DoramaContextType | undefined>(undefined);

export function DoramaProvider({ children }: { children: ReactNode }) {
  const [doramas, setDoramas] = useState<DoramaCompleto[]>([]);
  const [doramaAtual, setDoramaAtual] = useState<DoramaCompleto | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDorama, setLoadingDorama] = useState(false);

  // Flags de cache — evitam refetch desnecessário entre navegações
  const carregado = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-carrega ao montar o provider (uma única vez por sessão)
  useEffect(() => {
    carregarDoramas();
  }, []);

  const carregarDoramas = async () => {
    // Já carregou com sucesso — não busca de novo
    if (carregado.current) return;

    // Cancela request anterior se ainda estiver pendente
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    try {
      console.log('🎬 Carregando doramas...');
      const lista = await doramaService.getDoramas(controller.signal);
      console.log('✅ Doramas carregados:', lista.length);
      setDoramas(lista);
      carregado.current = true;
    } catch (error: any) {
      if (error?.name === 'AbortError') return; // requisição cancelada — ignora
      console.error('❌ Erro ao carregar doramas:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarDorama = async (id: string) => {
    // Tenta servir do cache da lista já carregada
    const doramaExistente = doramas.find((d) => d.doramaId === id);
    if (doramaExistente) {
      console.log('📋 Dorama encontrado no cache:', doramaExistente.titulo);
      setDoramaAtual(doramaExistente);
      return;
    }

    setLoadingDorama(true);
    try {
      console.log('🎬 Carregando dorama:', id);
      const dorama = await doramaService.getDoramaCompleto(id);
      console.log('✅ Dorama carregado:', dorama.titulo);
      setDoramaAtual(dorama);

      // Adiciona ao cache local para navegações futuras
      setDoramas((prev) => {
        const existe = prev.find((d) => d.doramaId === id);
        return existe ? prev : [...prev, dorama];
      });
    } catch (error) {
      console.error('❌ Erro ao carregar dorama:', error);
      setDoramaAtual(null);
    } finally {
      setLoadingDorama(false);
    }
  };

  const limparDoramaAtual = () => {
    setDoramaAtual(null);
  };

  const buscarDoramaPorId = (id: string) => {
    return doramas.find((d) => d.doramaId === id);
  };

  const value = {
    doramas,
    doramaAtual,
    loading,
    loadingDorama,
    carregarDoramas,
    carregarDorama,
    limparDoramaAtual,
    buscarDoramaPorId,
  };

  return (
    <DoramaContext.Provider value={value}>{children}</DoramaContext.Provider>
  );
}

export function useDorama() {
  const context = useContext(DoramaContext);
  if (context === undefined) {
    throw new Error('useDorama must be used within a DoramaProvider');
  }
  return context;
}
