export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse"
          >
            <div className="flex gap-4">
              <div className="w-16 h-20 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div
                          key={j}
                          className="w-4 h-4 bg-gray-200 rounded"
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
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
