interface FollowersTabsProps {
  activeTab: 'seguidores' | 'seguindo';
  onTabChange: (tab: 'seguidores' | 'seguindo') => void;
  seguidoresCount: number;
  seguindoCount: number;
}

export function FollowersTabs({
  activeTab,
  onTabChange,
  seguidoresCount,
  seguindoCount,
}: FollowersTabsProps) {
  return (
    <div className="flex space-x-1 bg-purple-50 rounded-2xl p-1 border border-purple-100">
      <button
        onClick={() => onTabChange('seguidores')}
        className={`flex-1 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
          activeTab === 'seguidores'
            ? 'bg-white text-purple-600 shadow-sm ring-1 ring-purple-200'
            : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
        }`}
      >
        <span className="block">Seguidores</span>
        <span
          className={`text-xs ${
            activeTab === 'seguidores' ? 'text-purple-500' : 'text-gray-500'
          }`}
        >
          {seguidoresCount}
        </span>
      </button>
      <button
        onClick={() => onTabChange('seguindo')}
        className={`flex-1 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
          activeTab === 'seguindo'
            ? 'bg-white text-purple-600 shadow-sm ring-1 ring-purple-200'
            : 'text-gray-600 hover:text-purple-600 hover:bg-white/50'
        }`}
      >
        <span className="block">Seguindo</span>
        <span
          className={`text-xs ${
            activeTab === 'seguindo' ? 'text-purple-500' : 'text-gray-500'
          }`}
        >
          {seguindoCount}
        </span>
      </button>
    </div>
  );
}
