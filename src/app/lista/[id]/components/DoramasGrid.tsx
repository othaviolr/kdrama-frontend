import { useState } from 'react';
import { DoramaCompleto } from '@/types/dorama';
import { DoramaLista } from '@/types/lista';
import { FilmIcon, PlusIcon } from '@heroicons/react/24/outline';
import { DoramaCard } from './DoramaCard';
import { AddDoramaModal } from './AddDoramaModal';

interface DoramaWithInfo extends DoramaLista {
  info?: DoramaCompleto;
}

interface DoramasGridProps {
  doramas: DoramaWithInfo[];
  loading: boolean;
  onDoramaClick: (doramaId: string) => void;
  listaId?: string;
}

export function DoramasGrid({
  doramas,
  loading,
  onDoramaClick,
  listaId,
}: DoramasGridProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  if (loading) {
    return <LoadingGrid />;
  }

  const handleAddDorama = () => {
    if (!listaId) {
      console.error('ID da lista não fornecido');
      return;
    }
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Doramas da Lista</h2>
          {listaId && (
            <button
              onClick={handleAddDorama}
              className="flex items-center gap-2 px-4 py-2 text-purple-600 border-2 border-purple-200 rounded-xl hover:bg-purple-50 transition-colors duration-200 font-medium"
            >
              <PlusIcon className="w-5 h-5" />
              Adicionar Dorama
            </button>
          )}
        </div>

        {doramas.length === 0 ? (
          <EmptyDoramasState
            onAddClick={listaId ? handleAddDorama : undefined}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {doramas.map((dorama, index) => (
              <div
                key={dorama.doramaId}
                className="animate-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <DoramaCard
                  dorama={dorama}
                  onClick={() => onDoramaClick(dorama.doramaId)}
                  listaId={listaId}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {showAddModal && listaId && (
        <AddDoramaModal
          listaId={listaId}
          onClose={handleModalClose}
          existingDoramaIds={doramas.map((d) => d.doramaId)}
        />
      )}
    </>
  );
}

function LoadingGrid() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
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

function EmptyDoramasState({ onAddClick }: { onAddClick?: () => void }) {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <FilmIcon className="w-10 h-10 text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Lista vazia</h3>
      <p className="text-gray-600 mb-6">
        Adicione doramas para começar a organizar sua lista
      </p>
      {onAddClick && (
        <button
          onClick={onAddClick}
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200 font-medium"
        >
          Adicionar Primeiro Dorama
        </button>
      )}
    </div>
  );
}
