import { WatchingSection } from '../components/home/WatchingSection';
import { StatsSection } from '../components/home/StatsSection';
import { DiscoverSection } from '../components/home/DiscoverSection';
import { RecentActivitySection } from '../components/home/RecentActivitySection';
import { QuickActionsSection } from '../components/home/QuickActionsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WatchingSection />
        <StatsSection />
        <DiscoverSection />
        <RecentActivitySection />
        <QuickActionsSection />
      </div>
    </div>
  );
}
