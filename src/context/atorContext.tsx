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
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalItens, setTotalItens] = useState(0);
  const [temProximaPagina, setTemProximaPagina] = useState(false);

  // Carregar lista de atores com paginação
  const carregarAtores = async (
    pagina: number = 1,
    tamanhoPagina: number = 20,
    completo: boolean = true,
    acumular: boolean = false // Novo parâmetro para acumular resultados
  ) => {
    setLoading(true);
    try {
      console.log('🎭 Carregando atores (página ' + pagina + ')...');
      const response = await atorService.getAtores(pagina, tamanhoPagina, completo);
      
      console.log('📦 Response completa:', response);
      
      if (response && Array.isArray(response.itens)) {
        console.log('✅ Atores carregados:', response.itens.length);
        
        // Se acumular=true, adiciona aos atores existentes, senão substitui
        if (acumular) {
          setAtores((prev) => [...prev, ...(response.itens as Ator[])]);
        } else {
          setAtores(response.itens as Ator[]);
        }
        
        // Atualiza informações de paginação
        setPaginaAtual(response.paginaAtual);
        setTotalPaginas(response.totalPaginas);
        setTotalItens(response.totalItens);
        setTemProximaPagina(response.temProximaPagina);
      } else if (Array.isArray(response)) {
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

  // Carregar próxima página (para scroll infinito)
  const carregarMaisAtores = async () => {
    if (!temProximaPagina || loading) return;
    
    const proximaPagina = paginaAtual + 1;
    await carregarAtores(proximaPagina, 20, true, true); // acumular=true
  };

  // Carregar ator específico por ID
  const carregarAtor = async (id: string) => {
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

  const carregarAtorPorNome = async (nome: string) => {
    setLoadingAtor(true);
    try {
      console.log('🎭 Buscando ator por nome:', nome);
      const ator = await atorService.getAtorPorNome(nome);
      console.log('✅ Ator encontrado:', ator.nome);
      setAtorAtual(ator);

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

  const criarAtor = async (data: CriarAtorRequest) => {
    try {
      console.log('➕ Criando ator:', data.nome);
      await atorService.criarAtor(data);
      console.log('✅ Ator criado com sucesso');
      await carregarAtores();
    } catch (error) {
      console.error('❌ Erro ao criar ator:', error);
      throw error;
    }
  };

  const editarAtor = async (id: string, data: EditarAtorRequest) => {
    try {
      console.log('✏️ Editando ator:', id);
      await atorService.editarAtor(id, data);
      console.log('✅ Ator editado com sucesso');

      setAtores((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...data } : a))
      );

      if (atorAtual?.id === id) {
        setAtorAtual({ ...atorAtual, ...data });
      }
    } catch (error) {
      console.error('❌ Erro ao editar ator:', error);
      throw error;
    }
  };

  const excluirAtor = async (id: string) => {
    try {
      console.log('🗑️ Excluindo ator:', id);
      await atorService.excluirAtor(id);
      console.log('✅ Ator excluído com sucesso');

      setAtores((prev) => prev.filter((a) => a.id !== id));

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
    paginaAtual,
    totalPaginas,
    totalItens,
    temProximaPagina,
    carregarAtores,
    carregarMaisAtores, // Nova função
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