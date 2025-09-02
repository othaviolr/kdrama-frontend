'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { progressoService } from '../services/progressoService';
import {
  ProgressoTemporada,
  ProgressoContextType,
  AtualizarProgressoRequest,
  AtualizarStatusRequest,
  StatusDoramaEnum,
} from '../types';

const ProgressoContext = createContext<ProgressoContextType | undefined>(
  undefined
);

export function ProgressoProvider({ children }: { children: ReactNode }) {
  const [progressos, setProgressos] = useState<ProgressoTemporada[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarProgressos();
  }, []);

  const carregarProgressos = useCallback(async () => {
    setLoading(true);
    try {
      console.log('📊 Carregando progressos...');
      const lista = await progressoService.getProgressos();
      console.log('✅ Progressos carregados:', lista.length);
      setProgressos(lista);
    } catch (error) {
      console.error('❌ Erro ao carregar progressos:', error);
      console.log('🔄 Continuando com lista vazia...');
      setProgressos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const atualizarProgresso = useCallback(
    async (request: AtualizarProgressoRequest): Promise<ProgressoTemporada> => {
      try {
        console.log('Atualizando progresso:', request);
        await progressoService.atualizarProgresso(request);

        console.log('Progresso salvo, recarregando progressos...');
        await carregarProgressos();

        return {
          id: 'mock',
          usuarioId: 'mock',
          temporadaId: request.temporadaId,
          episodiosAssistidos: request.episodiosAssistidos,
          status: StatusDoramaEnum.Assistindo,
          dataAtualizacao: new Date().toISOString(),
        };
      } catch (error) {
        console.error('Erro ao atualizar progresso:', error);
        throw error;
      }
    },
    [carregarProgressos]
  );

  const atualizarStatus = useCallback(
    async (request: AtualizarStatusRequest): Promise<ProgressoTemporada> => {
      try {
        console.log('Atualizando status:', request);
        await progressoService.atualizarStatus(request);

        console.log('Status salvo, recarregando progressos...');
        await carregarProgressos();

        return {
          id: 'mock',
          usuarioId: 'mock',
          temporadaId: request.temporadaId,
          episodiosAssistidos: 0,
          status: request.status,
          dataAtualizacao: new Date().toISOString(),
        };
      } catch (error) {
        console.error('Erro ao atualizar status:', error);
        throw error;
      }
    },
    [carregarProgressos]
  );

  const removerProgresso = useCallback(async (temporadaId: string) => {
    try {
      console.log('📊 Removendo progresso:', temporadaId);
      await progressoService.removerProgresso(temporadaId);

      setProgressos((prev) =>
        prev.filter((p) => p.temporadaId !== temporadaId)
      );

      console.log('✅ Progresso removido localmente');
    } catch (error) {
      console.error('❌ Erro ao remover progresso:', error);
      throw error;
    }
  }, []);

  const obterProgresso = useCallback(
    (temporadaId: string) => {
      console.log(`🔎 obterProgresso("${temporadaId}"):`);
      console.log(`📋 Array progressos tem ${progressos.length} itens:`);
      progressos.forEach((p, index) => {
        console.log(
          `   [${index}] temporadaId: "${p.temporadaId}" | match: ${p.temporadaId === temporadaId}`
        );
      });

      const progresso = progressos.find((p) => p.temporadaId === temporadaId);
      console.log(`🎯 Resultado final:`, progresso);
      return progresso;
    },
    [progressos]
  );

  const carregarProgressosPorUsuario = useCallback(
    async (usuarioId: string): Promise<ProgressoTemporada[]> => {
      try {
        console.log('📊 Carregando progressos do usuário:', usuarioId);
        const progressos =
          await progressoService.getProgressosPorUsuario(usuarioId);
        console.log('✅ Progressos do usuário carregados:', progressos.length);
        return progressos;
      } catch (error) {
        console.error('❌ Erro ao carregar progressos do usuário:', error);
        return [];
      }
    },
    []
  );

  const value = {
    progressos,
    loading,
    atualizarProgresso,
    atualizarStatus,
    removerProgresso,
    obterProgresso,
    carregarProgressos,
    carregarProgressosPorUsuario,
  };

  return (
    <ProgressoContext.Provider value={value}>
      {children}
    </ProgressoContext.Provider>
  );
}

export function useProgresso() {
  const context = useContext(ProgressoContext);
  if (context === undefined) {
    throw new Error('useProgresso must be used within a ProgressoProvider');
  }
  return context;
}
