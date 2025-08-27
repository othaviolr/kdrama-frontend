'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { doramaService } from '../services';
import { DoramaCompleto, DoramaContextType } from '../types/dorama';

const DoramaContext = createContext<DoramaContextType | undefined>(undefined);

export function DoramaProvider({ children }: { children: ReactNode }) {
  const [doramas, setDoramas] = useState<DoramaCompleto[]>([]);
  const [doramaAtual, setDoramaAtual] = useState<DoramaCompleto | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDorama, setLoadingDorama] = useState(false);

  // Carregar lista de doramas
  const carregarDoramas = async () => {
    //if (doramas.length > 0) return; // Já carregou, não carrega de novo

    setLoading(true);
    try {
      console.log('🎬 Carregando doramas...');
      const lista = await doramaService.getDoramas();
      console.log('✅ Doramas carregados:', lista.length);
      setDoramas(lista);
    } catch (error) {
      console.error('❌ Erro ao carregar doramas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar dorama específico
  const carregarDorama = async (id: string) => {
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

      setDoramas((prev) => {
        const existe = prev.find((d) => d.doramaId === id);
        if (!existe) {
          return [...prev, dorama];
        }
        return prev;
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
