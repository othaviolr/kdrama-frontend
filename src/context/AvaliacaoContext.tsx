'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { avaliacaoService } from '../services';
import {
  Avaliacao,
  AvaliacaoCreate,
  AvaliacaoUpdate,
  AvaliacaoContextType,
} from '../types/avaliacao';

const AvaliacaoContext = createContext<AvaliacaoContextType | undefined>(
  undefined
);

export function AvaliacaoProvider({ children }: { children: ReactNode }) {
  const [minhaAvaliacao, setMinhaAvaliacao] = useState<Avaliacao | null>(null);
  const [minhasAvaliacoes, setMinhasAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAvaliacoes, setLoadingAvaliacoes] = useState(false);

  const criarAvaliacao = async (data: AvaliacaoCreate) => {
    setLoading(true);
    try {
      console.log('⭐ Criando avaliação para temporada:', data.temporadaId);
      await avaliacaoService.criarAvaliacao(data);

      await obterAvaliacao(data.temporadaId);

      console.log('✅ Avaliação criada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao criar avaliação:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const atualizarAvaliacao = async (data: AvaliacaoUpdate) => {
    setLoading(true);
    try {
      console.log('📝 Atualizando avaliação para temporada:', data.temporadaId);
      await avaliacaoService.updateAvaliacao(data);

      await obterAvaliacao(data.temporadaId);

      console.log('✅ Avaliação atualizada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao atualizar avaliação:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const obterAvaliacao = async (temporadaId: string) => {
    setLoading(true);
    try {
      console.log('🔍 Buscando avaliação para temporada:', temporadaId);
      const avaliacaoApi = await avaliacaoService.getAvaliacao(temporadaId);

      const avaliacaoConvertida =
        avaliacaoService.convertAvaliacaoApi(avaliacaoApi);

      console.log('✅ Avaliação encontrada:', avaliacaoConvertida);
      setMinhaAvaliacao(avaliacaoConvertida);
    } catch (error) {
      console.error('❌ Erro ao buscar avaliação (pode não existir):', error);
      setMinhaAvaliacao(null);
    } finally {
      setLoading(false);
    }
  };

  const carregarMinhasAvaliacoes = async () => {
    setLoadingAvaliacoes(true);
    try {
      console.log('📋 Carregando minhas avaliações...');
      const avaliacoesApi = await avaliacaoService.getMinhasAvaliacoes();

      const avaliacoesConvertidas = avaliacoesApi.map((avaliacao) =>
        avaliacaoService.convertAvaliacaoApi(avaliacao)
      );

      console.log(
        '✅ Minhas avaliações carregadas:',
        avaliacoesConvertidas.length
      );
      setMinhasAvaliacoes(avaliacoesConvertidas);
    } catch (error) {
      console.error('❌ Erro ao carregar minhas avaliações:', error);
    } finally {
      setLoadingAvaliacoes(false);
    }
  };

  const deletarAvaliacao = async (temporadaId: string) => {
    setLoading(true);
    try {
      console.log('🗑️ Deletando avaliação da temporada:', temporadaId);
      await avaliacaoService.deleteAvaliacao(temporadaId);

      setMinhaAvaliacao(null);

      // Remove da lista de minhas avaliações também
      setMinhasAvaliacoes((prev) =>
        prev.filter((avaliacao) => avaliacao.temporadaId !== temporadaId)
      );

      console.log('✅ Avaliação deletada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao deletar avaliação:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const limparAvaliacao = () => {
    setMinhaAvaliacao(null);
  };

  const value = {
    minhaAvaliacao,
    minhasAvaliacoes,
    loading,
    loadingAvaliacoes,
    criarAvaliacao,
    atualizarAvaliacao,
    obterAvaliacao,
    carregarMinhasAvaliacoes,
    deletarAvaliacao,
    limparAvaliacao,
  };

  return (
    <AvaliacaoContext.Provider value={value}>
      {children}
    </AvaliacaoContext.Provider>
  );
}

export function useAvaliacao() {
  const context = useContext(AvaliacaoContext);
  if (context === undefined) {
    throw new Error('useAvaliacao must be used within an AvaliacaoProvider');
  }
  return context;
}
