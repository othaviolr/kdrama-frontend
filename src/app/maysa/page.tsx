'use client';

import React, { useState } from 'react';
import { Film, User, Calendar, Play, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';

interface Ator {
  id: string;
  nome: string;
}

interface AtorFormProps {
  selectedAtores: Ator[];
  onAtoresChange: (atores: Ator[]) => void;
}

const DoramaForm = dynamic(() => import('@/components/maysa/DoramaForm'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
    </div>
  ),
});

const AtorForm = dynamic<AtorFormProps>(
  () => import('@/components/maysa/AtorForm'),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
      </div>
    ),
  }
);

const TemporadaForm = dynamic(
  () => import('@/components/maysa/TemporadaForm'),
  {
    ssr: false,
    loading: () => (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
      </div>
    ),
  }
);

const EpisodioForm = dynamic(() => import('@/components/maysa/EpisodioForm'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-purple-500 border-t-transparent"></div>
    </div>
  ),
});

type TabType = 'dorama' | 'ator' | 'temporada' | 'episodio';

export default function MaysaPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dorama');
  const [selectedAtores, setSelectedAtores] = useState<Ator[]>([]);

  const tabs = [
    {
      id: 'dorama',
      label: 'Criar Dorama',
      icon: Film,
      color: 'from-purple-500 to-violet-600',
    },
    {
      id: 'ator',
      label: 'Criar Ator',
      icon: User,
      color: 'from-violet-500 to-purple-600',
    },
    {
      id: 'temporada',
      label: 'Criar Temporada',
      icon: Calendar,
      color: 'from-purple-600 to-indigo-600',
    },
    {
      id: 'episodio',
      label: 'Criar Episódio',
      icon: Play,
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const handleAtoresChange = (atores: Ator[]) => {
    setSelectedAtores(atores);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dorama':
        return <DoramaForm />;
      case 'ator':
        return (
          <AtorForm
            selectedAtores={selectedAtores}
            onAtoresChange={handleAtoresChange}
          />
        );
      case 'temporada':
        return <TemporadaForm />;
      case 'episodio':
        return <EpisodioForm />;
      default:
        return <DoramaForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
              내 사랑, 메이사에게
            </h1>
            <Sparkles className="w-8 h-8 text-violet-600" />
          </div>
          <p className="text-gray-600 text-lg">
            Pra gente criar os doramas e etc
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105
                  ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-purple-500/25`
                      : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-200'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-purple-500/10 border border-purple-100 overflow-hidden">
            {renderActiveComponent()}
          </div>
        </div>
      </div>
    </div>
  );
}
