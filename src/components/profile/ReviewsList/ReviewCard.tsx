import { AvaliacaoCompleta } from '@/types/avaliacao';
import { StarIcon } from '@heroicons/react/24/solid';
import {
  StarIcon as StarOutlineIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

interface ReviewCardProps {
  avaliacao: AvaliacaoCompleta;
}

export function ReviewCard({ avaliacao }: ReviewCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const renderStars = (nota: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className="inline-block">
        {i < nota ? (
          <StarIcon className="w-4 h-4 text-yellow-400" />
        ) : (
          <StarOutlineIcon className="w-4 h-4 text-gray-300" />
        )}
      </span>
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-4">
        {/* Capa do dorama */}
        <div className="flex-shrink-0">
          <img
            src={avaliacao.dorama?.capaUrl || '/placeholder-dorama.jpg'}
            alt={avaliacao.dorama?.titulo || 'Dorama'}
            className="w-16 h-20 object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Conteúdo da review */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                {avaliacao.dorama?.titulo || 'Carregando...'}
              </h3>

              {avaliacao.temporada && (
                <p className="text-sm text-gray-600 mb-2">
                  {avaliacao.temporada.nome} • {avaliacao.dorama?.anoLancamento}
                </p>
              )}

              {/* Estrelas e nota */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {renderStars(avaliacao.nota)}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {avaliacao.nota}/5
                </span>
              </div>
            </div>

            {/* Data da avaliação */}
            <div className="flex items-center gap-1 text-xs text-gray-500 ml-4">
              <CalendarIcon className="w-3 h-3" />
              {formatDate(avaliacao.dataAvaliacao)}
            </div>
          </div>

          {/* Comentário */}
          {avaliacao.comentario && (
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                {avaliacao.comentario}
              </p>
            </div>
          )}

          {/* Recomendação */}
          {avaliacao.recomendadoPor && (
            <div className="mt-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-600">
                Recomendado por: {avaliacao.recomendadoPor}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
