'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ActivityFeed } from '@/components/profile/ActivityFeed';
import { ReviewsList } from '@/components/profile/ReviewsList';
import { UserLists } from '@/components/profile/UserLists';
import { FollowersSection } from '@/components/profile/FollowersSection';
import { SettingsSection } from '@/components/profile/SettingsSection';
import { EditProfileModal } from '@/components/profile/EditProfileModal';
import { PerfilApi } from '@/types/user';
import { usuarioService } from 'src/services/usuarioService';

export default function ProfilePage() {
  const { usuario, isAuthenticated, isLoading } = useAuth();
  const [perfil, setPerfil] = useState<PerfilApi | null>(null);
  const [activeTab, setActiveTab] = useState('atividade');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Carregar perfil completo
  useEffect(() => {
    if (usuario) {
      usuarioService.getPerfil().then(setPerfil).catch(console.error);
    }
  }, [usuario]);

  // Redirect se não estiver logado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // router.push('/login');
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading || !perfil) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-purple-600 font-medium">
            Carregando perfil...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !usuario) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Acesso negado
          </h2>
          <p className="text-gray-600">
            Você precisa estar logado para acessar esta página.
          </p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'atividade':
        return <ActivityFeed usuarioId={usuario.usuarioId} />;

      case 'reviews':
        return <ReviewsList usuarioId={usuario.usuarioId} />;

      case 'listas':
        return <UserLists usuarioId={usuario.usuarioId} />;

      case 'seguidores':
        return <FollowersSection usuarioId={usuario.usuarioId} />;

      case 'configuracoes':
        return <SettingsSection usuario={usuario} />;

      default:
        return <ActivityFeed usuarioId={usuario.usuarioId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          usuario={{
            ...usuario,
            fotoUrl: perfil.fotoUrl,
            bio: perfil.bio,
          }}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="bg-white rounded-3xl shadow-lg">
          <div className="p-8">{renderTabContent()}</div>
        </div>

        <EditProfileModal
          isOpen={isEditModalOpen}
          usuario={perfil}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={(novoPerfil) => setPerfil(novoPerfil)}
        />
      </div>
    </div>
  );
}
