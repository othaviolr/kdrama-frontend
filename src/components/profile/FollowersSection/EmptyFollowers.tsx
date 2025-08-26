import { UsersIcon, UserPlusIcon } from '@heroicons/react/24/outline';

interface EmptyFollowersProps {
  type: 'seguidores' | 'seguindo';
}

export function EmptyFollowers({ type }: EmptyFollowersProps) {
  const isSeguidores = type === 'seguidores';

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <UsersIcon className="w-10 h-10 text-purple-400" />
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        {isSeguidores ? 'Nenhum seguidor ainda' : 'Não está seguindo ninguém'}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        {isSeguidores
          ? 'Quando alguém te seguir, aparecerá aqui. Que tal começar seguindo outros usuários?'
          : 'Explore a comunidade e siga outros usuários para ver suas atividades e doramas favoritos'}
      </p>

      <button className="group px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-1 transition-all duration-300 font-medium">
        <span className="flex items-center gap-2">
          <UserPlusIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
          {isSeguidores ? 'Encontrar Pessoas' : 'Explorar Usuários'}
        </span>
      </button>
    </div>
  );
}
