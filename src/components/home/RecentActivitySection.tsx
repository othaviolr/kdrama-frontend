import { MessageCircle, Heart, List, Star } from 'lucide-react';

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
    <div className="mb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
              📱
            </div>
            Atividade Mais Recente
          </h2>
          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            Ver Todas
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors"
            >
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center font-medium text-purple-600 text-sm">
                  {activity.avatar}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">
                      {activity.user}
                    </span>
                    <span className="text-gray-600">{activity.action}</span>
                    {activity.type === 'review' && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    )}
                    {activity.type === 'list' && (
                      <List className="w-4 h-4 text-blue-500" />
                    )}
                  </div>

                  <p className="text-gray-700 mb-3">{activity.content}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {activity.time}
                    </span>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{activity.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{activity.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
