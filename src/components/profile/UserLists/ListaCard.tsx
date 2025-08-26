import { Lista } from '@/types/lista';
import { useRouter } from 'next/navigation';
import {
  EyeIcon,
  EyeSlashIcon,
  LinkIcon,
  ShareIcon,
  TrashIcon,
  ArrowRightIcon,
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
    <div
      onClick={handleCardClick}
      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-2"
    >
      {/* Imagem de capa */}
      <div className="aspect-video relative overflow-hidden">
        <img
          src={lista.imagemCapaUrl || '/placeholder-lista.jpg'}
          alt={lista.nome}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Overlay com ações */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Botão de ver detalhes no centro */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <ArrowRightIcon className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Ações no canto inferior */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
              className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
              title="Compartilhar lista"
            >
              <ShareIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="p-3 bg-red-500/80 backdrop-blur-md rounded-full hover:bg-red-600/90 transition-all duration-200 hover:scale-110"
              title="Deletar lista"
            >
              <TrashIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Badges modernizados */}
        <div className="absolute top-4 right-4 flex gap-2">
          {lista.publica ? (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-green-500/90 backdrop-blur-md rounded-full text-white text-xs font-medium">
              <EyeIcon className="w-3 h-3" />
              Público
            </div>
          ) : (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-600/90 backdrop-blur-md rounded-full text-white text-xs font-medium">
              <EyeSlashIcon className="w-3 h-3" />
              Privado
            </div>
          )}

          {lista.shareToken && (
            <div className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/90 backdrop-blur-md rounded-full text-white text-xs font-medium">
              <LinkIcon className="w-3 h-3" />
              Compartilhada
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo modernizado */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-1 group-hover:text-purple-600 transition-colors duration-200">
          {lista.nome}
        </h3>

        {lista.descricao && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {lista.descricao}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-purple-600">
              {lista.doramas.length} doramas
            </span>
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(lista.dataCriacao)}
          </span>
        </div>
      </div>
    </div>
  );
}
