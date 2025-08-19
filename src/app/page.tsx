import { HeroWatchingSection } from '../components/home/HeroWatchingSection';
import { ContinueWatchingList } from '../components/home/ContinueWatchingList';
import { StatsSection } from '../components/home/StatsSection';
import { DiscoverSection } from '../components/home/DiscoverSection';
import { RecentActivitySection } from '../components/home/RecentActivitySection';
import { QuickActionsSection } from '../components/home/QuickActionsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Tela inteira roxa */}
      <HeroWatchingSection />

      {/* Lista Continue Assistindo - Seção separada */}
      <ContinueWatchingList />

      {/* Resto das seções */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsSection />
        <DiscoverSection />
        <RecentActivitySection />
        <QuickActionsSection />
      </div>
    </div>
  );
}
