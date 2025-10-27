'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { DoramaCompleto } from '@/types/admin';
import PlaylistSearch from '@/components/playlist/PlaylistSearch';
import PlaylistForm from '@/components/playlist/PlaylistForm';

export default function PlaylistPage() {
  const [selectedDorama, setSelectedDorama] = useState<DoramaCompleto | null>(null);

  const handleDoramaSelect = (dorama: DoramaCompleto) => {
    setSelectedDorama(dorama);
  };

  const handleDoramaChange = (dorama: DoramaCompleto | null) => {
    setSelectedDorama(dorama);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              Playlists do Spotify
            </h1>
            <Sparkles className="w-8 h-8 text-violet-600" />
          </div>
          <p className="text-gray-600 text-lg">
            Associe playlists do Spotify aos doramas
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-8">
          {/* Busca de Dorama - APENAS onDoramaSelect */}
          <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 overflow-hidden relative z-40">
            <PlaylistSearch onDoramaSelect={handleDoramaSelect} />
          </div>

          {/* Formulário de Playlists */}
          <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 overflow-hidden relative z-30">
            <PlaylistForm 
              selectedDorama={selectedDorama} 
              onDoramaChange={handleDoramaChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}