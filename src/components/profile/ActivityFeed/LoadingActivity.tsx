export function LoadingActivity() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 bg-gray-200 rounded w-56 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-72 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-gray-200 bg-gray-50 animate-pulse"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="flex items-center justify-between mt-4">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="flex gap-3">
                    <div className="h-3 bg-gray-200 rounded w-8"></div>
                    <div className="h-3 bg-gray-200 rounded w-8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
