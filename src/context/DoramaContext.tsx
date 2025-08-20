import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { doramaService } from '../services';

interface Genero {
  id: string;
  nome: string;
}

interface Ator {
  id: string;
  nome: string;
  nomeCompleto: string;
  anoNascimento: number;
  altura: number;
  pais: string;
  biografia: string;
  fotoUrl: string;
  instagram: string;
}

interface Episodio {
  id: string;
  temporadaId: string;
  numero: number;
  titulo: string;
  duracaoMinutos: number;
  tipo: number;
  sinopse: string;
}

interface Temporada {
  episodios: Episodio[];
  id: string;
  nome: string;
  ordem: number;
  doramaId: string;
  dataEstreia: string;
  dataFim: string | null;
}

interface DoramaCompleto {
  doramaId: string;
  titulo: string;
  tituloOriginal: string;
  sinopse: string;
  capaUrl: string;
  anoLancamento: number;
  paisOrigem: string;
  emExibicao: boolean;
  plataforma: number;
  generos: Genero[];
  atores: Ator[];
  temporadas: Temporada[];
}

interface DoramaContextType {
  doramas: DoramaCompleto[];
  doramaAtual: DoramaCompleto | null;
  loading: boolean;
  loadingDorama: boolean;

  carregarDoramas: () => Promise<void>;
  carregarDorama: (id: string) => Promise<void>;
  limparDoramaAtual: () => void;
  buscarDoramaPorId: (id: string) => DoramaCompleto | undefined;
}

const DoramaContext = createContext<DoramaContextType | undefined>(undefined);

export function DoramaProvider({ children }: { children: ReactNode }) {
  const [doramas, setDoramas] = useState<DoramaCompleto[]>([]);
  const [doramaAtual, setDoramaAtual] = useState<DoramaCompleto | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingDorama, setLoadingDorama] = useState(false);

  const carregarDoramas = async () => {
    if (doramas.length > 0) return;

    setLoading(true);
    try {
      const lista = await doramaService.getDoramas();
      setDoramas(lista);
    } catch (error) {
      console.error('Erro ao carregar doramas:', error);
    } finally {
      setLoading(false);
    }
  };

  const carregarDorama = async (id: string) => {
    const doramaExistente = doramas.find((d) => d.doramaId === id);
    if (doramaExistente) {
      setDoramaAtual(doramaExistente);
      return;
    }

    setLoadingDorama(true);
    try {
      const dorama = await doramaService.getDoramaCompleto(id);
      setDoramaAtual(dorama);

      setDoramas((prev) => {
        const existe = prev.find((d) => d.doramaId === id);
        if (!existe) {
          return [...prev, dorama];
        }
        return prev;
      });
    } catch (error) {
      console.error('Erro ao carregar dorama:', error);
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
