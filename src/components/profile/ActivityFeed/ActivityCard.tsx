import { Atividade, TipoAtividade } from '@/types/atividade';
import {
  StarIcon,
  ClockIcon,
  ListBulletIcon,
  PlayIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  SparklesIcon,
  TvIcon,
} from '@heroicons/react/24/outline';
import {
  StarIcon as StarSolidIcon,
  HeartIcon as HeartSolidIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

interface ActivityCardProps {
  atividade: Atividade;
}

export function ActivityCard({ atividade }: ActivityCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    if (diffInDays === 1) return 'Ontem';
    if (diffInDays < 7) return `${diffInDays} dias atrás`;

    return date.toLocaleDateString('pt-BR');
  };

  const getActivityIcon = (tipo: TipoAtividade) => {
    switch (tipo) {
      case 'AVALIACAO':
        return <SparklesIcon className="w-6 h-6 text-purple-500" />;
      case 'PRATELEIRA':
        return <ListBulletIcon className="w-6 h-6 text-purple-600" />;
      case 'PROGRESSO_TEMPORADA':
        return <TvIcon className="w-6 h-6 text-purple-400" />;
      default:
        return <ClockIcon className="w-6 h-6 text-gray-500" />;
    }
  };

  const getActivityText = (atividade: Atividade) => {
    const { tipo, dados } = atividade;

    switch (tipo) {
      case 'AVALIACAO':
        return (
          <span>
            Avaliou{' '}
            <span className="font-semibold text-black">
              "{dados.doramaTitulo}"
            </span>
            <span className="text-gray-500">
              {' '}
              (Temporada {dados.temporadaNumero})
            </span>{' '}
            com {dados.nota} estrelas
          </span>
        );

      case 'PRATELEIRA':
        return (
          <span>
            Criou a lista{' '}
            <span className="font-semibold text-black">
              "{dados.prateleiraNome}"
            </span>
          </span>
        );

      case 'PROGRESSO_TEMPORADA':
        if (dados.episodioNumero) {
          return (
            <span>
              Assistiu episódio{' '}
              <span className="font-semibold text-purple-600">
                {dados.episodioNumero}
              </span>{' '}
              de{' '}
              <span className="font-semibold text-black">
                "{dados.doramaTitulo}"
              </span>
              <span className="text-gray-500">
                {' '}
                (Temporada {dados.temporadaNumero})
              </span>
            </span>
          );
        }
        return (
          <span>
            Iniciou{' '}
            <span className="font-semibold text-black">
              "{dados.doramaTitulo}"
            </span>
            <span className="text-gray-500">
              {' '}
              (Temporada {dados.temporadaNumero})
            </span>
          </span>
        );

      default:
        return 'Atividade desconhecida';
    }
  };

  const getActivityTheme = (tipo: TipoAtividade) => {
    switch (tipo) {
      case 'AVALIACAO':
        return {
          gradient: 'from-purple-50 to-white',
          border: 'border-purple-100',
          accent: 'text-purple-600',
        };
      case 'PRATELEIRA':
        return {
          gradient: 'from-purple-50 to-white',
          border: 'border-purple-100',
          accent: 'text-purple-700',
        };
      case 'PROGRESSO_TEMPORADA':
        return {
          gradient: 'from-purple-50 to-white',
          border: 'border-purple-100',
          accent: 'text-purple-500',
        };
      default:
        return {
          gradient: 'from-gray-50 to-white',
          border: 'border-gray-200',
          accent: 'text-gray-600',
        };
    }
  };

  const renderStars = (nota?: number) => {
    if (!nota) return null;

    return (
      <div className="flex items-center gap-1.5 mt-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className="inline-block transform transition-all duration-200 hover:scale-110"
            >
              {i < nota ? (
                <StarSolidIcon className="w-4 h-4 text-yellow-400 drop-shadow-sm" />
              ) : (
                <StarIcon className="w-4 h-4 text-gray-300" />
              )}
            </span>
          ))}
        </div>
        <span className="text-sm font-medium text-black ml-1">{nota}/5</span>
      </div>
    );
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const theme = getActivityTheme(atividade.tipo);

  return (
    <div className="group relative">
      {/* Card principal */}
      <div
        className={`
          relative p-6 rounded-2xl border
          bg-gradient-to-br ${theme.gradient} ${theme.border}
          hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1
          transition-all duration-300 ease-out
          overflow-hidden
        `}
      >
        {/* Elemento decorativo de fundo */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 -translate-y-4 translate-x-4">
          {getActivityIcon(atividade.tipo)}
        </div>

        <div className="flex gap-4 relative z-10">
          {/* Ícone da atividade */}
          <div className="flex-shrink-0">{getActivityIcon(atividade.tipo)}</div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            {/* Título da atividade */}
            <div className="mb-3">
              <p className="text-gray-700 text-base leading-relaxed">
                {getActivityText(atividade)}
              </p>
            </div>

            {/* Comentário da avaliação */}
            {atividade.dados.comentario && (
              <div className="bg-white rounded-xl p-4 mb-4 border border-purple-100">
                <div className="flex items-start gap-2">
                  <ChatBubbleLeftIcon className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{atividade.dados.comentario}"
                  </p>
                </div>
              </div>
            )}

            {/* Estrelas para avaliações */}
            {atividade.tipo === 'AVALIACAO' &&
              renderStars(atividade.dados.nota)}

            {/* Footer com timestamp e ações */}
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-purple-100">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-black">
                  {formatTimeAgo(atividade.dataCriacao)}
                </span>
              </div>

              {/* Ações interativas */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLike}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium
                    transition-all duration-300 group/like
                    ${
                      isLiked
                        ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                        : 'text-gray-500 hover:text-purple-500 hover:bg-purple-50'
                    }
                  `}
                >
                  {isLiked ? (
                    <HeartSolidIcon className="w-4 h-4 animate-pulse" />
                  ) : (
                    <HeartIcon className="w-4 h-4 group-hover/like:scale-110 transition-transform" />
                  )}
                  <span className="min-w-[12px] text-center">{likes}</span>
                </button>

                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-gray-500 hover:text-purple-500 hover:bg-purple-50 transition-all duration-300 group/comment">
                  <ChatBubbleLeftIcon className="w-4 h-4 group-hover/comment:scale-110 transition-transform" />
                  <span>0</span>
                </button>
              </div>
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
