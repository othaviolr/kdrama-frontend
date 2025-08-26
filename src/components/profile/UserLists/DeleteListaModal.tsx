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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md animate-in fade-in zoom-in-95 duration-300 border border-gray-100">
        <div className="p-8 text-center">
          {/* Ícone de aviso */}
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-100">
            <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Deletar Lista
          </h3>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              Tem certeza que deseja deletar a lista
            </p>
            <p className="font-semibold text-black text-lg">"{lista.nome}"?</p>
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-700">
                Esta ação não pode ser desfeita e todos os{' '}
                <span className="font-semibold">{lista.doramas.length}</span>{' '}
                doramas serão removidos.
              </p>
            </div>
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
              className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl hover:shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
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
