'use client';

import { useState, useEffect } from 'react';
import { X, Save, Loader2, Trash2 } from 'lucide-react';
import { PerfilApi } from '@/types/user';
import { usuarioService } from 'src/services/usuarioService';

interface EditProfileModalProps {
  isOpen: boolean;
  usuario: PerfilApi;
  onClose: () => void;
  onUpdate: (usuario: PerfilApi) => void;
}

export function EditProfileModal({
  isOpen,
  usuario,
  onClose,
  onUpdate,
}: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    nome: usuario.nome,
    bio: usuario.bio ?? '',
    fotoUrl: usuario.fotoUrl ?? '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData({
      nome: usuario.nome,
      bio: usuario.bio ?? '',
      fotoUrl: usuario.fotoUrl ?? '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  }, [usuario]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRemoveFoto = () => {
    setFormData((prev) => ({ ...prev, fotoUrl: '' }));
  };

  const handleCancel = () => {
    setFormData({
      nome: usuario.nome,
      bio: usuario.bio ?? '',
      fotoUrl: usuario.fotoUrl ?? '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Atualiza o perfil no backend
      await usuarioService.updatePerfil({
        nome: formData.nome,
        nomeUsuario: usuario.nomeUsuario,
        bio: formData.bio,
        fotoUrl: formData.fotoUrl,
      });

      // Atualiza o estado do usuário no componente pai
      onUpdate({
        ...usuario,
        nome: formData.nome,
        bio: formData.bio,
        fotoUrl: formData.fotoUrl,
      });

      // Fecha o modal
      onClose();
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);

      // Tenta pegar mensagem do backend se existir
      if (error?.message) {
        alert(`Erro ao salvar perfil: ${error.message}`);
      } else {
        alert('Erro ao salvar perfil. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Editar Perfil</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Foto */}
            <div className="flex items-center gap-4">
              {formData.fotoUrl ? (
                <img
                  src={formData.fotoUrl}
                  alt="Foto do perfil"
                  className="w-20 h-20 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    const nextEl = target.nextElementSibling as HTMLElement;
                    target.style.display = 'none';
                    if (nextEl) {
                      nextEl.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              {!formData.fotoUrl && (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  Sem foto
                </div>
              )}
              <div className="flex flex-col gap-2">
                {formData.fotoUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveFoto}
                    className="flex items-center gap-1 text-red-600 hover:underline"
                  >
                    <Trash2 className="w-4 h-4" /> Remover foto
                  </button>
                )}
              </div>
            </div>

            {/* URL da Foto */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL da Foto
              </label>
              <input
                type="url"
                value={formData.fotoUrl}
                onChange={(e) => handleChange('fotoUrl', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none"
                placeholder="https://exemplo.com/minha-foto.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Cole o link de uma imagem para usar como foto de perfil
              </p>
            </div>

            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none"
                placeholder="Seu nome"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleChange('bio', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none resize-none"
                placeholder="Conte um pouco sobre você..."
              />
            </div>

            {/* Informações não editáveis */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Nome de usuário
                </label>
                <p className="text-sm text-gray-700">@{usuario.nomeUsuario}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email
                </label>
                <p className="text-sm text-gray-700">{usuario.email}</p>
              </div>
              <p className="text-xs text-gray-500">
                Nome de usuário e email não podem ser alterados
              </p>
            </div>

            {/* Senha */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Alterar Senha
              </h3>
              <input
                type="password"
                value={formData.currentPassword}
                onChange={(e) =>
                  handleChange('currentPassword', e.target.value)
                }
                placeholder="Senha atual"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none"
              />
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => handleChange('newPassword', e.target.value)}
                placeholder="Nova senha"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none"
              />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange('confirmPassword', e.target.value)
                }
                placeholder="Confirmar nova senha"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 transition-all outline-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
