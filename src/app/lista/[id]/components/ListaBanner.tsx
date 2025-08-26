import { Lista } from '@/types/lista';
import {
  ArrowLeftIcon,
  ShareIcon,
  EyeIcon,
  EyeSlashIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

interface ListaBannerProps {
  lista: Lista;
  onBack: () => void;
  onShare: () => void;
}

export function ListaBanner({ lista, onBack, onShare }: ListaBannerProps) {
  return (
    <div className="mb-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-200 font-medium"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Voltar
      </button>

      <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm border border-gray-100">
        <div className="h-80 md:h-96 relative">
          <img
            src={lista.imagemCapaUrl || '/placeholder-lista.jpg'}
            alt={lista.nome}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

          <div className="absolute inset-0 flex items-end p-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {lista.publica ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 border border-green-200 rounded-full">
                    <EyeIcon className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      Público
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-full">
                    <EyeSlashIcon className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Privado
                    </span>
                  </div>
                )}

                {lista.shareToken && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 border border-purple-200 rounded-full">
                    <LinkIcon className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">
                      Compartilhada
                    </span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                {lista.nome}
              </h1>

              {lista.descricao && (
                <p className="text-white text-lg max-w-2xl leading-relaxed drop-shadow-md">
                  {lista.descricao}
                </p>
              )}
            </div>

            <button
              onClick={onShare}
              className="p-4 bg-white rounded-2xl hover:bg-purple-50 transition-all duration-200 hover:scale-105 shadow-sm"
              title="Compartilhar lista"
            >
              <ShareIcon className="w-6 h-6 text-purple-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
