// src/components/reviews/ReviewsHeader.tsx
import { Star, MessageSquare } from 'lucide-react';

interface ReviewsHeaderProps {
  totalReviews: number;
}

export function ReviewsHeader({ totalReviews }: ReviewsHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-purple-100 rounded-xl">
          <Star className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600">Avaliações recentes da comunidade</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {totalReviews}
              </div>
              <div className="text-sm text-gray-600">Avaliações</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4.2</div>
              <div className="text-sm text-gray-600">Nota Média</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">892</div>
              <div className="text-sm text-gray-600">Esta Semana</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">
              Compartilhe sua opinião sobre os doramas!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
