import { Search, Shuffle, Users, Gamepad2 } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  href: string;
  bgGradient: string;
}

export function QuickActionsSection() {
  const actions: QuickAction[] = [
    {
      id: '1',
      title: 'Explorar',
      subtitle: 'Catálogo',
      icon: <Search className="w-6 h-6" />,
      color: 'bg-blue-500',
      bgGradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
      href: '/catalog',
    },
    {
      id: '2',
      title: 'Dorama',
      subtitle: 'Aleatório',
      icon: <Shuffle className="w-6 h-6" />,
      color: 'bg-purple-500',
      bgGradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
      href: '/random',
    },
    {
      id: '3',
      title: 'Buscar',
      subtitle: 'Amigos',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500',
      bgGradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
      href: '/friends',
    },
    {
      id: '4',
      title: 'Jogar',
      subtitle: 'Quizzes',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'bg-orange-500',
      bgGradient: 'bg-gradient-to-br from-orange-500 to-red-500',
      href: '/games',
    },
  ];

  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-purple-50 rounded-full px-6 py-3 mb-4">
          <h2 className="text-xl font-bold text-purple-800">Ações Rápidas</h2>
        </div>
        <p className="text-gray-600">
          Acesse rapidamente suas funcionalidades favoritas
        </p>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className="group relative bg-white rounded-3xl shadow-lg border-2 border-purple-200 hover:border-purple-400 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            {/* 3D Purple Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/5 group-hover:from-purple-500/15 group-hover:to-purple-600/15 transition-all duration-300"></div>
            <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(147,51,234,0.15)] group-hover:shadow-[inset_0_2px_4px_0_rgba(147,51,234,0.3)] transition-all duration-300"></div>

            {/* Background gradient overlay */}
            <div
              className={`absolute inset-0 ${action.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
            ></div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-50 to-transparent rounded-full -translate-y-12 translate-x-12 opacity-40"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Icon with purple theme */}
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center text-purple-600 group-hover:from-purple-200 group-hover:to-purple-300 group-hover:text-purple-700 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:scale-110 border border-purple-200 mb-4">
                {action.icon}
              </div>

              <h3 className="font-semibold text-gray-800 text-lg mb-1 group-hover:text-purple-700 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-purple-500 font-medium">
                {action.subtitle}
              </p>

              {/* Action indicator */}
              <div className="mt-4 w-full h-1 bg-purple-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100"></div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-3">
          {actions.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
