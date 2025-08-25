'use client';

import { Star } from 'lucide-react';

interface ReviewsListProps {
  usuarioId: string;
}

export function ReviewsList({ usuarioId }: ReviewsListProps) {
  return (
    <div className="text-center py-12">
      <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Suas Reviews</h3>
      <p className="text-gray-600">
        Em breve você poderá ver todas as suas reviews aqui
      </p>
    </div>
  );
}
