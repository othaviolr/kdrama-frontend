import {
  CheckIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface Usuario {
  usuarioId: string; // Mudou de 'id' para 'usuarioId' para bater com UsuarioSeguidor
  nome: string;
  nomeUsuario: string;
  fotoUrl?: string;
  bio?: string;
  segueVoce?: boolean;
  voceSegue?: boolean;
}

interface FollowerCardProps {
  usuario: Usuario;
}

export function FollowerCard({ usuario }: FollowerCardProps) {
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('=== DEBUG CLICK ===');
    console.log('Usuario:', usuario);
    console.log('nomeUsuario:', usuario.nomeUsuario);
    console.log('Tentando navegar para:', `/profile/${usuario.nomeUsuario}`);

    router.push(`/profile/${usuario.nomeUsuario}`);

    console.log('Push executado!');
    console.log('==================');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCardClick(event as any);
    }
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver perfil de ${usuario.nome}`}
    >
      <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-2 hover:border-purple-200 transition-all duration-300 relative overflow-hidden">
        {/* Efeito de hover sutil */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-center space-x-4 relative">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400 p-0.5 group-hover:scale-110 transition-transform duration-300">
                <img
                  src={usuario.fotoUrl || '/default-avatar.png'}
                  alt={usuario.nome}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>

              {/* Indicador se segue você */}
              {usuario.segueVoce && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Info do usuário */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-purple-600 transition-colors duration-300">
                {usuario.nome}
              </h3>
              {usuario.voceSegue && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                  Seguindo
                </span>
              )}
            </div>
          </div>

          {/* Ícone de link externo */}
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-purple-100 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <ArrowTopRightOnSquareIcon className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors duration-300" />
            </div>
          </div>
        </div>

        {/* Bio */}
        {usuario.bio && (
          <div className="mt-4 pt-4 border-t border-gray-100 relative">
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              {usuario.bio}
            </p>
          </div>
        )}

        {/* Indicador visual de clique */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-xs text-purple-500 font-medium">
            Clique para ver perfil
          </div>
        </div>
      </div>
    </div>
  );
}
