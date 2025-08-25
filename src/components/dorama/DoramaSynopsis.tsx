'use client';

import { useState } from 'react';

interface DoramaSynopsisProps {
  synopsis: string;
}

export default function DoramaSynopsis({ synopsis }: DoramaSynopsisProps) {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Sinopse</h2>
      <div className="relative">
        <p
          className={`text-gray-700 leading-relaxed ${
            !showFullSynopsis ? 'line-clamp-4' : ''
          }`}
        >
          {synopsis}
        </p>
        {synopsis.length > 200 && (
          <button
            onClick={() => setShowFullSynopsis(!showFullSynopsis)}
            className="mt-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
          >
            {showFullSynopsis ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
      </div>
    </section>
  );
}
