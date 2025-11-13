'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { atorService } from '../services/atorService';
import { Ator, AtorContextType, CriarAtorRequest, EditarAtorRequest } from '../types/ator';

const AtorContext = createContext<AtorContextType | undefined>(undefined);

export function AtorProvider({ children }: { children: ReactNode }) {
  const [atores, setAtores] = useState<Ator[]>([]);
  const [atorAtual, setAtorAtual] = useState<Ator | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingAtor, setLoadingAtor] = useState(false);

  // Carregar lista de atores com paginação
  const carregarAtores = async (
    pagina: number = 1,
    tamanhoPagina: number = 20,
    completo: boolean = true
  ) => {
    setLoading(true);
    try {
      console.log('🎭 Carregando atores...');
      const response = await atorService.getAtores(pagina, tamanhoPagina, completo);
      
      console.log('📦 Response completa:', response);
      
      // Agora a API retorna "itens" ao invés de "items"
      if (response && Array.isArray(response.itens)) {
        console.log('✅ Atores carregados:', response.itens.length);
        setAtores(response.itens as Ator[]);
      } else if (Array.isArray(response)) {
        // Caso a API retorne array direto (sem paginação)
        console.log('✅ Atores carregados (array direto):', response.length);
        setAtores(response as Ator[]);
      } else {
        console.warn('⚠️ Formato de resposta inesperado:', response);
        setAtores([]);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar atores:', error);
      setAtores([]);
    } finally {
      setLoading(false);
    }
  };

  // Carregar ator específico por ID
  const carregarAtor = async (id: string) => {
    // Verifica se já está no cache
    const atorExistente = atores.find((a) => a.id === id);
    if (atorExistente) {
      console.log('📋 Ator encontrado no cache:', atorExistente.nome);
      setAtorAtual(atorExistente);
      return;
    }

    setLoadingAtor(true);
    try {
      console.log('🎭 Carregando ator:', id);
      const ator = await atorService.getAtorPorId(id);
      console.log('✅ Ator carregado:', ator.nome);
      setAtorAtual(ator);

      // Adiciona ao cache se ainda não existe
      setAtores((prev) => {
        const existe = prev.find((a) => a.id === id);
        if (!existe) {
          return [...prev, ator];
        }
        return prev;
      });
    } catch (error) {
      console.error('❌ Erro ao carregar ator:', error);
      setAtorAtual(null);
    } finally {
      setLoadingAtor(false);
    }
  };

  // Carregar ator por nome
  const carregarAtorPorNome = async (nome: string) => {
    setLoadingAtor(true);
    try {
      console.log('🎭 Buscando ator por nome:', nome);
      const ator = await atorService.getAtorPorNome(nome);
      console.log('✅ Ator encontrado:', ator.nome);
      setAtorAtual(ator);

      // Adiciona ao cache
      setAtores((prev) => {
        const existe = prev.find((a) => a.id === ator.id);
        if (!existe) {
          return [...prev, ator];
        }
        return prev;
      });
    } catch (error) {
      console.error('❌ Erro ao buscar ator por nome:', error);
      setAtorAtual(null);
    } finally {
      setLoadingAtor(false);
    }
  };

  // Criar novo ator
  const criarAtor = async (data: CriarAtorRequest) => {
    try {
      console.log('➕ Criando ator:', data.nome);
      await atorService.criarAtor(data);
      console.log('✅ Ator criado com sucesso');
      
      // Recarrega a lista
      await carregarAtores();
    } catch (error) {
      console.error('❌ Erro ao criar ator:', error);
      throw error;
    }
  };

  // Editar ator
  const editarAtor = async (id: string, data: EditarAtorRequest) => {
    try {
      console.log('✏️ Editando ator:', id);
      await atorService.editarAtor(id, data);
      console.log('✅ Ator editado com sucesso');

      // Atualiza no cache
      setAtores((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...data } : a))
      );

      // Se é o ator atual, atualiza também
      if (atorAtual?.id === id) {
        setAtorAtual({ ...atorAtual, ...data });
      }
    } catch (error) {
      console.error('❌ Erro ao editar ator:', error);
      throw error;
    }
  };

  // Excluir ator
  const excluirAtor = async (id: string) => {
    try {
      console.log('🗑️ Excluindo ator:', id);
      await atorService.excluirAtor(id);
      console.log('✅ Ator excluído com sucesso');

      // Remove do cache
      setAtores((prev) => prev.filter((a) => a.id !== id));

      // Se era o ator atual, limpa
      if (atorAtual?.id === id) {
        setAtorAtual(null);
      }
    } catch (error) {
      console.error('❌ Erro ao excluir ator:', error);
      throw error;
    }
  };

  const limparAtorAtual = () => {
    setAtorAtual(null);
  };

  const buscarAtorPorId = (id: string) => {
    return atores.find((a) => a.id === id);
  };

  const value = {
    atores,
    atorAtual,
    loading,
    loadingAtor,
    carregarAtores,
    carregarAtor,
    carregarAtorPorNome,
    criarAtor,
    editarAtor,
    excluirAtor,
    limparAtorAtual,
    buscarAtorPorId,
  };

  return <AtorContext.Provider value={value}>{children}</AtorContext.Provider>;
}

export function useAtor() {
  const context = useContext(AtorContext);
  if (context === undefined) {
    throw new Error('useAtor must be used within a AtorProvider');
  }
  return context;
}