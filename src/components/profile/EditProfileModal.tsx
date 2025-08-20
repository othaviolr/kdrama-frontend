'use client';

import { Save, X } from 'lucide-react';

interface EditForm {
  username: string;
  bio: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  editForm: EditForm;
  isLoading: boolean;
  onClose: () => void;
  onSave: () => void;
  onFormChange: (field: keyof EditForm, value: string) => void;
}

export function EditProfileModal({
  isOpen,
  editForm,
  isLoading,
  onClose,
  onSave,
  onFormChange,
}: EditProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Editar Perfil</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome de usuário
              </label>
              <input
                type="text"
                value={editForm.username}
                onChange={(e) => onFormChange('username', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={editForm.bio}
                onChange={(e) => onFormChange('bio', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                placeholder="Conte um pouco sobre você..."
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Alterar Senha
              </h3>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Senha atual"
                  value={editForm.currentPassword}
                  onChange={(e) =>
                    onFormChange('currentPassword', e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                />
                <input
                  type="password"
                  placeholder="Nova senha"
                  value={editForm.newPassword}
                  onChange={(e) => onFormChange('newPassword', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                />
                <input
                  type="password"
                  placeholder="Confirmar nova senha"
                  value={editForm.confirmPassword}
                  onChange={(e) =>
                    onFormChange('confirmPassword', e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={onSave}
                disabled={isLoading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar Alterações
                  </>
                )}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-200 hover:bg-gray-50 rounded-xl font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
