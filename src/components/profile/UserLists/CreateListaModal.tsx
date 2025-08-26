import { useState } from 'react';
import { useLista } from 'src/context/ListaContext';
import { ListaCreate } from '@/types/lista';
import {
  EyeIcon,
  EyeSlashIcon,
  XMarkIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface CreateListaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateListaModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateListaModalProps) {
  const { criarLista, loading } = useLista();
  const [formData, setFormData] = useState<ListaCreate>({
    nome: '',
    descricao: '',
    imagemCapaUrl: '',
    publica: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome.trim()) return;

    try {
      await criarLista(formData);
      setFormData({
        nome: '',
        descricao: '',
        imagemCapaUrl: '',
        publica: true,
      });
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao criar lista:', error);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <SparklesIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Nova Lista</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome da Lista *
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nome: e.target.value }))
                }
                placeholder="Ex: Meus Doramas de Romance fav ❤️"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    descricao: e.target.value,
                  }))
                }
                placeholder="Descreva sua lista..."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL da Imagem de Capa
              </label>
              <input
                type="url"
                value={formData.imagemCapaUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    imagemCapaUrl: e.target.value,
                  }))
                }
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Preview da imagem */}
            {formData.imagemCapaUrl && (
              <div className="relative">
                <img
                  src={formData.imagemCapaUrl}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded-2xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Privacidade
              </label>
              <div className="space-y-3">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-purple-300 transition-colors duration-200">
                  <input
                    type="radio"
                    name="privacidade"
                    checked={formData.publica}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, publica: true }))
                    }
                    className="mr-4 text-purple-600 focus:ring-purple-500"
                  />
                  <EyeIcon className="w-5 h-5 mr-3 text-green-600" />
                  <div>
                    <div className="font-medium text-gray-900">Público</div>
                    <div className="text-sm text-gray-600">
                      Todos podem ver e encontrar
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-3 border-2 border-gray-200 rounded-2xl cursor-pointer hover:border-purple-300 transition-colors duration-200">
                  <input
                    type="radio"
                    name="privacidade"
                    checked={!formData.publica}
                    onChange={() =>
                      setFormData((prev) => ({ ...prev, publica: false }))
                    }
                    className="mr-4 text-purple-600 focus:ring-purple-500"
                  />
                  <EyeSlashIcon className="w-5 h-5 mr-3 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">Privado</div>
                    <div className="text-sm text-gray-600">
                      Apenas você pode ver
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 text-gray-600 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading || !formData.nome.trim()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-lg disabled:opacity-50 transition-all duration-200 font-medium"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Criando...
                  </span>
                ) : (
                  'Criar Lista'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
