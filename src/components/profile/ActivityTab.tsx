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
        return <Star className="w-5 h-5 text-purple-600" />;
      case 'list':
        return <Eye className="w-5 h-5 text-purple-600" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-purple-600" />;
      case 'rating':
        return <Heart className="w-5 h-5 text-purple-600" />;
      default:
        return <MessageSquare className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Atividade Recente
      </h3>
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="border border-gray-100 rounded-2xl p-6 hover:border-purple-200 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              {getActivityIcon(activity.type)}
            </div>

            <div className="flex-1">
              <p className="text-gray-800 mb-2">{activity.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{activity.time}</span>
                {(activity.likes || activity.comments) && (
                  <div className="flex items-center gap-4">
                    {activity.likes && (
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Heart className="w-4 h-4" />
                        {activity.likes}
                      </span>
                    )}
                    {activity.comments && (
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <MessageSquare className="w-4 h-4" />
                        {activity.comments}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
