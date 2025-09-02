'use client';

import { useState, useEffect } from 'react';
import { useLista } from 'src/context/ListaContext';
import { Lista } from '@/types/lista';
import { PlusIcon, ListBulletIcon } from '@heroicons/react/24/outline';
import { ListaCard } from './UserLists/ListaCard';
import { CreateListaModal } from './UserLists/CreateListaModal';
import { DeleteListaModal } from './UserLists/DeleteListaModal';
import { Toast } from './UserLists/Toast';

interface UserListsProps {
  usuarioId: string;
}

export function UserLists({ usuarioId }: UserListsProps) {
  const {
    minhasListas,
    loading,
    carregarMinhasListas,
    compartilharLista,
    deletarLista,
  } = useLista();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deletingLista, setDeletingLista] = useState<Lista | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    carregarMinhasListas();
  }, [usuarioId]);

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCompartilhar = async (lista: Lista) => {
    try {
      let shareToken = lista.shareToken;

      if (!shareToken) {
        shareToken = await compartilharLista(lista.id);
      }

      const shareUrl = `${window.location.origin}/lista/compartilhada/${shareToken}`;
      await navigator.clipboard.writeText(shareUrl);

      showToast('✨ Link copiado para a área de transferência!');
    } catch (error) {
      console.error('Erro ao compartilhar lista:', error);
      showToast('❌ Erro ao copiar link', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deletingLista) return;

    try {
      await deletarLista(deletingLista.id);
      setDeletingLista(null);
      showToast('🗑️ Lista deletada com sucesso');
    } catch (error) {
      console.error('Erro ao deletar lista:', error);
      showToast('❌ Erro ao deletar lista', 'error');
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    showToast('🎉 Lista criada com sucesso!');
  };

  if (loading && minhasListas.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <span className="text-sm sm:text-base text-gray-600">
            Carregando suas listas...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Header modernizado */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3 sm:gap-4">
              <ListBulletIcon className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
              <div>
                <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
                  Minhas Listas
                </h2>
                <p className="text-gray-600 text-sm sm:text-lg">
                  Organize seus doramas em listas personalizadas
                </p>
              </div>
            </div>
          </div>

          {/* Total de listas + Botão criar */}
          <div className="flex items-center justify-between sm:justify-end gap-4">
            <div className="text-left sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                {minhasListas.length}
              </div>
              <div className="text-xs sm:text-sm text-purple-600">
                lista{minhasListas.length !== 1 ? 's' : ''}
              </div>
            </div>

            <button
              onClick={() => setShowCreateModal(true)}
              className="group flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl sm:rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 transition-all duration-300 font-medium text-sm sm:text-base"
            >
              <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">Nova Lista</span>
              <span className="sm:hidden">Nova</span>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      {minhasListas.length === 0 ? (
        <EmptyState onCreateClick={() => setShowCreateModal(true)} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {minhasListas.map((lista, index) => (
            <div
              key={lista.id}
              className="animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ListaCard
                lista={lista}
                onShare={() => handleCompartilhar(lista)}
                onDelete={() => setDeletingLista(lista)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateListaModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />

      <DeleteListaModal
        lista={deletingLista}
        onConfirm={handleDelete}
        onCancel={() => setDeletingLista(null)}
        loading={loading}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

// Estado vazio modernizado
function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="text-center py-12 sm:py-16">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-50 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
        <ListBulletIcon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
        Nenhuma lista criada ainda
      </h3>
      <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base px-4">
        Crie sua primeira lista para organizar seus doramas favoritos e
        compartilhar com amigos
      </p>

      <button
        onClick={onCreateClick}
        className="group px-6 py-3 sm:px-8 sm:py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl sm:rounded-2xl hover:shadow-xl hover:shadow-purple-500/25 hover:-translate-y-1 transition-all duration-300 font-medium text-sm sm:text-base"
      >
        <span className="flex items-center gap-2">
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-300" />
          <span className="hidden sm:inline">Criar Primeira Lista</span>
          <span className="sm:hidden">Criar Lista</span>
        </span>
      </button>
    </div>
  );
}
