'use client';

import { useEffect } from 'react';
import { useFeed } from 'src/context/FeedContext';
import { MessageCircle, Heart, List, Star, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import {
  TipoAtividadeFeed,
  getTipoAtividadeTexto,
  getTipoAtividadeIcone,
  getTipoAtividadeCor,
} from '@/types/feed';

export function RecentActivitySection() {
  const {
    feed,
    loading,
    loadingMore,
    hasMore,
    error,
    carregarFeed,
    carregarMais,
  } = useFeed();

  useEffect(() => {
    carregarFeed(true);
  }, [carregarFeed]);

  const getIconePorTipo = (tipo: TipoAtividadeFeed) => {
    switch (tipo) {
      case TipoAtividadeFeed.Progresso:
        return Play;
      case TipoAtividadeFeed.Avaliacao:
        return Star;
      case TipoAtividadeFeed.Lista:
        return List;
      default:
        return Star;
    }
  };

  const formatarTempo = (data: Date): string => {
    const agora = new Date();
    const diffMs = agora.getTime() - data.getTime();
    const diffMinutos = Math.floor(diffMs / (1000 * 60));
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutos < 60) {
      return `há ${diffMinutos} minuto${diffMinutos !== 1 ? 's' : ''}`;
    } else if (diffHoras < 24) {
      return `há ${diffHoras} hora${diffHoras !== 1 ? 's' : ''}`;
    } else if (diffDias < 7) {
      return `há ${diffDias} dia${diffDias !== 1 ? 's' : ''}`;
    } else {
      return data.toLocaleDateString('pt-BR');
    }
  };

  const renderEstrelas = (nota?: number) => {
    if (!nota) return null;

    return (
      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-200">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i < nota ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const formatarTextoAcao = (tipo: TipoAtividadeFeed, dados: any) => {
    const baseText = getTipoAtividadeTexto(tipo, dados);

    switch (tipo) {
      case TipoAtividadeFeed.Lista:
        return baseText.replace(
          /"(.*?)"/,
          (match, p1) =>
            ` "<strong class="font-bold text-purple-700">${p1}</strong>"`
        );

      case TipoAtividadeFeed.Avaliacao:
        return baseText.replace(
          dados.doramaTitulo,
          `<em class="italic text-purple-700">${dados.doramaTitulo}</em>`
        );

      case TipoAtividadeFeed.Progresso:
        return baseText.replace(
          dados.doramaTitulo,
          `<strong class="font-bold text-purple-700">${dados.doramaTitulo}</strong>`
        );

      default:
        return baseText;
    }
  };

  if (loading) {
    return (
      <div className="mb-16">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Atividade Mais Recente
            </h2>
            <p className="text-gray-600">Carregando atividades...</p>
          </div>
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-16">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Erro ao carregar atividades
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => carregarFeed(true)}>Tentar Novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-16">
      {/* Card principal sem borda externa */}
      <div className="bg-white rounded-3xl shadow-lg p-8 transition-all duration-300 relative overflow-hidden">
        {/* Efeitos 3D roxos */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/5 via-transparent to-purple-600/5 hover:from-purple-500/10 hover:to-purple-600/10 transition-all duration-300"></div>
        <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(147,51,234,0.15)] transition-all duration-300"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-40"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Atividade Mais Recente
            </h2>
            <p className="text-gray-600">
              Veja o que a comunidade está discutindo
            </p>
          </div>

          {/* Activities */}
          <div className="space-y-6">
            {feed.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhuma atividade encontrada</p>
              </div>
            ) : (
              feed.map((activity) => {
                const IconComponent = getIconePorTipo(activity.tipoAtividade);
                const cor = getTipoAtividadeCor(activity.tipoAtividade);
                const textoFormatado = formatarTextoAcao(
                  activity.tipoAtividade,
                  activity
                );

                return (
                  <div
                    key={activity.id}
                    className="group bg-gradient-to-r from-gray-50 to-white border-2 border-gray-100 hover:border-purple-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Card hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-600/0 group-hover:from-purple-500/5 group-hover:to-purple-600/5 transition-all duration-300 rounded-2xl"></div>

                    <div className="relative z-10 flex gap-4">
                      {/* Avatar com imagem */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-200 group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={
                              activity.usuarioAvatarUrl || '/default-avatar.png'
                            }
                            alt={activity.usuarioNome}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/default-avatar.png';
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex-1">
                        {/* Header do post */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          <span className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                            {activity.usuarioNome}
                          </span>

                          {/* Texto da ação com HTML formatado */}
                          <span
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{ __html: textoFormatado }}
                          />

                          {/* Indicadores de tipo */}
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-lg border ${cor.replace('text', 'bg').replace('600', '50')} ${cor.replace('600', '200')}`}
                          >
                            <IconComponent className={`w-4 h-4 ${cor}`} />
                            <span className={`text-xs font-medium ${cor}`}>
                              {activity.tipoAtividade ===
                                TipoAtividadeFeed.Avaliacao && 'Avaliação'}
                              {activity.tipoAtividade ===
                                TipoAtividadeFeed.Progresso && 'Progresso'}
                              {activity.tipoAtividade ===
                                TipoAtividadeFeed.Lista && 'Lista'}
                            </span>
                          </div>

                          {/* Estrelas para avaliações */}
                          {activity.tipoAtividade ===
                            TipoAtividadeFeed.Avaliacao &&
                            renderEstrelas(activity.nota)}

                          {/* Timestamp */}
                          <span className="text-sm text-gray-500 ml-auto">
                            {formatarTempo(activity.criadoEm)}
                          </span>
                        </div>

                        {/* Conteúdo específico por tipo */}
                        {activity.comentario && (
                          <p className="text-gray-700 mb-4 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                            "{activity.comentario}"
                          </p>
                        )}

                        {/* Detalhes adicionais */}
                        {activity.tipoAtividade ===
                          TipoAtividadeFeed.Progresso && (
                          <p className="text-sm text-gray-600 mb-4">
                            Temporada {activity.temporadaNumero}
                            {activity.episodioNumero}
                          </p>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-6">
                          <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-all duration-300 hover:scale-105 bg-gray-50 hover:bg-red-50 px-3 py-2 rounded-xl">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm font-medium">0</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-all duration-300 hover:scale-105 bg-gray-50 hover:bg-blue-50 px-3 py-2 rounded-xl">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">0</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Load More button */}
          {hasMore && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={carregarMais}
                disabled={loadingMore}
                className="border-purple-200 text-purple-600 hover:bg-purple-50 hover:border-purple-300"
              >
                {loadingMore ? 'Carregando...' : 'Carregar Mais'}
              </Button>
            </div>
          )}

          {/* Ver todas button */}
          {feed.length > 0 && (
            <div className="text-center mt-4">
              <Button
                variant="ghost"
                className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                Ver Todas as Atividades
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom decoration */}
      {feed.length > 0 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-3">
            {[...Array(Math.min(feed.length, 3))].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.5}s` }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
