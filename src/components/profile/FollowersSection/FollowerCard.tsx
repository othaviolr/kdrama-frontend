import {
  UserPlusIcon,
  UserMinusIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

interface Usuario {
  id: string;
  nome: string;
  nomeUsuario: string;
  fotoUrl?: string;
  bio?: string;
  segueVoce?: boolean;
  voceSegue?: boolean;
}

interface FollowerCardProps {
  usuario: Usuario;
  onSeguir: () => void;
  onDeixarDeSeguir: () => void;
  showFollowButton: boolean;
}

export function FollowerCard({
  usuario,
  onSeguir,
  onDeixarDeSeguir,
  showFollowButton,
}: FollowerCardProps) {
  return (
    <div className="group relative">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={usuario.fotoUrl || '/default-avatar.png'}
                alt={usuario.nome}
                className="w-14 h-14 rounded-full object-cover bg-gray-200"
              />
              {usuario.segueVoce && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Info do usuário */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-black truncate group-hover:text-purple-600 transition-colors duration-200">
              {usuario.nome}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              @{usuario.nomeUsuario}
            </p>
          </div>

          {/* Botão de ação */}
          {showFollowButton && (
            <div className="flex-shrink-0">
              {usuario.voceSegue ? (
                <button
                  onClick={onDeixarDeSeguir}
                  className="flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-medium"
                >
                  <UserMinusIcon className="w-4 h-4" />
                  Seguindo
                </button>
              ) : (
                <button
                  onClick={onSeguir}
                  className="flex items-center gap-1 px-3 py-2 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-all duration-200 font-medium"
                >
                  <UserPlusIcon className="w-4 h-4" />
                  Seguir
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bio */}
        {usuario.bio && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {usuario.bio}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
