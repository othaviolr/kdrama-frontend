import { UserPlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useFollow } from '../../hooks/useFollow'; // Caminho correto baseado na sua estrutura

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
  showFollowButton: boolean;
  onFollowSuccess?: (isFollowing: boolean) => void;
  onFollowError?: (error: Error) => void;
}

function PublicProfileHeader({
  perfil,
  isCurrentUser,
  showFollowButton,
  onFollowSuccess,
  onFollowError,
}: PublicProfileHeaderProps) {
  const { isFollowing, isLoading, toggleFollow } = useFollow({
    usuarioId: perfil.usuarioId,
    isFollowingInitial: perfil.segueUsuarioAtual,
    onSuccess: (newFollowingState) => {
      // Chama o callback do componente pai
      onFollowSuccess?.(newFollowingState);
    },
    onError: onFollowError,
  });

  console.log('Debug - perfil.segueUsuarioAtual:', perfil.segueUsuarioAtual);
  console.log('Debug - isFollowing no hook:', isFollowing);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 p-1 shadow-xl">
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
        </div>

        {/* Informações do perfil */}
        <div className="flex-1 space-y-6">
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                  {perfil.nome}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-lg">
                    @{perfil.nomeUsuario}
                  </span>
                </div>
              </div>

              {/* Botão de seguir modernizado */}
              {showFollowButton && (
                <div className="flex-shrink-0">
                  <button
                    onClick={toggleFollow}
                    disabled={isLoading}
                    className={`
                      relative overflow-hidden group px-8 py-3 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg
                      ${
                        isFollowing
                          ? 'bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 border-2 border-gray-200 hover:border-red-200'
                          : 'bg-purple-600 text-white hover:bg-purple-700 border-2 border-transparent'
                      }
                      ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <div
                          className={`transition-transform duration-300 ${isFollowing ? 'group-hover:rotate-180' : 'group-hover:scale-110'}`}
                        >
                          {isFollowing ? (
                            <CheckIcon className="w-5 h-5" />
                          ) : (
                            <UserPlusIcon className="w-5 h-5" />
                          )}
                        </div>
                      )}
                      <span className="font-semibold">
                        {isLoading
                          ? 'Carregando...'
                          : isFollowing
                            ? 'Seguindo'
                            : 'Seguir'}
                      </span>
                    </div>

                    {/* Efeito de hover */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-700 group-hover:translate-x-full"></div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bio */}
          {perfil.bio && (
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-gray-700 leading-relaxed text-lg">
                {perfil.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicProfileHeader;
