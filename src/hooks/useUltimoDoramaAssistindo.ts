import { useMemo } from 'react';
import { useDorama } from 'src/context/DoramaContext';
import { useProgresso } from 'src/context/ProgressoContext';
import { StatusDoramaEnum } from '@/types/progresso';

interface WatchingShow {
  id: string;
  title: string;
  episode: string;
  progress: number;
  imageUrl: string;
}

export function useUltimoDoramaAssistindo(): WatchingShow | null {
  const { doramas } = useDorama();
  const { progressos } = useProgresso();

  return useMemo(() => {
    const assistindo = progressos
      .filter((p) => p.status === StatusDoramaEnum.Assistindo)
      .sort(
        (a, b) =>
          new Date(b.dataAtualizacao).getTime() -
          new Date(a.dataAtualizacao).getTime()
      );

    if (assistindo.length === 0) return null;

    const ultimo = assistindo[0];
    const dorama = doramas.find((d) =>
      d.temporadas.some((t) => t.id === ultimo.temporadaId)
    );

    if (!dorama) return null;

    const temporada = dorama.temporadas.find(
      (t) => t.id === ultimo.temporadaId
    );

    return {
      id: dorama.doramaId,
      title: dorama.titulo,
      episode: temporada
        ? `Ep ${ultimo.episodiosAssistidos}/${temporada.numeroEpisodios}`
        : `Ep ${ultimo.episodiosAssistidos}/?`,
      progress: temporada
        ? Math.floor(
            (ultimo.episodiosAssistidos / temporada.numeroEpisodios) * 100
          )
        : 0,
      imageUrl: dorama.capaUrl,
    };
  }, [doramas, progressos]);
}
