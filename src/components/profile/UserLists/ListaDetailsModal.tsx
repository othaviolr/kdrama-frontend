import { Lista } from '@/types/lista';
import {
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
  LinkIcon,
  CalendarIcon,
  FilmIcon,
} from '@heroicons/react/24/outline';

interface ListaDetailsModalProps {
  lista: Lista | null;
  onClose: () => void;
}

export function ListaDetailsModal({ lista, onClose }: ListaDetailsModalProps) {
  if (!lista) return null;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Header com imagem */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={lista.imagemCapaUrl || '/placeholder-lista.jpg'}
            alt={lista.nome}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors duration-200"
          >
            <XMarkIcon className="w-6 h-6 text-white" />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
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

          {/* Título sobreposto */}
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-3xl font-bold text-white mb-2">{lista.nome}</h2>
            {lista.descricao && (
              <p className="text-white/90 text-sm leading-relaxed">
                {lista.descricao}
              </p>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6 space-y-6">
          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-center">
              <FilmIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {lista.doramas.length}
              </div>
              <div className="text-sm text-gray-600">
                {lista.doramas.length === 1 ? 'Dorama' : 'Doramas'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 text-center">
              <CalendarIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm font-medium text-blue-600">Criada em</div>
              <div className="text-xs text-gray-600 mt-1">
                {formatDate(lista.dataCriacao)}
              </div>
            </div>
          </div>

          {/* Lista de doramas */}
          {lista.doramas.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Doramas na Lista
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {lista.doramas.map((dorama, index) => (
                  <div
                    key={dorama.doramaId}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-medium text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        Dorama {dorama.doramaId.slice(0, 8)}...
                      </div>
                      <div className="text-xs text-gray-500">
                        Adicionado em {formatDate(dorama.dataAdicao)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FilmIcon className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">Esta lista ainda não tem doramas</p>
            </div>
          )}

          {/* Botão de ação */}
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-lg transition-all duration-200 font-medium"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
