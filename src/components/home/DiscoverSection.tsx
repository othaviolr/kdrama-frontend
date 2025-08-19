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
    <div className="mb-16">
      {/* Card principal com bordas roxas */}
      <div className="bg-white rounded-3xl shadow-lg border-2 border-purple-200 hover:border-purple-300 p-8 transition-all duration-300 relative overflow-hidden">
        {/* Efeitos 3D roxos */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/5 hover:from-purple-500/10 hover:to-purple-600/10 transition-all duration-300"></div>
        <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(147,51,234,0.15)] transition-all duration-300"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-40"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Descobrir</h2>
            <p className="text-gray-600">
              Encontre novos doramas baseados no seu gosto
            </p>
          </div>

          {/* Tabs modernos */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 p-1 bg-purple-50 rounded-2xl border border-purple-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-700 shadow-lg border border-purple-200 transform scale-105'
                      : 'text-purple-600 hover:text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shows Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {shows.map((show) => (
              <div key={show.id} className="group cursor-pointer">
                <div className="aspect-[3/4] mb-4 relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  {/* Background com zoom sofisticado */}
                  <div
                    className={`absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%] ${show.color} opacity-10 group-hover:opacity-25 transition-all duration-700 ease-out transform scale-100 group-hover:scale-110`}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>

                  {/* Máscara de drama */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/30 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/40 transition-all duration-400 ease-out">
                      <span className="text-2xl transform group-hover:scale-105 transition-transform duration-300">
                        🎭
                      </span>
                    </div>
                  </div>

                  {/* Badge */}
                  {show.badge && (
                    <div className="absolute top-3 left-3">
                      <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20">
                        <div className="flex items-center gap-1.5">
                          {show.badge === 'trending' && (
                            <TrendingUp className="w-3 h-3 text-yellow-400" />
                          )}
                          {show.badge === 'similar' && (
                            <MapPin className="w-3 h-3 text-blue-400" />
                          )}
                          <span className="text-xs text-white font-semibold">
                            {show.badge === 'trending' ? 'Em alta' : 'Similar'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Efeito de brilho sutil */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 group-hover:via-white/10 group-hover:to-white/5 transition-all duration-600"></div>
                </div>

                {/* Título */}
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors text-lg">
                  {show.title}
                </h3>

                {/* Rating com estrelas amarelas */}
                <div className="flex items-center gap-1 mb-3">
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
                  <span className="text-sm text-gray-900 ml-1">
                    {show.rating}
                  </span>
                </div>

                {/* Recomendação */}
                <div className="flex items-center gap-1.5 text-sm text-gray-900">
                  <User className="w-3 h-3" />
                  <span>{show.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-3">
          {tabs.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.4}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
