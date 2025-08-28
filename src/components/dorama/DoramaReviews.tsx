'use client';

import { useState, useEffect } from 'react';
import { Star, MessageCircle, User } from 'lucide-react';

interface AvaliacaoPublica {
  id: string;
  usuarioNome: string;
  usuarioFoto?: string;
  nota: number;
  comentario: string;
  recomendadoPor?: string;
  dataAvaliacao: Date;
}

interface DoramaReviewsProps {
  doramaId: string;
  titulo: string;
}

export default function DoramaReviews({
  doramaId,
  titulo,
}: DoramaReviewsProps) {
  const [avaliacoes, setAvaliacoes] = useState<AvaliacaoPublica[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Carregar avaliações do dorama
  const carregarAvaliacoes = async (pagina: number = 1) => {
    setLoading(true);
    try {
      // TODO: Implementar quando tiver o endpoint
      // const response = await avaliacaoService.getAvaliacoesDorama(doramaId, pagina);
      // setAvaliacoes(pagina === 1 ? response : prev => [...prev, ...response]);

      // Por enquanto, sem dados
      setAvaliacoes([]);
      setHasMore(false);
    } catch (error) {
      console.error('Erro ao carregar avaliações:', error);
      setAvaliacoes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAvaliacoes(1);
  }, [doramaId]);

  const renderStars = (nota: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-4 h-4 ${
            i <= nota ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      );
    }
    return stars;
  };

  const formatarData = (data: Date) => {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-6 h-6 text-purple-600" />
        <div>
          <h2 className="text-2xl font-black text-gray-900">Avaliações</h2>
          <p className="text-gray-600">
            {avaliacoes.length}{' '}
            {avaliacoes.length === 1 ? 'avaliação' : 'avaliações'} de {titulo}
          </p>
        </div>
      </div>

      {/* Lista de Avaliações */}
      <div className="space-y-6">
        {avaliacoes.map((avaliacao) => (
          <div
            key={avaliacao.id}
            className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100/50 transition-colors"
          >
            {/* Header da Avaliação */}
            <div className="flex items-start gap-4 mb-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                {avaliacao.usuarioFoto ? (
                  <img
                    src={avaliacao.usuarioFoto}
                    alt={avaliacao.usuarioNome}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-purple-600" />
                )}
              </div>

              {/* Info do Usuário */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-gray-900">
                    {avaliacao.usuarioNome}
                  </h3>
                  <div className="flex items-center gap-1">
                    {renderStars(avaliacao.nota)}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{formatarData(avaliacao.dataAvaliacao)}</span>
                  {avaliacao.recomendadoPor && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      Recomendado por {avaliacao.recomendadoPor}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Comentário */}
            <p className="text-gray-700 leading-relaxed ml-16">
              {avaliacao.comentario}
            </p>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-2 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Botão Carregar Mais */}
        {!loading && hasMore && avaliacoes.length > 0 && (
          <button
            onClick={() => {
              setPage((prev) => prev + 1);
              carregarAvaliacoes(page + 1);
            }}
            className="w-full py-3 px-4 border border-purple-200 rounded-xl font-semibold text-purple-700 hover:bg-purple-50 transition-colors"
          >
            Carregar mais avaliações
          </button>
        )}

        {/* Estado Vazio */}
        {!loading && avaliacoes.length === 0 && (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Nenhuma avaliação ainda
            </h3>
            <p className="text-gray-600">
              Seja o primeiro a avaliar este dorama!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
