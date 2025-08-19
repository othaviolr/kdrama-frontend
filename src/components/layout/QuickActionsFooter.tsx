import { Search, Dice6, Users, Gamepad2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  href: string;
  color: string;
  bgColor: string;
}

export const QuickActionsFooter = () => {
  const quickActions: QuickAction[] = [
    {
      icon: Search,
      title: 'Explorar',
      subtitle: 'Catálogo',
      href: '/catalog',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Dice6,
      title: 'Dorama Aleatório',
      subtitle: 'Descubra algo novo',
      href: '/random',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Users,
      title: 'Buscar Amigos',
      subtitle: 'Conecte-se',
      href: '/friends/search',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Gamepad2,
      title: 'Jogar Quizzes',
      subtitle: 'Teste seus conhecimentos',
      href: '/quizzes',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Ações Rápidas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;

            return (
              <Link key={`action-${index}`} href={action.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${action.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`h-8 w-8 ${action.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">{action.subtitle}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
