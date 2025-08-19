import { MessageCircle, Heart, List, Star } from 'lucide-react';
import { Button } from '../ui/Button';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  content: string;
  time: string;
  avatar: string;
  type: 'review' | 'list';
  likes?: number;
  comments?: number;
}

export function RecentActivitySection() {
  const activities: ActivityItem[] = [
    {
      id: '1',
      user: 'MariaClara',
      action: 'avaliou',
      content:
        "Hometown's Embrace - 'Que drama incrível! A química entre os protagonistas é perfeita...'",
      time: 'há 2 horas',
      avatar: 'MC',
      type: 'review',
      likes: 23,
      comments: 5,
    },
    {
      id: '2',
      user: 'JoãoSilva',
      action: 'criou a lista',
      content:
        '"Dramas de Comédia 2024" - Compilei os melhores doramas de comédia do ano. Que acham?',
      time: 'há 4 horas',
      avatar: 'JS',
      type: 'list',
      likes: 18,
      comments: 7,
    },
  ];

  return (
    <div className="mb-16">
      {/* Card principal sem borda externa */}
      <div className="bg-white rounded-3xl shadow-lg p-8 transition-all duration-300 relative overflow-hidden">
        {/* Efeitos 3D roxos */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/5 hover:from-purple-500/10 hover:to-purple-600/10 transition-all duration-300"></div>
        <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(147,51,234,0.15)] transition-all duration-300"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-40"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Atividade Mais Recente
            </h2>
            <p className="text-gray-600">
              Veja o que a comunidade está discutindo
            </p>
          </div>

          {/* Activities */}
          <div className="space-y-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="group bg-gradient-to-r from-gray-50 to-white border-2 border-gray-100 hover:border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Card hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-600/0 group-hover:from-purple-500/5 group-hover:to-purple-600/5 transition-all duration-300 rounded-2xl"></div>

                <div className="relative z-10 flex gap-4">
                  {/* Avatar melhorado */}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center font-semibold text-purple-700 text-sm border-2 border-purple-200 group-hover:scale-105 transition-transform duration-300">
                    {activity.avatar}
                  </div>

                  <div className="flex-1">
                    {/* Header do post */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                        {activity.user}
                      </span>
                      <span className="text-gray-600">{activity.action}</span>

                      {/* Indicadores de tipo */}
                      {activity.type === 'review' && (
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      )}
                      {activity.type === 'list' && (
                        <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">
                          <List className="w-4 h-4 text-blue-500" />
                          <span className="text-xs font-medium text-blue-700">
                            Lista
                          </span>
                        </div>
                      )}

                      {/* Timestamp */}
                      <span className="text-sm text-gray-500 ml-auto">
                        {activity.time}
                      </span>
                    </div>

                    {/* Conteúdo */}
                    <p className="text-gray-700 mb-4 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {activity.content}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                      <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-all duration-300 hover:scale-105 bg-gray-50 hover:bg-red-50 px-3 py-2 rounded-xl">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {activity.likes}
                        </span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-all duration-300 hover:scale-105 bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-xl">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {activity.comments}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ver todas button */}
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
            >
              Ver Todas as Atividades
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-3">
          {activities.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
