import { MessageSquare, Star, Eye, Users, Settings } from 'lucide-react';

interface ProfileTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const tabs = [
    { id: 'atividade', label: 'Atividade Recente', icon: MessageSquare },
    { id: 'reviews', label: 'Minhas Reviews', icon: Star },
    { id: 'listas', label: 'Minhas Listas', icon: Eye },
    { id: 'seguidores', label: 'Seguidores', icon: Users },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg mb-8">
      <div className="border-b border-gray-100">
        <nav className="flex gap-8 px-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-purple-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
