'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDorama } from 'src/context/DoramaContext';
import { DoramaCompleto } from '@/types/dorama';

// Componentes separados
import DoramaHeader from '@/components/dorama/DoramaHeader';
import DoramaSynopsis from '@/components/dorama/DoramaSynopsis';
import DoramaSeasons from '@/components/dorama/DoramaSeasons';
import DoramaCast from '@/components/dorama/DoramaCast';
import DoramaSidebar from '@/components/dorama/DoramaSidebar';
import DoramaLoading from '@/components/dorama/DoramaLoading';
import DoramaNotFound from '@/components/dorama/DoramaNotFound';

export default function DoramaDetalhes() {
  const { id } = useParams();
  const { doramaAtual, carregarDorama, loadingDorama } = useDorama();

  useEffect(() => {
    if (id) {
      carregarDorama(id as string);
    }
  }, [id]);

  const getRating = (dorama: DoramaCompleto) => {
    const hash = dorama.doramaId.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash % 11) / 10 + 4.0;
  };

  if (loadingDorama) {
    return <DoramaLoading />;
  }

  if (!doramaAtual) {
    return <DoramaNotFound />;
  }

  const rating = getRating(doramaAtual);
  const totalEpisodes = doramaAtual.temporadas.reduce(
    (acc, temp) => acc + temp.numeroEpisodios,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DoramaHeader
        dorama={doramaAtual}
        rating={rating}
        totalEpisodes={totalEpisodes}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DoramaSynopsis synopsis={doramaAtual.sinopse} />

            <DoramaSeasons seasons={doramaAtual.temporadas} />

            <DoramaCast actors={doramaAtual.atores} />
          </div>

          <DoramaSidebar dorama={doramaAtual} totalEpisodes={totalEpisodes} />
        </div>
      </div>
    </div>
  );
}
