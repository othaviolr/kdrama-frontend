import { useState, useEffect } from 'react';
import { useLista } from 'src/context/ListaContext';
import {
  XMarkIcon,
  PlusIcon,
  CheckIcon,
  ListBulletIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { Lista } from '@/types/lista';

interface SelectListModalProps {
  doramaId: string;
  doramaTitle: string;
  onClose: () => void;
}

export function SelectListModal({
  doramaId,
  doramaTitle,
  onClose,
}: SelectListModalProps) {
  const { minhasListas, loading, carregarMinhasListas, adicionarDoramaLista } =
    useLista();

  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [addedToLists, setAddedToLists] = useState<Set<string>>(new Set());

  useEffect(() => {
    carregarMinhasListas();
  }, []);

  const getListsWithDoramaStatus = () => {
    return minhasListas.map((lista) => ({
      ...lista,
      hasDorama: lista.doramas.some((d) => d.doramaId === doramaId),
    }));
  };

  const handleAddToList = async (listaId: string) => {
    if (isAdding || addedToLists.has(listaId)) return;

    setIsAdding(listaId);
    try {
      await adicionarDoramaLista({
        listaId,
        doramaId,
      });

      setAddedToLists((prev) => new Set(prev).add(listaId));
    } catch (error) {
      console.error('Erro ao adicionar à lista:', error);
    } finally {
      setIsAdding(null);
    }
  };

  const listsWithStatus = getListsWithDoramaStatus();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-fit border border-violet-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-t-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Adicionar à Lista
              </h2>
              <p className="text-violet-100 mt-1">
                Escolha onde adicionar "{doramaTitle}"
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {loading ? (
            <LoadingState />
          ) : listsWithStatus.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {listsWithStatus.map((lista) => (
                <ListItem
                  key={lista.id}
                  lista={lista}
                  hasDorama={lista.hasDorama}
                  isAdding={isAdding === lista.id}
                  isAdded={addedToLists.has(lista.id)}
                  onAdd={() => handleAddToList(lista.id)}
                />
              ))}
            </div>
          )}

          {/* Create New List Button */}
          {!loading && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="w-full flex items-center justify-center gap-3 p-4 border-2 border-dashed border-violet-300 rounded-xl text-violet-600 hover:bg-violet-50 hover:border-violet-400 transition-all duration-300 hover:scale-[1.02] transform">
                <PlusIcon className="w-5 h-5" />
                <span className="font-semibold">Criar Nova Lista</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-violet-50/30 rounded-xl animate-pulse border-2 border-gray-200"
        >
          <div className="w-16 h-12 bg-gradient-to-br from-gray-200 to-violet-200/50 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 to-violet-200/50 rounded w-3/4"></div>
            <div className="h-3 bg-gradient-to-r from-gray-200 to-violet-200/50 rounded w-1/2"></div>
          </div>
          <div className="w-24 h-10 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-100 to-purple-100 rounded-2xl flex items-center justify-center">
        <ListBulletIcon className="w-10 h-10 text-violet-400" />
      </div>
      <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-3">
        Você ainda não tem listas
      </h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">
        Crie sua primeira lista para organizar seus doramas favoritos
      </p>
      <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 transform shadow-lg">
        Criar Primeira Lista
      </button>
    </div>
  );
}

function ListItem({
  lista,
  hasDorama,
  isAdding,
  isAdded,
  onAdd,
}: {
  lista: Lista & { hasDorama: boolean };
  hasDorama: boolean;
  isAdding: boolean;
  isAdded: boolean;
  onAdd: () => void;
}) {
  const getButtonState = () => {
    if (hasDorama)
      return {
        text: 'Já adicionado',
        color: 'bg-white border-2 border-gray-300 text-gray-500',
        icon: CheckIcon,
        disabled: true,
      };
    if (isAdded)
      return {
        text: 'Adicionado!',
        color:
          'bg-gradient-to-r from-violet-500 to-purple-600 border-2 border-violet-400 text-white',
        icon: CheckIcon,
        disabled: true,
      };
    if (isAdding)
      return {
        text: 'Adicionando...',
        color: 'bg-white border-2 border-violet-300 text-violet-600',
        icon: null,
        disabled: true,
      };
    return {
      text: 'Adicionar',
      color:
        'bg-white border-2 border-violet-400 hover:border-violet-500 hover:bg-violet-50 text-violet-600',
      icon: PlusIcon,
      disabled: false,
    };
  };

  const buttonState = getButtonState();
  const IconComponent = buttonState.icon;

  return (
    <div
      className={`flex gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] transform ${
        hasDorama || isAdded
          ? 'bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200 shadow-md'
          : 'bg-white border-gray-200 hover:border-violet-300 hover:shadow-lg hover:bg-violet-50/30'
      }`}
    >
      {/* Lista Image */}
      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-violet-100/50 shadow-sm">
        {lista.imagemCapaUrl ? (
          <img
            src={lista.imagemCapaUrl}
            alt={lista.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PhotoIcon className="w-6 h-6 text-violet-400" />
          </div>
        )}
      </div>

      {/* Lista Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
          {lista.nome}
        </h3>
        <p className="text-sm text-violet-600 font-medium line-clamp-1">
          {lista.doramas.length} doramas •{' '}
          {lista.publica ? 'Pública' : 'Privada'}
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={onAdd}
        disabled={buttonState.disabled}
        className={`flex items-center justify-center min-w-28 h-10 rounded-xl text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed hover:scale-105 transform disabled:hover:scale-100 shadow-sm ${buttonState.color}`}
      >
        {isAdding ? (
          <div className="w-4 h-4 border-2 border-violet-600/30 border-t-violet-600 rounded-full animate-spin mr-2" />
        ) : IconComponent ? (
          <IconComponent className="w-4 h-4 mr-2" />
        ) : null}
        {buttonState.text}
      </button>
    </div>
  );
}
