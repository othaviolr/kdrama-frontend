import { Lista } from '@/types/lista';
import { useRouter } from 'next/navigation';
import {
  EyeIcon,
  EyeSlashIcon,
  LinkIcon,
  ShareIcon,
  TrashIcon,
  ArrowRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface ListaCardProps {
  lista: Lista;
  onShare: () => void;
  onDelete: () => void;
}

export function ListaCard({ lista, onShare, onDelete }: ListaCardProps) {
  const router = useRouter();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const handleCardClick = () => {
    router.push(`/lista/${lista.id}`);
  };

  return (
    <div className="group relative">
      <div
        onClick={handleCardClick}
        className="bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 overflow-hidden hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
      >
        {/* Imagem de capa */}
        <div className="aspect-video relative overflow-hidden">
          <img
            src={lista.imagemCapaUrl || '/placeholder-lista.jpg'}
            alt={lista.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay escuro no hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Botão central no hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-purple-500 rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
              <ArrowRightIcon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Ações no canto inferior */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
              className="p-2 bg-white rounded-full hover:bg-purple-50 transition-all duration-200 hover:scale-110 shadow-sm"
              title="Compartilhar lista"
            >
              <ShareIcon className="w-4 h-4 text-purple-500" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-2 bg-white rounded-full hover:bg-red-50 transition-all duration-200 hover:scale-110 shadow-sm"
              title="Deletar lista"
            >
              <TrashIcon className="w-4 h-4 text-red-500" />
            </button>
          </div>

          {/* Badges limpos */}
          <div className="absolute top-4 right-4 flex gap-2">
            {lista.publica ? (
              <div className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full border border-green-200">
                <EyeIcon className="w-3 h-3 text-green-600" />
                <span className="text-xs font-medium text-green-700">
                  Público
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full border border-gray-200">
                <EyeSlashIcon className="w-3 h-3 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">
                  Privado
                </span>
              </div>
            )}

            {lista.shareToken && (
              <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full border border-purple-200">
                <LinkIcon className="w-3 h-3 text-purple-600" />
                <span className="text-xs font-medium text-purple-700">
                  Compartilhada
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-5">
          <h3 className="font-semibold text-lg text-black mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors duration-200">
            {lista.nome}
          </h3>

          {lista.descricao && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {lista.descricao}
            </p>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-purple-100">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-semibold text-black">
                {lista.doramas.length}
              </span>
              <span className="text-sm text-gray-500">
                dorama{lista.doramas.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <ClockIcon className="w-3 h-3 text-purple-500" />
              <span className="text-xs font-medium text-black">
                {formatDate(lista.dataCriacao)}
              </span>
            </div>
          </div>
        </div>

        {/* Shimmer effect no hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
}
