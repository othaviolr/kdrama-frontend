'use client';

import { useEffect } from 'react';
import {
  MessageSquare,
  Heart,
  Clock,
  Star,
  List,
  UserPlus,
} from 'lucide-react';
import { useAtividade } from '../../context/AtividadeContext';
import { Atividade, TipoAtividade } from '@/types/atividade';

interface ActivityFeedProps {
  usuarioId: string;
}

export function ActivityFeed({ usuarioId }: ActivityFeedProps) {
  const { atividades, loading, atividadesUsuario } = useAtividade();

  useEffect(() => {
    atividadesUsuario(usuarioId);
  }, [usuarioId]);

  const getActivityIcon = (tipo: TipoAtividade) => {
    switch (tipo) {
      case 'AVALIACAO':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'PRATELEIRA':
        return <List className="w-5 h-5 text-blue-500" />;
      case 'PROGRESSO_TEMPORADA':
        return <Clock className="w-5 h-5 text-green-500" />;
      default:
        return <MessageSquare className="w-5 h-5 text-gray-500" />;
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
        return `Atualizou progresso em "${dados.doramaTitulo}"`;

      default:
        return 'Atividade desconhecida';
    }
  };

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

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Carregando atividades...</p>
      </div>
    );
  }

  if (atividades.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma atividade ainda
        </h3>
        <p className="text-gray-600">
          Quando você começar a usar a plataforma, suas atividades aparecerão
          aqui
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Atividades Recentes ({atividades.length})
      </h3>

      {atividades.map((atividade) => (
        <div
          key={atividade.id}
          className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              {getActivityIcon(atividade.tipo)}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-gray-900 font-medium">
              {getActivityText(atividade)}
            </p>

            {atividade.dados.comentario && (
              <p className="text-gray-600 mt-1 text-sm">
                "{atividade.dados.comentario}"
              </p>
            )}

            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatTimeAgo(atividade.dataCriacao)}
              </span>

              {/* Placeholder para interações futuras */}
              <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                <Heart className="w-4 h-4" />
                <span>0</span>
              </button>

              <button className="flex items-center gap-1 hover:text-purple-600 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>0</span>
              </button>
            </div>
          </div>
        </div>
      ))}

      {atividades.length > 10 && (
        <div className="text-center pt-4">
          <button className="text-purple-600 hover:text-purple-700 font-medium">
            Ver mais atividades
          </button>
        </div>
      )}
    </div>
  );
}
