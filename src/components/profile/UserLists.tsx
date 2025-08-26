'use client';

import { useState, useEffect } from 'react';
import { useLista } from 'src/context/ListaContext';
import { Lista } from '@/types/lista';
import { PlusIcon } from '@heroicons/react/24/outline';
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
          <div className="w-8 h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <span className="text-gray-600">Carregando suas listas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header modernizado */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Minhas Listas
          </h2>
          <p className="text-gray-600 mt-1">
            Organize seus doramas em listas personalizadas
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          Nova Lista
        </button>
      </div>

      {/* Conteúdo */}
      {minhasListas.length === 0 ? (
        <EmptyState onCreateClick={() => setShowCreateModal(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {minhasListas.map((lista) => (
            <ListaCard
              key={lista.id}
              lista={lista}
              onShare={() => handleCompartilhar(lista)}
              onDelete={() => setDeletingLista(lista)}
            />
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
    <div className="text-center py-16">
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:scale-105 transition-transform duration-200">
          <PlusIcon className="w-16 h-16 text-purple-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Nenhuma lista criada ainda
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Crie sua primeira lista para organizar seus doramas favoritos e
        compartilhar com amigos
      </p>

      <button
        onClick={onCreateClick}
        className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium"
      >
        <span className="flex items-center gap-2">
          <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          Criar Primeira Lista
        </span>
      </button>
    </div>
  );
}
