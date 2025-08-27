'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { listaService } from '../services';
import {
  Lista,
  ListaCreate,
  ListaUpdate,
  AdicionarDoramaLista,
  RemoverDoramaLista,
  ListaContextType,
} from '../types/lista';

const ListaContext = createContext<ListaContextType | undefined>(undefined);

export function ListaProvider({ children }: { children: ReactNode }) {
  const [listas, setListas] = useState<Lista[]>([]);
  const [minhasListas, setMinhasListas] = useState<Lista[]>([]);
  const [listaAtual, setListaAtual] = useState<Lista | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingLista, setLoadingLista] = useState(false);

  const carregarListasPublicas = async () => {
    if (listas.length > 0) return;

    setLoading(true);
    try {
      console.log('📋 Carregando listas públicas...');
      const listasApi = await listaService.getListasPublicas();

      const listasConvertidas = listasApi.map((lista) =>
        listaService.convertListaApi(lista)
      );

      console.log('✅ Listas públicas carregadas:', listasConvertidas.length);
      setListas(listasConvertidas);
    } catch (error) {
      console.error('❌ Erro ao carregar listas públicas:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarMinhasListas = async () => {
    setLoading(true);
    try {
      console.log('📋 Carregando minhas listas...');
      const listasApi = await listaService.getMinhasListas();

      const listasConvertidas = listasApi.map((lista) =>
        listaService.convertListaApi(lista)
      );

      console.log('✅ Minhas listas carregadas:', listasConvertidas.length);
      setMinhasListas(listasConvertidas);
    } catch (error) {
      console.error('❌ Erro ao carregar minhas listas:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarLista = async (listaId: string) => {
    setLoadingLista(true);
    try {
      console.log('📋 Carregando lista:', listaId);
      const listaApi = await listaService.getLista(listaId);
      const listaConvertida = listaService.convertListaApi(listaApi);

      console.log('✅ Lista carregada:', listaConvertida.nome);
      console.log('✅ Doramas na lista:', listaConvertida.doramas.length);
      setListaAtual(listaConvertida);

      setListas((prev) => {
        const filtered = prev.filter((l) => l.id !== listaId);
        return [...filtered, listaConvertida];
      });
    } catch (error) {
      console.error('❌ Erro ao carregar lista:', error);
      setListaAtual(null);
    } finally {
      setLoadingLista(false);
    }
  };

  const criarLista = async (data: ListaCreate) => {
    setLoading(true);
    try {
      console.log('➕ Criando nova lista:', data.nome);
      await listaService.criarLista(data);

      await carregarMinhasListas();

      console.log('✅ Lista criada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao criar lista:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const atualizarLista = async (listaId: string, data: ListaUpdate) => {
    setLoadingLista(true);
    try {
      console.log('📝 Atualizando lista:', listaId);
      await listaService.updateLista(listaId, data);

      await carregarLista(listaId);
      await carregarMinhasListas();

      console.log('✅ Lista atualizada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao atualizar lista:', error);
      throw error;
    } finally {
      setLoadingLista(false);
    }
  };

  const deletarLista = async (listaId: string) => {
    setLoading(true);
    try {
      console.log('🗑️ Deletando lista:', listaId);
      await listaService.deleteLista(listaId);

      setListas((prev) => prev.filter((l) => l.id !== listaId));
      setMinhasListas((prev) => prev.filter((l) => l.id !== listaId));

      if (listaAtual?.id === listaId) {
        setListaAtual(null);
      }

      console.log('✅ Lista deletada com sucesso');
    } catch (error) {
      console.error('❌ Erro ao deletar lista:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const compartilharLista = async (listaId: string) => {
    try {
      console.log('🔗 Gerando link de compartilhamento...');
      const response = await listaService.compartilharLista(listaId);

      setMinhasListas((prev) =>
        prev.map((lista) =>
          lista.id === listaId
            ? { ...lista, shareToken: response.shareToken }
            : lista
        )
      );

      console.log('✅ Link de compartilhamento gerado');
      return response.shareToken;
    } catch (error) {
      console.error('❌ Erro ao gerar link de compartilhamento:', error);
      throw error;
    }
  };

  const adicionarDoramaLista = async (data: AdicionarDoramaLista) => {
    try {
      console.log('➕ Adicionando dorama à lista:', data.listaId);
      await listaService.adicionarDoramaLista(data);

      await carregarLista(data.listaId);

      console.log('✅ Dorama adicionado à lista com sucesso');
    } catch (error) {
      console.error('❌ Erro ao adicionar dorama à lista:', error);
      throw error;
    }
  };

  const removerDoramaLista = async (data: RemoverDoramaLista) => {
    try {
      console.log('➖ Removendo dorama da lista:', data.listaId);
      await listaService.removerDoramaLista(data);

      await carregarLista(data.listaId);

      console.log('✅ Dorama removido da lista com sucesso');
    } catch (error) {
      console.error('❌ Erro ao remover dorama da lista:', error);
      throw error;
    }
  };

  const value = {
    listas,
    minhasListas,
    listaAtual,
    loading,
    loadingLista,
    carregarListasPublicas,
    carregarMinhasListas,
    carregarLista,
    criarLista,
    atualizarLista,
    deletarLista,
    compartilharLista,
    adicionarDoramaLista,
    removerDoramaLista,
  };

  return (
    <ListaContext.Provider value={value}>{children}</ListaContext.Provider>
  );
}

export function useLista() {
  const context = useContext(ListaContext);
  if (context === undefined) {
    throw new Error('useLista must be used within a ListaProvider');
  }
  return context;
}
