'use client';

import { useEffect } from 'react';
import { useAtividade } from 'src/context/AtividadeContext';
import { ActivityCard } from './ActivityCard';
import { EmptyActivity } from './EmptyActivity';
import { LoadingActivity } from './LoadingActivity';

interface ActivityFeedProps {
  usuarioId: string;
}

export function ActivityFeed({ usuarioId }: ActivityFeedProps) {
  const { minhasAtividades, loadingMinhas, carregarMinhasAtividades } =
    useAtividade();

  useEffect(() => {
    carregarMinhasAtividades();
  }, [usuarioId]);

  if (loadingMinhas) {
    return <LoadingActivity />;
  }

  if (minhasAtividades.length === 0) {
    return <EmptyActivity />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Atividades Recentes
          </h2>
          <p className="text-gray-600 mt-1">
            Suas ações e interações na plataforma
          </p>
        </div>
        <div className="text-sm text-gray-500">
          {minhasAtividades.length} atividade
          {minhasAtividades.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-4">
        {minhasAtividades.map((atividade) => (
          <ActivityCard key={atividade.id} atividade={atividade} />
        ))}
      </div>

      {minhasAtividades.length > 10 && (
        <div className="text-center pt-4">
          <button className="px-6 py-2 text-purple-600 hover:text-purple-700 font-medium rounded-xl hover:bg-purple-50 transition-colors">
            Ver mais atividades
          </button>
        </div>
      )}
    </div>
  );
}
