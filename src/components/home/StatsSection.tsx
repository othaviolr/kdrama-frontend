import { Book, Clock, Star, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { UserStats } from '@/domain/entities/User';

interface StatsSectionProps {
  stats: UserStats;
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  const formatWatchTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  const statCards = [
    {
      icon: Book,
      label: 'Assistidos este mês',
      value: stats.currentMonth.watched,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Clock,
      label: 'Tempo total assistindo',
      value: formatWatchTime(stats.totalWatchTime),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Star,
      label: 'Avaliados',
      value: stats.dramasRated,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Award,
      label: 'Conquistas',
      value: stats.achievements,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Estatísticas</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;

          return (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor} mb-4`}
                >
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
