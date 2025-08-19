import { Clock, Eye, Star, Award } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ title, value, subtitle, icon, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white`}
        >
          {icon}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{subtitle}</div>
        </div>
      </div>
      <h3 className="font-medium text-gray-700">{title}</h3>
    </div>
  );
}

export function StatsSection() {
  const stats = [
    {
      title: 'Assistidos',
      value: '12',
      subtitle: 'este mês',
      icon: <Eye className="w-6 h-6" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Tempo total',
      value: '48h',
      subtitle: 'assistindo',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-purple-500',
    },
    {
      title: 'Avaliados',
      value: '8',
      subtitle: 'reviews',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-yellow-500',
    },
    {
      title: 'Conquistas',
      value: '3',
      subtitle: 'badges',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="mb-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
}
