'use client';

import { useEffect, useState } from 'react';
import { useAtividade } from 'src/context/AtividadeContext';
import { ActivityCard } from './ActivityFeed/ActivityCard';
import { EmptyActivity } from './ActivityFeed/EmptyActivity';
import { LoadingActivity } from './ActivityFeed/LoadingActivity';
import {
  ChartBarIcon,
  ArrowRightIcon,
  FunnelIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface ActivityFeedProps {
  usuarioId: string;
}

export function ActivityFeed({ usuarioId }: ActivityFeedProps) {
  const { minhasAtividades, loadingMinhas, carregarMinhasAtividades } =
    useAtividade();
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<
    'TODOS' | 'AVALIACAO' | 'PRATELEIRA' | 'PROGRESSO_TEMPORADA'
  >('TODOS');

  useEffect(() => {
    carregarMinhasAtividades();
  }, [usuarioId]);

  const filteredActivities = minhasAtividades.filter((atividade) =>
    filter === 'TODOS' ? true : atividade.tipo === filter
  );

  const displayedActivities = showAll
    ? filteredActivities
    : filteredActivities.slice(0, 10);

  const filterOptions = [
    { value: 'TODOS', label: 'Todas', count: minhasAtividades.length },
    {
      value: 'AVALIACAO',
      label: 'Avaliações',
      count: minhasAtividades.filter((a) => a.tipo === 'AVALIACAO').length,
    },
    {
      value: 'PRATELEIRA',
      label: 'Listas',
      count: minhasAtividades.filter((a) => a.tipo === 'PRATELEIRA').length,
    },
    {
      value: 'PROGRESSO_TEMPORADA',
      label: 'Progresso',
      count: minhasAtividades.filter((a) => a.tipo === 'PROGRESSO_TEMPORADA')
        .length,
    },
  ];

  if (loadingMinhas) {
    return <LoadingActivity />;
  }

  if (minhasAtividades.length === 0) {
    return <EmptyActivity />;
  }

  return (
    <div className="space-y-8">
      {/* Header da seção */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <SparklesIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Atividades Recentes
                </h2>
                <p className="text-gray-600 text-lg">
                  Suas ações e interações na plataforma
                </p>
              </div>
            </div>
          </div>

          {/* Total de atividades - versão minimalista */}
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {minhasAtividades.length}
            </div>
            <div className="text-sm text-purple-600">
              atividade{minhasAtividades.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Filtrar por:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value as any)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${
                    filter === option.value
                      ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-200 shadow-sm'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-800 border border-gray-200'
                  }
                `}
              >
                {option.label}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    filter === option.value
                      ? 'bg-purple-200 text-purple-800'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {option.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de atividades */}
      {filteredActivities.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FunnelIcon className="w-8 h-8 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhuma atividade encontrada
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros para ver mais resultados.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {displayedActivities.map((atividade, index) => (
            <div
              key={atividade.id}
              className="animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ActivityCard atividade={atividade} />
            </div>
          ))}
        </div>
      )}

      {/* Botão "Ver mais" */}
      {filteredActivities.length > 10 && !showAll && (
        <div className="text-center pt-8">
          <button
            onClick={() => setShowAll(true)}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:-translate-y-1"
          >
            <span>Ver todas as {filteredActivities.length} atividades</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      )}

      {/* Botão "Ver menos" */}
      {showAll && filteredActivities.length > 10 && (
        <div className="text-center pt-8">
          <button
            onClick={() => setShowAll(false)}
            className="inline-flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-xl hover:bg-gray-50 transition-all duration-300"
          >
            <span>Mostrar menos</span>
          </button>
        </div>
      )}

      {/* Estatísticas no rodapé */}
      {minhasAtividades.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filterOptions.slice(1).map((stat) => (
              <div
                key={stat.value}
                className="text-center p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all duration-300"
              >
                <div className="text-2xl font-bold text-gray-900">
                  {stat.count}
                </div>
                <div className="text-sm text-purple-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
