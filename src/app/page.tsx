'use client';

import { ContinueWatchingSection } from '@/components/home/ContinueWatchingSection';

export default function HomePage() {
  // Mock data baseado nas imagens
  const mockCurrentDrama = {
    id: '1',
    title: "Hometown's Embrace",
    currentEpisode: 12,
    totalEpisodes: 16,
    currentSeason: 1,
    progress: 75,
  };

  const mockOtherDramas = [
    {
      id: '2',
      title: 'Queen of Tears',
      currentEpisode: 8,
      totalEpisodes: 16,
      progress: 50,
      gradient: 'pink' as const,
    },
    {
      id: '3',
      title: 'Business Proposal',
      currentEpisode: 4,
      totalEpisodes: 12,
      progress: 33,
      gradient: 'blue' as const,
    },
    {
      id: '4',
      title: 'Romance is Bonus',
      currentEpisode: 6,
      totalEpisodes: 16,
      progress: 37,
      gradient: 'green' as const,
    },
    {
      id: '5',
      title: 'Strong Girl',
      currentEpisode: 2,
      totalEpisodes: 16,
      progress: 12,
      gradient: 'orange' as const,
    },
    {
      id: '6',
      title: 'My Demon',
      currentEpisode: 1,
      totalEpisodes: 16,
      progress: 6,
      gradient: 'purple' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ContinueWatchingSection
        currentDrama={mockCurrentDrama}
        otherDramas={mockOtherDramas}
      />

      {/* Placeholder para outras seções */}
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎉 Frontend funcionando!
        </h2>
        <p className="text-gray-600">
          Agora vamos criar as outras seções baseadas no seu design
        </p>
      </div>
    </div>
  );
}
