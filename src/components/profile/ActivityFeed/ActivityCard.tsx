import { Atividade, TipoAtividade } from '@/types/atividade';
import {
  StarIcon,
  ClockIcon,
  ListBulletIcon,
  PlayIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

interface ActivityCardProps {
  atividade: Atividade;
}

export function ActivityCard({ atividade }: ActivityCardProps) {
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
        return <StarSolidIcon className="w-5 h-5 text-yellow-500" />;
      case 'PRATELEIRA':
        return <ListBulletIcon className="w-5 h-5 text-blue-500" />;
      case 'PROGRESSO_TEMPORADA':
        return <PlayIcon className="w-5 h-5 text-green-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityText = (atividade: Atividade) => {
    const { tipo, dados } = atividade;

    switch (tipo) {
      case 'AVALIACAO':
        return `Avaliou "${dados.doramaTitulo}" (Temporada ${dados.temporadaNumero}) com ${dados.nota} estrelas`;

      case 'PRATELEIRA':
        return `Criou a lista "${dados.prateleiraNome}"`;

      case 'PROGRESSO_TEMPORADA':
        if (dados.episodioNumero) {
          return `Assistiu episódio ${dados.episodioNumero} de "${dados.doramaTitulo}" (Temporada ${dados.temporadaNumero})`;
        }
        return `Iniciou "${dados.doramaTitulo}" (Temporada ${dados.temporadaNumero})`;

      default:
        return 'Atividade desconhecida';
    }
  };

  const getActivityColor = (tipo: TipoAtividade) => {
    switch (tipo) {
      case 'AVALIACAO':
        return 'from-yellow-50 to-orange-50 border-yellow-200';
      case 'PRATELEIRA':
        return 'from-blue-50 to-indigo-50 border-blue-200';
      case 'PROGRESSO_TEMPORADA':
        return 'from-green-50 to-emerald-50 border-green-200';
      default:
        return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  const renderStars = (nota?: number) => {
    if (!nota) return null;

    return (
      <div className="flex items-center gap-1 mt-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="inline-block">
            {i < nota ? (
              <StarSolidIcon className="w-3 h-3 text-yellow-400" />
            ) : (
              <StarIcon className="w-3 h-3 text-gray-300" />
            )}
          </span>
        ))}
        <span className="text-xs text-gray-600 ml-1">{nota}/5</span>
      </div>
    );
  };

  return (
    <div
      className={`relative p-6 rounded-2xl border bg-gradient-to-br ${getActivityColor(atividade.tipo)} hover:shadow-md transition-all duration-200`}
    >
      <div className="flex gap-4">
        {/* Ícone da atividade */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            {getActivityIcon(atividade.tipo)}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 min-w-0">
          {/* Título da atividade */}
          <p className="text-gray-900 font-medium text-sm leading-relaxed mb-2">
            {getActivityText(atividade)}
          </p>

          {/* Comentário da avaliação */}
          {atividade.dados.comentario && (
            <div className="bg-white/60 rounded-xl p-3 mb-3 border border-white/50">
              <p className="text-gray-700 text-sm italic">
                "{atividade.dados.comentario}"
              </p>
            </div>
          )}

          {/* Estrelas para avaliações */}
          {atividade.tipo === 'AVALIACAO' && renderStars(atividade.dados.nota)}

          {/* Footer com timestamp e ações */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <ClockIcon className="w-3 h-3" />
              {formatTimeAgo(atividade.dataCriacao)}
            </div>

            {/* Ações (placeholder para futuras funcionalidades) */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors">
                <HeartIcon className="w-3 h-3" />
                <span>0</span>
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-500 transition-colors">
                <ChatBubbleLeftIcon className="w-3 h-3" />
                <span>0</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
