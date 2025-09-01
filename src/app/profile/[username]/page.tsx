'use client';

import { useState, useEffect } from 'react';
import { useAuth } from 'src/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import PublicProfileHeader from '@/components/profile/PublicProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { ActivityFeed } from '@/components/profile/ActivityFeed';
import { PublicReviewsList } from '@/components/profile/PublicReviewsList';
import { PublicUserLists } from '@/components/profile/PublicUserLists';
import { FollowersSection } from '@/components/profile/FollowersSection';
import { usuarioService } from 'src/services/usuarioService';
import { PerfilPublico } from '@/types/user';

interface PublicProfile extends PerfilPublico {}

export default function PublicProfilePage() {
  const { usuario: currentUser } = useAuth();
  const params = useParams();
  const router = useRouter();
  const username = params?.username as string;

  const [perfil, setPerfil] = useState<PublicProfile | null>(null);
  const [activeTab, setActiveTab] = useState('atividade');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      carregarPerfilPublico();
    }
  }, [username]);

  const carregarPerfilPublico = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔍 Carregando perfil público:', username);

      if (currentUser?.nomeUsuario === username) {
        console.log('🔄 É o próprio usuário, redirecionando...');
        router.push('/profile');
        return;
      }

      const data = await usuarioService.getUsuario(username);

      console.log('✅ Perfil público carregado:', data);
      console.log('🆔 UsuarioId real da API:', data.usuarioId);
      console.log('DEBUG COMPLETO:', JSON.stringify(data, null, 2));

      setPerfil(data);

      console.log('🎯 Perfil definido com usuarioId:', data.usuarioId);
    } catch (error: any) {
      console.error('❌ Erro ao carregar perfil:', error);

      if (error.message?.includes('404')) {
        setError('Usuário não encontrado');
      } else {
        setError('Erro ao carregar perfil. Tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSeguir = async () => {
    if (!perfil || !currentUser) return;

    try {
      if (perfil.segueUsuarioAtual) {
        await usuarioService.deixarDeSeguir(perfil.usuarioId);
        setPerfil((prev) =>
          prev
            ? {
                ...prev,
                segueUsuarioAtual: false,
                totalSeguidores: prev.totalSeguidores - 1,
              }
            : null
        );
      } else {
        await usuarioService.seguirUsuario(perfil.usuarioId);
        setPerfil((prev) =>
          prev
            ? {
                ...prev,
                segueUsuarioAtual: true,
                totalSeguidores: prev.totalSeguidores + 1,
              }
            : null
        );
      }
    } catch (error) {
      console.error('Erro ao seguir/deixar de seguir:', error);
    }
  };

  if (loading) {
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

  if (error || !perfil) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-4xl text-gray-400">😕</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {error || 'Perfil não encontrado'}
          </h2>
          <p className="text-gray-600 mb-4">
            O usuário que você está procurando não existe ou foi removido.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    if (!perfil) return null;

    console.log('🔥 RENDERIZANDO COMPONENTE:', {
      activeTab,
      'perfil.usuarioId': perfil.usuarioId,
      'perfil.nomeUsuario': perfil.nomeUsuario,
      'typeof usuarioId': typeof perfil.usuarioId,
    });

    switch (activeTab) {
      case 'atividade':
        console.log('⚡ Passando para ActivityFeed:', perfil.usuarioId);
        return <ActivityFeed usuarioId={perfil.usuarioId} />;

      case 'reviews':
        console.log('⚡ Passando para PublicReviewsList:', perfil.usuarioId);
        return <PublicReviewsList usuarioId={perfil.usuarioId} />;

      case 'listas':
        console.log('⚡ Passando para PublicUserLists:', perfil.usuarioId);
        return <PublicUserLists usuarioId={perfil.usuarioId} />;

      case 'seguidores':
        console.log('⚡ Passando para FollowersSection:', perfil.usuarioId);
        return <FollowersSection usuarioId={perfil.usuarioId} />;

      default:
        return <ActivityFeed usuarioId={perfil.usuarioId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PublicProfileHeader
          perfil={perfil}
          isCurrentUser={false}
          showFollowButton={!!currentUser}
          onFollowSuccess={(isFollowing) => {
            setPerfil((prev) =>
              prev
                ? {
                    ...prev,
                    segueUsuarioAtual: isFollowing,
                    totalSeguidores: isFollowing
                      ? prev.totalSeguidores + 1
                      : prev.totalSeguidores - 1,
                  }
                : null
            );

            console.log('Follow success:', isFollowing);
          }}
          onFollowError={(error) => {
            console.error('Erro ao seguir:', error);
            alert('Erro ao seguir usuário. Tente novamente.');
          }}
        />

        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          hideSettingsTab={true}
        />

        <div className="bg-white rounded-3xl shadow-lg">
          <div className="p-8">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
