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
        className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-200"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Voltar
      </button>

      <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl">
        <div className="aspect-[3/1] relative">
          <img
            src={lista.imagemCapaUrl || '/placeholder-lista.jpg'}
            alt={lista.nome}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

          <div className="absolute inset-0 flex items-end p-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {lista.publica ? (
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-green-500/90 backdrop-blur-md rounded-full text-white text-sm font-medium">
                    <EyeIcon className="w-4 h-4" />
                    Público
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-600/90 backdrop-blur-md rounded-full text-white text-sm font-medium">
                    <EyeSlashIcon className="w-4 h-4" />
                    Privado
                  </div>
                )}

                {lista.shareToken && (
                  <div className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/90 backdrop-blur-md rounded-full text-white text-sm font-medium">
                    <LinkIcon className="w-4 h-4" />
                    Compartilhada
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                {lista.nome}
              </h1>

              {lista.descricao && (
                <p className="text-white/90 text-lg max-w-2xl leading-relaxed">
                  {lista.descricao}
                </p>
              )}
            </div>

            <button
              onClick={onShare}
              className="p-4 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-white/30 transition-all duration-200 hover:scale-110"
              title="Compartilhar lista"
            >
              <ShareIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
