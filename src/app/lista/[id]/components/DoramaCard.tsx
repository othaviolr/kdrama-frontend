// DoramaCard.tsx
import { useState } from 'react';
import { DoramaCompleto } from '@/types/dorama';
import { DoramaLista } from '@/types/lista';
import { useLista } from 'src/context/ListaContext';
import { FilmIcon, ClockIcon, TrashIcon } from '@heroicons/react/24/outline';

interface DoramaWithInfo extends DoramaLista {
  info?: DoramaCompleto;
}

interface DoramaCardProps {
  dorama: DoramaWithInfo;
  onClick: () => void;
  listaId?: string;
}

export function DoramaCard({ dorama, onClick, listaId }: DoramaCardProps) {
  const { removerDoramaLista } = useLista();
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!listaId || isRemoving) return;

    setIsRemoving(true);
    try {
      await removerDoramaLista({
        listaId,
        doramaId: dorama.doramaId,
      });
    } catch (error) {
      console.error('Erro ao remover dorama:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setShowRemoveButton(true)}
      onMouseLeave={() => setShowRemoveButton(false)}
    >
      <div
        onClick={onClick}
        className="bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={dorama.info?.capaUrl || '/placeholder-dorama.jpg'}
            alt={dorama.info?.titulo || 'Dorama'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-purple-500 rounded-full p-3">
              <FilmIcon className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="absolute top-3 right-3">
            <div className="bg-white rounded-full px-3 py-1 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3 text-purple-500" />
                <span className="text-xs font-medium text-black">
                  {formatDate(dorama.dataAdicao)}
                </span>
              </div>
            </div>
          </div>

          {/* Botão de remover */}
          {listaId && showRemoveButton && (
            <div className="absolute top-3 left-3">
              <button
                onClick={handleRemove}
                disabled={isRemoving}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all duration-200 disabled:opacity-50"
                title="Remover da lista"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-black mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors duration-200">
            {dorama.info?.titulo || 'Carregando...'}
          </h3>

          {dorama.info ? (
            <div className="space-y-1">
              <p className="text-gray-600 text-sm font-medium">
                {dorama.info.anoLancamento}
              </p>
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

        {/* Shimmer effect no hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
}
