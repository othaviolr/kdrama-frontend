'use client';

import { Activity, Star, List, Users, Settings } from 'lucide-react';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs = [
    {
      id: 'atividade',
      label: 'Atividades',
      icon: Activity,
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: Star,
    },
    {
      id: 'listas',
      label: 'Listas',
      icon: List,
    },
    {
      id: 'seguidores',
      label: 'Seguidores',
      icon: Users,
    },
    {
      id: 'configuracoes',
      label: 'Configurações',
      icon: Settings,
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-lg overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
