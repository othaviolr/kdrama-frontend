import { Star, Eye, UserPlus, Heart, MessageSquare } from 'lucide-react';

interface Activity {
  id: string;
  type: 'review' | 'rating' | 'list' | 'follow';
  content: string;
  time: string;
  likes?: number;
  comments?: number;
}

interface ActivityTabProps {
  activities: Activity[];
}

export function ActivityTab({ activities }: ActivityTabProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'review':
        return <Star className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />;
      case 'list':
        return <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />;
      case 'rating':
        return <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />;
      default:
        return (
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
        );
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 px-1">
        Atividade Recente
      </h3>

      {activities.map((activity) => (
        <div
          key={activity.id}
          className="border border-gray-100 rounded-xl sm:rounded-2xl p-3 sm:p-6 hover:border-purple-200 transition-colors"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Ícone - menor no mobile */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>

            {/* Conteúdo principal */}
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base text-gray-800 mb-2 sm:mb-3 leading-relaxed">
                {activity.content}
              </p>

              {/* Rodapé - stack no mobile, inline no desktop */}
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0">
                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                  {activity.time}
                </span>

                {(activity.likes || activity.comments) && (
                  <div className="flex items-center gap-3 sm:gap-4">
                    {activity.likes && (
                      <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="font-medium">{activity.likes}</span>
                      </span>
                    )}
                    {activity.comments && (
                      <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="font-medium">{activity.comments}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Estado vazio responsivo */}
      {activities.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
          </div>
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
            Nenhuma atividade ainda
          </h4>
          <p className="text-sm sm:text-base text-gray-600 px-4">
            Suas atividades aparecerão aqui quando você interagir com doramas
          </p>
        </div>
      )}
    </div>
  );
}
