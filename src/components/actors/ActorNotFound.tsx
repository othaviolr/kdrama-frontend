// src/components/actors/ActorNotFound.tsx

import { Users, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ActorNotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        {/* Ícone */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-12 h-12 text-purple-600" />
          </div>
        </div>

        {/* Título e descrição */}
        <div className="mb-8 space-y-3">
          <h1 className="text-2xl font-bold text-gray-900">
            Ator não encontrado
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Desculpe, não conseguimos encontrar as informações deste ator. Ele
            pode ter sido removido ou o link pode estar incorreto.
          </p>
        </div>

        {/* Botões de ação */}
        <div className="space-y-3">
          <button
            onClick={() => router.back()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          <Link
            href="/actors"
            className="w-full bg-white hover:bg-gray-50 text-purple-600 py-3 px-6 rounded-xl font-medium transition-colors duration-200 border border-purple-200 hover:border-purple-300 flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            Explorar Atores
          </Link>
        </div>

        {/* Sugestões */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Você também pode:</p>
          <div className="space-y-2 text-sm">
            <Link
              href="/doramas"
              className="block text-purple-600 hover:text-purple-700 hover:underline"
            >
              Explorar doramas
            </Link>
            <Link
              href="/"
              className="block text-purple-600 hover:text-purple-700 hover:underline"
            >
              Ir para a página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
