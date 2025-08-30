import {
  UserPlusIcon,
  UserMinusIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

interface PublicProfile {
  usuarioId: string;
  nome: string;
  nomeUsuario: string;
  email: string;
  fotoUrl: string;
  bio: string;
  totalSeguidores: number;
  totalSeguindo: number;
  segueUsuarioAtual: boolean;
}

interface PublicProfileHeaderProps {
  perfil: PublicProfile;
  isCurrentUser: boolean;
  isFollowing: boolean;
  onFollowToggle: () => void;
  showFollowButton: boolean;
}

export function PublicProfileHeader({
  perfil,
  isCurrentUser,
  isFollowing,
  onFollowToggle,
  showFollowButton,
}: PublicProfileHeaderProps) {
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const handleFollowClick = async () => {
    setIsFollowLoading(true);
    try {
      await onFollowToggle();
    } finally {
      setIsFollowLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({
        title: `Perfil de ${perfil.nome}`,
        text: `Confira o perfil de ${perfil.nome} no DoramasList!`,
        url: url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      // Aqui você pode adicionar um toast de sucesso
      console.log('Link copiado!');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 p-1">
            {perfil.fotoUrl ? (
              <img
                src={perfil.fotoUrl}
                alt={perfil.nome}
                className="w-full h-full rounded-full object-cover bg-white"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-400">
                  {perfil.nome.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Informações do perfil */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {perfil.nome}
            </h1>
            <p className="text-gray-600 text-lg">@{perfil.nomeUsuario}</p>
          </div>

          {perfil.bio && (
            <p className="text-gray-700 leading-relaxed max-w-2xl">
              {perfil.bio}
            </p>
          )}

          {/* Estatísticas */}
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {perfil.totalSeguidores}
              </div>
              <div className="text-sm text-gray-600">seguidores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {perfil.totalSeguindo}
              </div>
              <div className="text-sm text-gray-600">seguindo</div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex gap-4 pt-4">
            {showFollowButton && (
              <button
                onClick={handleFollowClick}
                disabled={isFollowLoading}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200
                  ${
                    isFollowing
                      ? 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200'
                      : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
                  }
                  ${isFollowLoading ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isFollowLoading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : isFollowing ? (
                  <UserMinusIcon className="w-5 h-5" />
                ) : (
                  <UserPlusIcon className="w-5 h-5" />
                )}
                {isFollowLoading
                  ? 'Carregando...'
                  : isFollowing
                    ? 'Deixar de seguir'
                    : 'Seguir'}
              </button>
            )}

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors border border-gray-200"
            >
              <ShareIcon className="w-5 h-5" />
              Compartilhar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
