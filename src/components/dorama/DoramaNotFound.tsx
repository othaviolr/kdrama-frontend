'use client';

import { useRouter } from 'next/navigation';
import { Tv } from 'lucide-react';

export default function DoramaNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Tv className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Dorama não encontrado
        </h2>
        <p className="text-gray-600 mb-4">
          O dorama que você está procurando não existe.
        </p>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
