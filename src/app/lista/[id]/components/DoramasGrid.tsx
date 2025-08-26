import { DoramaCompleto } from '@/types/dorama';
import { DoramaLista } from '@/types/lista';
import { FilmIcon, PlusIcon } from '@heroicons/react/24/outline';

interface DoramaWithInfo extends DoramaLista {
  info?: DoramaCompleto;
}

interface DoramasGridProps {
  doramas: DoramaWithInfo[];
  loading: boolean;
  onDoramaClick: (doramaId: string) => void;
}

export function DoramasGrid({
  doramas,
  loading,
  onDoramaClick,
}: DoramasGridProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Doramas da Lista
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-gray-200 rounded-2xl mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Doramas da Lista</h2>
        <button className="flex items-center gap-2 px-4 py-2 text-purple-600 border-2 border-purple-200 rounded-xl hover:bg-purple-50 transition-colors duration-200">
          <PlusIcon className="w-5 h-5" />
          Adicionar Dorama
        </button>
      </div>

      {doramas.length === 0 ? (
        <EmptyDoramasState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doramas.map((dorama) => (
            <DoramaCard
              key={dorama.doramaId}
              dorama={dorama}
              onClick={() => onDoramaClick(dorama.doramaId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyDoramasState() {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <FilmIcon className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Lista vazia</h3>
      <p className="text-gray-600 mb-6">
        Adicione doramas para começar a organizar sua lista
      </p>
      <button className="px-6 py-3 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition-colors duration-200">
        Adicionar Primeiro Dorama
      </button>
    </div>
  );
}

function DoramaCard({
  dorama,
  onClick,
}: {
  dorama: DoramaWithInfo;
  onClick: () => void;
}) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={dorama.info?.capaUrl || '/placeholder-dorama.jpg'}
          alt={dorama.info?.titulo || 'Dorama'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-md rounded-full p-3">
            <FilmIcon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="absolute top-3 right-3">
          <div className="bg-black/60 backdrop-blur-md rounded-full px-2 py-1 text-white text-xs">
            {formatDate(dorama.dataAdicao)}
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors duration-200">
          {dorama.info?.titulo || 'Carregando...'}
        </h3>

        {dorama.info ? (
          <div className="space-y-1">
            <p className="text-gray-600 text-sm">{dorama.info.anoLancamento}</p>
            <p className="text-gray-500 text-xs line-clamp-1">
              {dorama.info.generos?.map((g) => g.nome).join(', ')}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>
        )}
      </div>
    </div>
  );
}
