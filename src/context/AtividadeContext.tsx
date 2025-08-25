'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { atividadeService } from '../services';
import { Atividade, AtividadeContextType } from '../types/atividade';

const AtividadeContext = createContext<AtividadeContextType | undefined>(
  undefined
);

export function AtividadeProvider({ children }: { children: ReactNode }) {
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [loading, setLoading] = useState(false);

  const feedAtividades = async (quantidade: number) => {
    setLoading(true);
    try {
      console.log('📱 Carregando feed de atividades...');
      const atividadesApi =
        await atividadeService.getFeedAtividades(quantidade);

      const atividadesConvertidas = atividadesApi.map((atividade) =>
        atividadeService.convertAtividadeApi(atividade)
      );

      console.log(
        '✅ Feed carregado:',
        atividadesConvertidas.length,
        'atividades'
      );
      setAtividades(atividadesConvertidas);
    } catch (error) {
      console.error('❌ Erro ao carregar feed de atividades:', error);
    } finally {
      setLoading(false);
    }
  };

  const atividadesUsuario = async (usuarioId: string) => {
    setLoading(true);
    try {
      console.log('👤 Carregando atividades do usuário:', usuarioId);
      const atividadesApi =
        await atividadeService.getAtividadesUsuario(usuarioId);

      const atividadesConvertidas = atividadesApi.map((atividade) =>
        atividadeService.convertAtividadeApi(atividade)
      );

      console.log(
        '✅ Atividades do usuário carregadas:',
        atividadesConvertidas.length
      );
      setAtividades(atividadesConvertidas);
    } catch (error) {
      console.error('❌ Erro ao carregar atividades do usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const limparAtividades = () => {
    setAtividades([]);
  };

  const value = {
    atividades,
    loading,
    feedAtividades,
    atividadesUsuario,
    limparAtividades,
  };

  return (
    <AtividadeContext.Provider value={value}>
      {children}
    </AtividadeContext.Provider>
  );
}

export function useAtividade() {
  const context = useContext(AtividadeContext);
  if (context === undefined) {
    throw new Error('useAtividade must be used within an AtividadeProvider');
  }
  return context;
}
