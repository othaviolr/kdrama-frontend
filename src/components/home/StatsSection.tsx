import { Clock, Eye, Star, Award, Wrench, Sparkles } from 'lucide-react';

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
    <div className="group relative bg-white rounded-3xl shadow-lg border-2 border-purple-200 hover:border-purple-400 p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden opacity-75">
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
      // Ajuste específico para o ícone do relógio
      icon: <Clock className="w-7 h-7 -m-0.5" />, // Aumentamos o tamanho e ajustamos a margem
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
    <div className="mb-16 relative">
      {/* Development Banner */}
      <div className="relative mb-8 mx-auto max-w-2xl">
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-2xl p-6 shadow-2xl border border-purple-500/20 overflow-hidden">
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-300"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-bounce delay-700"></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Wrench
                    className="w-8 h-8 text-white animate-spin"
                    style={{ animationDuration: '3s' }}
                  />
                  <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div className="h-8 w-px bg-white/30"></div>
                <div className="text-white font-bold text-xl tracking-wide">
                  EM DESENVOLVIMENTO
                </div>
              </div>
            </div>

            <p className="text-purple-100 text-sm leading-relaxed mb-4">
              Calma eu trabalho sozinho!
              <br />
              Esta funcionalidade estará disponível em breve.
            </p>

            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"
                style={{ width: '15%' }}
              ></div>
            </div>
            <p className="text-xs text-purple-200 mt-2">15% concluído</p>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Suas Estatísticas
        </h2>
        <p className="text-gray-600">Acompanhe seu progresso e conquistas</p>
      </div>

      {/* Stats Grid - with overlay */}
      <div className="relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Overlay effect */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] rounded-3xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="text-center">
            <Wrench className="w-12 h-12 text-purple-600 mx-auto mb-2 animate-bounce" />
            <p className="text-purple-700 font-semibold">Em breve...</p>
          </div>
        </div>
      </div>

      {/* Bottom decoration - animated */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
