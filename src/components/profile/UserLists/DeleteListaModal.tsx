import { Lista } from '@/types/lista';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface DeleteListaModalProps {
  lista: Lista | null;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export function DeleteListaModal({
  lista,
  onConfirm,
  onCancel,
  loading,
}: DeleteListaModalProps) {
  if (!lista) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8 text-center">
          {/* Ícone de aviso */}
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Deletar Lista
          </h3>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              Tem certeza que deseja deletar a lista
            </p>
            <p className="font-semibold text-gray-900 text-lg">
              "{lista.nome}"?
            </p>
            <p className="text-sm text-red-600 mt-2">
              Esta ação não pode ser desfeita e todos os {lista.doramas.length}{' '}
              doramas serão removidos.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={onCancel}
              disabled={loading}
              className="flex-1 px-6 py-3 text-gray-600 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 disabled:opacity-50 transition-colors duration-200 font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:shadow-lg disabled:opacity-50 transition-all duration-200 font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Deletando...
                </span>
              ) : (
                'Deletar'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
