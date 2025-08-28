import { useState, useEffect } from 'react';
import { DoramaCompleto } from '@/types/dorama';
import { useLista } from 'src/context/ListaContext';
import { useDorama } from 'src/context/DoramaContext';
import {
  FilmIcon,
  PlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface AddDoramaModalProps {
  listaId: string;
  onClose: () => void;
  existingDoramaIds: string[];
}

export function AddDoramaModal({
  listaId,
  onClose,
  existingDoramaIds,
}: AddDoramaModalProps) {
  const { doramas, loading, carregarDoramas } = useDorama();
  const { adicionarDoramaLista } = useLista();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState<string | null>(null);
  const [addedDoramas, setAddedDoramas] = useState<Set<string>>(new Set());

  // Carrega os doramas quando o modal abre
  useEffect(() => {
    if (doramas.length === 0) {
      carregarDoramas();
    }
  }, []); // Array vazio - executa só uma vez quando o modal abre

  // Filtra doramas que não estão na lista e não foram adicionados recentemente
  const availableDoramas = doramas.filter(
    (dorama) =>
      !existingDoramaIds.includes(dorama.doramaId) &&
      !addedDoramas.has(dorama.doramaId) &&
      (dorama.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dorama.tituloOriginal.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddDorama = async (doramaId: string) => {
    if (isAdding || addedDoramas.has(doramaId)) return;

    console.log('Adicionando dorama:', doramaId, 'à lista:', listaId);

    setIsAdding(doramaId);
    try {
      await adicionarDoramaLista({
        listaId: listaId.trim(),
        doramaId: doramaId.trim(),
      });

      // Adiciona ao set de doramas adicionados para feedback visual
      setAddedDoramas((prev) => new Set(prev).add(doramaId));

      console.log('Dorama adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar dorama:', error);
    } finally {
      setIsAdding(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Adicionar Dorama</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar doramas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
          </div>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: 'calc(80vh - 200px)' }}
        >
          {loading ? (
            <LoadingState />
          ) : availableDoramas.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableDoramas.map((dorama) => (
                <DoramaItem
                  key={dorama.doramaId}
                  dorama={dorama}
                  isAdding={isAdding === dorama.doramaId}
                  isAdded={addedDoramas.has(dorama.doramaId)}
                  onAdd={() => handleAddDorama(dorama.doramaId)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex gap-4 p-4 bg-gray-50 rounded-xl animate-pulse"
        >
          <div className="w-16 h-20 bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ searchTerm }: { searchTerm: string }) {
  return (
    <div className="text-center py-12">
      <FilmIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {searchTerm
          ? 'Nenhum dorama encontrado'
          : 'Todos os doramas já foram adicionados'}
      </h3>
      <p className="text-gray-600">
        {searchTerm
          ? 'Tente buscar por outro termo'
          : 'Esta lista já contém todos os doramas disponíveis'}
      </p>
    </div>
  );
}

function DoramaItem({
  dorama,
  isAdding,
  isAdded,
  onAdd,
}: {
  dorama: DoramaCompleto;
  isAdding: boolean;
  isAdded: boolean;
  onAdd: () => void;
}) {
  return (
    <div
      className={`flex gap-4 p-4 rounded-xl border transition-all duration-200 ${
        isAdded
          ? 'bg-green-50 border-green-200'
          : 'bg-gradient-to-r from-purple-50 to-white border-purple-100 hover:shadow-lg hover:shadow-purple-500/10'
      }`}
    >
      <img
        src={dorama.capaUrl || '/placeholder-dorama.jpg'}
        alt={dorama.titulo}
        className="w-16 h-20 object-cover rounded-lg"
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 line-clamp-1 mb-1">
          {dorama.titulo}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          {dorama.anoLancamento} • {dorama.paisOrigem}
        </p>
        <p className="text-xs text-gray-500 line-clamp-1">
          {dorama.generos.map((g) => g.nome).join(', ')}
        </p>
      </div>

      <button
        onClick={onAdd}
        disabled={isAdding || isAdded}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 disabled:cursor-not-allowed ${
          isAdded
            ? 'bg-green-500 text-white'
            : 'bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50 hover:shadow-lg hover:shadow-purple-500/25'
        }`}
      >
        {isAdded ? (
          <CheckIcon className="w-5 h-5" />
        ) : (
          <PlusIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
