'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { DoramaCompleto } from '@/types/admin';
import PlaylistSearch from '@/components/playlist/PlaylistSearch';
import PlaylistForm from '@/components/playlist/PlaylistForm';

export default function PlaylistPage() {
  const [selectedDorama, setSelectedDorama] = useState<DoramaCompleto | null>(null);

  const handleDoramaSelect = (dorama: DoramaCompleto) => {
    console.log('🎬 Dorama selecionado na página:', dorama.titulo);
    setSelectedDorama(dorama);
  };

  const handleDoramaChange = (dorama: DoramaCompleto | null) => {
    console.log('🔄 Alterando dorama:', dorama?.titulo || 'Nenhum');
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
            Busque e vincule playlists do Spotify aos doramas
          </p>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Busca de Dorama */}
          <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 overflow-visible relative z-40">
            <PlaylistSearch onDoramaSelect={handleDoramaSelect} />
          </div>

          {/* Formulário de Playlists com Busca do Spotify */}
          {selectedDorama && (
            <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 overflow-hidden relative z-30 animate-fade-in">
              <PlaylistForm 
                selectedDorama={selectedDorama} 
                onDoramaChange={handleDoramaChange}
              />
            </div>
          )}

          {/* Estado vazio quando nenhum dorama está selecionado */}
          {!selectedDorama && (
            <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 p-12 text-center animate-fade-in">
              <div className="max-w-md mx-auto">
                <Sparkles className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Selecione um dorama
                </h3>
                <p className="text-gray-600">
                  Use o campo de busca acima para selecionar um dorama e começar a vincular playlists do Spotify
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}