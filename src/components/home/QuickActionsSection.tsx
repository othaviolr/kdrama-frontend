import { Search, Shuffle, Users, Gamepad2 } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

export function QuickActionsSection() {
  const actions: QuickAction[] = [
    {
      id: '1',
      title: 'Explorar',
      subtitle: 'Catálogo',
      icon: <Search className="w-6 h-6" />,
      color: 'bg-blue-500',
      href: '/catalog',
    },
    {
      id: '2',
      title: 'Dorama',
      subtitle: 'Aleatório',
      icon: <Shuffle className="w-6 h-6" />,
      color: 'bg-purple-500',
      href: '/random',
    },
    {
      id: '3',
      title: 'Buscar',
      subtitle: 'Amigos',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500',
      href: '/friends',
    },
    {
      id: '4',
      title: 'Jogar',
      subtitle: 'Quizzes',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'bg-orange-500',
      href: '/games',
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center">
          ⚡
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Ações Rápidas</h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer"
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 ${action.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-105 transition-transform`}
              >
                {action.icon}
              </div>
              <h3 className="font-medium text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-500">{action.subtitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
