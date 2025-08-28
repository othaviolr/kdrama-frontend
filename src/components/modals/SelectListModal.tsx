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

  // Verifica se o dorama já está em cada lista
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

      // Opcional: fechar modal após adicionar
      // setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error('Erro ao adicionar à lista:', error);
    } finally {
      setIsAdding(null);
    }
  };

  const listsWithStatus = getListsWithDoramaStatus();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Adicionar à Lista
            </h2>
            <p className="text-gray-600 mt-1">
              Escolha onde adicionar "{doramaTitle}"
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: 'calc(80vh - 140px)' }}
        >
          {loading ? (
            <LoadingState />
          ) : listsWithStatus.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-3">
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
              <button className="w-full flex items-center justify-center gap-3 p-4 border-2 border-dashed border-purple-300 rounded-xl text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all duration-200">
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Criar Nova Lista</span>
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
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 p-4 bg-gray-50 rounded-xl animate-pulse"
        >
          <div className="w-16 h-12 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        </div>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <ListBulletIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Você ainda não tem listas
      </h3>
      <p className="text-gray-600 mb-6">
        Crie sua primeira lista para organizar seus doramas favoritos
      </p>
      <button className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-medium transition-colors duration-200">
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
        color: 'bg-gray-500',
        icon: CheckIcon,
        disabled: true,
      };
    if (isAdded)
      return {
        text: 'Adicionado!',
        color: 'bg-green-500',
        icon: CheckIcon,
        disabled: true,
      };
    if (isAdding)
      return {
        text: 'Adicionando...',
        color: 'bg-purple-400',
        icon: PlusIcon,
        disabled: true,
      };
    return {
      text: 'Adicionar',
      color: 'bg-purple-500 hover:bg-purple-600',
      icon: PlusIcon,
      disabled: false,
    };
  };

  const buttonState = getButtonState();
  const IconComponent = buttonState.icon;

  return (
    <div
      className={`flex gap-4 p-4 rounded-xl border transition-all duration-200 ${
        hasDorama || isAdded
          ? 'bg-gray-50 border-gray-200'
          : 'bg-gradient-to-r from-purple-50 to-white border-purple-100 hover:shadow-md'
      }`}
    >
      {/* Lista Image */}
      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
        {lista.imagemCapaUrl ? (
          <img
            src={lista.imagemCapaUrl}
            alt={lista.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <PhotoIcon className="w-6 h-6 text-gray-400" />
          </div>
        )}
      </div>

      {/* Lista Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
          {lista.nome}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">
          {lista.doramas.length} doramas •{' '}
          {lista.publica ? 'Pública' : 'Privada'}
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={onAdd}
        disabled={buttonState.disabled}
        className={`flex items-center justify-center w-24 h-10 text-white rounded-full text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed ${buttonState.color}`}
      >
        <IconComponent className="w-4 h-4 mr-1" />
        {buttonState.text}
      </button>
    </div>
  );
}
