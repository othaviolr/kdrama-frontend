import { Clock, Eye, Star, Award } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  bgGradient,
}: StatCardProps) {
  return (
    <div className="group relative bg-white rounded-3xl shadow-lg border-2 border-purple-200 hover:border-purple-400 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
      {/* 3D Purple Border Effect - Sempre visível */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/5 group-hover:from-purple-500/15 group-hover:to-purple-600/15 transition-all duration-300"></div>
      <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(147,51,234,0.15)] group-hover:shadow-[inset_0_2px_4px_0_rgba(147,51,234,0.3)] transition-all duration-300"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-40"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          {/* Purple Icon by default */}
          <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center text-purple-600 group-hover:from-purple-200 group-hover:to-purple-300 group-hover:text-purple-700 transition-all duration-300 shadow-sm group-hover:shadow-md border border-purple-200">
            {icon}
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
              {value}
            </div>
            <div className="text-sm font-medium text-purple-500 uppercase tracking-wider">
              {subtitle}
            </div>
          </div>
        </div>

        <h3 className="font-semibold text-gray-800 text-lg group-hover:text-purple-700 transition-colors">
          {title}
        </h3>

        {/* Progress indicator - Sempre roxo e um pouco visível */}
        <div className="mt-4 h-1 bg-purple-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transform origin-left scale-x-75 group-hover:scale-x-100 transition-transform duration-700 delay-200"></div>
        </div>
      </div>
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
      bgGradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      title: 'Tempo total',
      value: '48h',
      subtitle: 'assistindo',
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-purple-500',
      bgGradient: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      title: 'Avaliados',
      value: '8',
      subtitle: 'reviews',
      icon: <Star className="w-6 h-6" />,
      color: 'bg-yellow-500',
      bgGradient: 'bg-gradient-to-br from-yellow-500 to-orange-500',
    },
    {
      title: 'Conquistas',
      value: '3',
      subtitle: 'badges',
      icon: <Award className="w-6 h-6" />,
      color: 'bg-green-500',
      bgGradient: 'bg-gradient-to-br from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="mb-16">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Suas Estatísticas
        </h2>
        <p className="text-gray-600">Acompanhe seu progresso e conquistas</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-200 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
