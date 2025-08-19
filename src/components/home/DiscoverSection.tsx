'use client';

import { useState } from 'react';
import { Star, TrendingUp, MapPin, User } from 'lucide-react';
import { Button } from '../ui/Button';

interface Show {
  id: string;
  title: string;
  rating: number;
  recommendation: string;
  badge: string;
  color: string;
}

export function DiscoverSection() {
  const [activeTab, setActiveTab] = useState('recommended');

  const shows: Show[] = [
    {
      id: '1',
      title: 'Secret Garden',
      rating: 4.9,
      recommendation: 'Ana recomendou',
      badge: '',
      color: 'bg-green-500',
    },
    {
      id: '2',
      title: 'Crash Landing',
      rating: 4.8,
      recommendation: 'Em alta',
      badge: 'trending',
      color: 'bg-blue-500',
    },
    {
      id: '3',
      title: 'Goblin',
      rating: 4.9,
      recommendation: 'Similar aos seus',
      badge: 'similar',
      color: 'bg-orange-500',
    },
    {
      id: '4',
      title: 'Reply 1988',
      rating: 4.7,
      recommendation: 'João recomendou',
      badge: '',
      color: 'bg-purple-500',
    },
    {
      id: '5',
      title: 'Hospital Playlist',
      rating: 4.8,
      recommendation: 'Em alta',
      badge: 'trending',
      color: 'bg-pink-500',
    },
  ];

  const tabs = [
    { id: 'recommended', label: 'Recomendados', active: true },
    { id: 'trending', label: 'Em Alta', active: false },
    { id: 'new', label: 'Novos', active: false },
  ];

  return (
    <div className="mb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
              🔍
            </div>
            Descobrir
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-gray-100 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Shows Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {shows.map((show) => (
            <div key={show.id} className="group cursor-pointer">
              <div className="aspect-[3/4] mb-4 relative overflow-hidden rounded-xl bg-gray-100">
                <div
                  className={`w-full h-full ${show.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎭</span>
                  </div>
                </div>

                {show.badge && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <div className="flex items-center gap-1">
                        {show.badge === 'trending' && (
                          <TrendingUp className="w-3 h-3 text-white" />
                        )}
                        {show.badge === 'similar' && (
                          <MapPin className="w-3 h-3 text-white" />
                        )}
                        <span className="text-xs text-white font-medium">
                          {show.badge === 'trending' ? 'Em alta' : 'Similar'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <h3 className="font-medium text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {show.title}
              </h3>

              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(show.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
                <span className="text-sm font-medium text-gray-900 ml-1">
                  {show.rating}
                </span>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <User className="w-3 h-3" />
                <span>{show.recommendation}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
