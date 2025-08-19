'use client';

import { useState } from 'react';
import { Star, Plus, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Drama } from '@/domain/entities/Drama';

interface DiscoverSectionProps {
  dramas: {
    recommended: Drama[];
    trending: Drama[];
    newest: Drama[];
  };
}

type FilterType = 'recommended' | 'trending' | 'newest';

export const DiscoverSection = ({ dramas }: DiscoverSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('recommended');

  const filters = [
    { key: 'recommended' as FilterType, label: 'Recomendados' },
    { key: 'trending' as FilterType, label: 'Em Alta' },
    { key: 'newest' as FilterType, label: 'Novos' },
  ];

  const currentDramas = dramas[activeFilter] || [];

  const renderStars = (rating: number = 0) => {
    const validRating = Math.max(0, Math.min(5, rating || 0));
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(validRating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getTag = (drama: Drama, filter: FilterType) => {
    switch (filter) {
      case 'trending':
        return 'Em Alta';
      case 'recommended':
        return 'Similar aos seus gostos';
      case 'newest':
        return 'Novo';
      default:
        return null;
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Descobrir</h2>

        {/* Filtros */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFilter === filter.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {currentDramas.slice(0, 12).map((drama) => (
          <Card
            key={drama.id}
            className="p-0 overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            <div className="relative aspect-[3/4]">
              <img
                src={drama.poster}
                alt={drama.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Tag */}
              {getTag(drama, activeFilter) && (
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {getTag(drama, activeFilter)}
                  </span>
                </div>
              )}

              {/* Overlay com botões */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex space-x-2">
                  <Button size="sm" variant="secondary">
                    <Plus className="h-4 w-4 mr-1" />
                    Lista
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm">
                {drama.title}
              </h4>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {renderStars(drama.rating?.average || 0)}
                </div>
                <span className="text-xs text-gray-600">
                  {(drama.rating?.average || 0).toFixed(1)}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
