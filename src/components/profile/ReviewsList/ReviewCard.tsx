import { AvaliacaoCompleta } from '@/types/avaliacao';
import { StarIcon } from '@heroicons/react/24/solid';
import {
  StarIcon as StarOutlineIcon,
  ClockIcon,
  UserIcon,
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
      <span
        key={i}
        className="inline-block transform transition-all duration-200 hover:scale-110"
      >
        {i < nota ? (
          <StarIcon className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 drop-shadow-sm" />
        ) : (
          <StarOutlineIcon className="w-3 h-3 sm:w-4 sm:h-4 text-gray-300" />
        )}
      </span>
    ));
  };

  return (
    <div className="group relative">
      <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl sm:rounded-2xl border border-purple-100 p-3 sm:p-6 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 transition-all duration-300 ease-out">
        <div className="flex gap-3 sm:gap-5">
          {/* Capa do dorama */}
          <div className="flex-shrink-0">
            <div className="relative overflow-hidden rounded-lg sm:rounded-xl shadow-md sm:shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <img
                src={avaliacao.dorama?.capaUrl || '/placeholder-dorama.jpg'}
                alt={avaliacao.dorama?.titulo || 'Dorama'}
                className="w-16 h-20 sm:w-20 sm:h-28 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Conteúdo da review */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base sm:text-lg text-black mb-1 truncate">
                  {avaliacao.dorama?.titulo || 'Carregando...'}
                </h3>

                {avaliacao.temporada && (
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    <span className="font-medium text-purple-600">
                      {avaliacao.temporada.nome}
                    </span>{' '}
                    • {avaliacao.dorama?.anoLancamento}
                  </p>
                )}

                {/* Estrelas e nota */}
                <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-0.5">
                    {renderStars(avaliacao.nota)}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-black ml-1">
                    {avaliacao.nota}/5
                  </span>
                </div>
              </div>

              {/* Data da avaliação */}
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-gray-600 self-start sm:ml-4">
                <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                <span className="text-black">
                  {formatDate(avaliacao.dataAvaliacao)}
                </span>
              </div>
            </div>

            {/* Comentário */}
            {avaliacao.comentario && (
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 border border-purple-100 mb-2 sm:mb-3">
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic">
                  "{avaliacao.comentario}"
                </p>
              </div>
            )}

            {/* Recomendação */}
            {avaliacao.recomendadoPor && (
              <div className="flex items-center gap-1 sm:gap-2 pt-2 border-t border-purple-100">
                <UserIcon className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                <span className="text-xs sm:text-sm text-gray-600">
                  Recomendado por:{' '}
                  <span className="font-medium text-purple-600">
                    {avaliacao.recomendadoPor}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Shimmer effect no hover */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
}
