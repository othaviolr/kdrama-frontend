'use client';

import { Heart, MessageCircle, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Activity } from '@/domain/entities/Social';

interface RecentActivitiesSectionProps {
  activities: Activity[];
}

export const RecentActivitiesSection = ({
  activities,
}: RecentActivitiesSectionProps) => {
  const formatTimeAgo = (date: string): string => {
    const now = new Date();
    const activityDate = new Date(date);
    const diff = now.getTime() - activityDate.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d atrás`;
    if (hours > 0) return `${hours}h atrás`;
    if (minutes > 0) return `${minutes}m atrás`;
    return 'Agora';
  };

  const getActivityText = (activity: Activity): string => {
    switch (activity.type) {
      case 'rated_drama':
        return `avaliou`;
      case 'created_list':
        return `criou uma lista com`;
      case 'reviewed_drama':
        return `comentou sobre`;
      case 'started_watching':
        return `está assistindo`;
      case 'completed_drama':
        return `completou`;
      case 'achievement_unlocked':
        return `desbloqueou uma conquista em`;
      default:
        return `interagiu com`;
    }
  };

  const renderStars = (rating: number): JSX.Element[] => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Atividades Recentes
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex space-x-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {activity.user.avatar ? (
                    <img
                      src={activity.user.avatar}
                      alt={activity.user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {activity.user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">
                        {activity.user.username}
                      </span>{' '}
                      <span className="text-gray-600">
                        {getActivityText(activity)}
                      </span>{' '}
                      {activity.drama && (
                        <span className="font-medium text-gray-900">
                          {activity.drama.title}
                        </span>
                      )}
                    </p>

                    {activity.rating && (
                      <div className="flex items-center space-x-1">
                        {renderStars(activity.rating)}
                      </div>
                    )}
                  </div>

                  {activity.metadata.comment && (
                    <p className="text-sm text-gray-700 mb-3 bg-gray-50 rounded-lg p-3">
                      "{activity.metadata.comment}"
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(activity.createdAt)}
                    </span>

                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                        <Heart className="h-4 w-4" />
                        <span className="text-xs">{activity.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-xs">{activity.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Poster do Drama */}
                {activity.drama && (
                  <div className="flex-shrink-0">
                    <img
                      src={activity.drama.poster}
                      alt={activity.drama.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
