'use client';

import { useState, useEffect } from 'react';
import { X, Star, Send } from 'lucide-react';
import { DoramaCompleto } from '@/types/dorama';
import { useAvaliacao } from 'src/context/AvaliacaoContext';

interface AvaliacaoModalProps {
  dorama: DoramaCompleto;
  onClose: () => void;
  onAvaliacaoSalva?: () => void;
}

export function AvaliacaoModal({
  dorama,
  onClose,
  onAvaliacaoSalva,
}: AvaliacaoModalProps) {
  const {
    minhaAvaliacao,
    loading,
    criarAvaliacao,
    atualizarAvaliacao,
    deletarAvaliacao,
    obterAvaliacao,
  } = useAvaliacao();

  const [nota, setNota] = useState(0);
  const [hoverNota, setHoverNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [recomendadoPor, setRecomendadoPor] = useState('');

  const temporadaId = dorama.temporadas[0]?.id;

  useEffect(() => {
    if (temporadaId) {
      obterAvaliacao(temporadaId);
    }
  }, [temporadaId, obterAvaliacao]);

  useEffect(() => {
    if (minhaAvaliacao) {
      setNota(minhaAvaliacao.nota);
      setComentario(minhaAvaliacao.comentario);
      setRecomendadoPor(minhaAvaliacao.recomendadoPor || '');
    }
  }, [minhaAvaliacao]);

  const handleSubmit = async () => {
    if (!temporadaId || nota === 0 || !comentario.trim()) return;

    try {
      const dados = {
        temporadaId,
        nota,
        comentario: comentario.trim(),
        recomendadoPorNomeLivre: recomendadoPor.trim() || undefined,
      };

      if (minhaAvaliacao) {
        await atualizarAvaliacao(dados);
      } else {
        await criarAvaliacao(dados);
      }

      if (onAvaliacaoSalva) {
        onAvaliacaoSalva();
      }

      onClose();
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
    }
  };

  const handleDelete = async () => {
    if (!temporadaId || !minhaAvaliacao) return;

    if (confirm('Tem certeza que deseja excluir sua avaliação?')) {
      try {
        await deletarAvaliacao(temporadaId);
        onClose();
      } catch (error) {
        console.error('Erro ao deletar avaliação:', error);
      }
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= (hoverNota || nota);
      stars.push(
        <button
          key={i}
          type="button"
          onClick={() => setNota(i)}
          onMouseEnter={() => setHoverNota(i)}
          onMouseLeave={() => setHoverNota(0)}
          className={`text-3xl transition-colors ${
            filled ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
          }`}
        >
          <Star className={`w-8 h-8 ${filled ? 'fill-current' : ''}`} />
        </button>
      );
    }
    return stars;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {minhaAvaliacao ? 'Editar Avaliação' : 'Avaliar Dorama'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{dorama.titulo}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Rating */}
          <div className="text-center">
            <label className="block text-sm font-semibold text-gray-900 mb-4">
              Sua Nota
            </label>
            <div className="flex justify-center gap-1 mb-2">
              {renderStars()}
            </div>
            <p className="text-sm text-gray-600">
              {nota > 0 ? `${nota} de 5 estrelas` : 'Clique para avaliar'}
            </p>
          </div>

          {/* Comentário */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Seu Comentário
            </label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Compartilhe sua opinião sobre este dorama..."
              className="w-full h-32 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {comentario.length}/500 caracteres
            </p>
          </div>

          {/* Recomendado por (opcional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Recomendado por (opcional)
            </label>
            <input
              type="text"
              value={recomendadoPor}
              onChange={(e) => setRecomendadoPor(e.target.value)}
              placeholder="Nome de quem recomendou"
              className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={100}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 rounded-b-2xl p-6 border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>

            {minhaAvaliacao && (
              <button
                onClick={handleDelete}
                className="px-4 py-3 border border-red-300 rounded-xl font-semibold text-red-700 hover:bg-red-50 transition-colors"
              >
                Excluir
              </button>
            )}

            <button
              onClick={handleSubmit}
              disabled={nota === 0 || !comentario.trim() || loading}
              className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {minhaAvaliacao ? 'Atualizar' : 'Publicar'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
