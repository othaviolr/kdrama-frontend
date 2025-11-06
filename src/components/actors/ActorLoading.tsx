import { Users } from 'lucide-react';

export default function ActorLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <div className="relative min-h-[60vh] bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="absolute inset-0 flex items-end p-6">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col lg:flex-row gap-8 items-end">
              {/* Foto skeleton */}
              <div className="w-64 h-80 bg-white/20 rounded-2xl animate-pulse"></div>

              {/* Informações skeleton */}
              <div className="flex-1 space-y-4">
                <div className="h-12 bg-white/20 rounded-lg animate-pulse w-2/3"></div>
                <div className="h-6 bg-white/20 rounded-lg animate-pulse w-1/2"></div>
                <div className="flex gap-4">
                  <div className="h-8 bg-white/20 rounded-full animate-pulse w-24"></div>
                  <div className="h-8 bg-white/20 rounded-full animate-pulse w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Cards skeleton */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-48"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-3/5"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mt-1"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="fixed bottom-8 right-8">
        <div className="bg-purple-600 text-white p-4 rounded-full shadow-lg">
          <Users className="w-6 h-6 animate-spin" />
        </div>
      </div>
    </div>
  );
}