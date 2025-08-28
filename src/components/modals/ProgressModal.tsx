'use client';

import { useState, useEffect } from 'react';
import { X, Play, Clock, Pause, Ban, CheckCircle, Star } from 'lucide-react';
import { DoramaCompleto, Temporada } from '@/types/dorama';
import {
  StatusDoramaEnum,
  StatusDoramaLabels,
  StatusDoramaColors,
} from '@/types/progresso';
import { useProgresso } from 'src/context/ProgressoContext';

interface ProgressModalProps {
  dorama: DoramaCompleto;
  onClose: () => void;
}

export function ProgressModal({ dorama, onClose }: ProgressModalProps) {
  const {
    atualizarStatus,
    atualizarProgresso,
    obterProgresso,
    loading,
    carregarProgressos,
  } = useProgresso();
  const [selectedStatus, setSelectedStatus] = useState<StatusDoramaEnum | null>(
    null
  );
  const [selectedSeason, setSelectedSeason] = useState<Temporada | null>(null);
  const [episodiosAssistidos, setEpisodiosAssistidos] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  console.log('🎬 MODAL - ProgressModal abriu para dorama:', dorama.titulo);
  console.log(
    '🎬 MODAL - Temporadas disponíveis:',
    dorama.temporadas.map((t) => ({ id: t.id, nome: t.nome }))
  );

  useEffect(() => {
    if (dorama.temporadas.length > 0) {
      const primeiraTemporada = dorama.temporadas[0];
      setSelectedSeason(primeiraTemporada);

      const progressoExistente = obterProgresso(primeiraTemporada.id);
      if (progressoExistente) {
        setSelectedStatus(progressoExistente.status);
        setEpisodiosAssistidos(progressoExistente.episodiosAssistidos);
      }
    }
  }, [dorama.temporadas, obterProgresso]);

  useEffect(() => {
    if (selectedSeason) {
      const progressoExistente = obterProgresso(selectedSeason.id);
      if (progressoExistente) {
        setSelectedStatus(progressoExistente.status);
        setEpisodiosAssistidos(progressoExistente.episodiosAssistidos);
      } else {
        setSelectedStatus(null);
        setEpisodiosAssistidos(0);
      }
    }
  }, [selectedSeason, obterProgresso]);

  const statusOptions = [
    {
      status: StatusDoramaEnum.PlanejoAssistir,
      icon: Clock,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
    },
    {
      status: StatusDoramaEnum.Assistindo,
      icon: Play,
      color: 'text-green-600 bg-green-50 border-green-200',
    },
    {
      status: StatusDoramaEnum.Pausado,
      icon: Pause,
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    },
    {
      status: StatusDoramaEnum.Abandonado,
      icon: Ban,
      color: 'text-red-600 bg-red-50 border-red-200',
    },
    {
      status: StatusDoramaEnum.Concluido,
      icon: CheckCircle,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
    },
  ];

  const handleSave = async () => {
    if (!selectedSeason || selectedStatus === null) return;

    console.log('💾 Salvando progresso:', {
      temporadaId: selectedSeason.id,
      status: selectedStatus,
      episodiosAssistidos,
      selectedSeason: {
        id: selectedSeason.id,
        nome: selectedSeason.nome,
        doramaId: selectedSeason.doramaId,
      },
    });

    setIsSubmitting(true);
    try {
      // Atualizar status
      console.log('📤 ENVIANDO para API - atualizarStatus:', {
        temporadaId: selectedSeason.id,
        status: selectedStatus,
      });

      const statusResult = await atualizarStatus({
        temporadaId: selectedSeason.id,
        status: selectedStatus,
      });

      console.log('📥 RECEBIDO da API - statusResult:', statusResult);
      console.log(
        '🔑 Campo temporadaId do resultado:',
        statusResult.temporadaId
      );

      if (selectedStatus !== StatusDoramaEnum.PlanejoAssistir) {
        const progressoResult = await atualizarProgresso({
          temporadaId: selectedSeason.id,
          episodiosAssistidos,
        });
        console.log('✅ Progresso salvo:', progressoResult);
        console.log(
          '🔍 Verificando campo temporadaId do resultado:',
          progressoResult?.temporadaId
        );
      }

      console.log('🎉 Tudo salvo! Fechando modal...');

      await new Promise((resolve) => setTimeout(resolve, 100));

      onClose();
    } catch (error) {
      console.error('❌ Erro ao salvar progresso:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEpisodeChange = (value: number) => {
    if (!selectedSeason) return;

    const maxEpisodes = selectedSeason.numeroEpisodios;
    const newValue = Math.max(0, Math.min(value, maxEpisodes));
    setEpisodiosAssistidos(newValue);

    if (newValue === maxEpisodes) {
      setSelectedStatus(StatusDoramaEnum.Concluido);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Atualizar Progresso
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
          {/* Seleção de Temporada */}
          {dorama.temporadas.length > 1 && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Temporada
              </label>
              <div className="grid grid-cols-2 gap-2">
                {dorama.temporadas.map((temporada) => (
                  <button
                    key={temporada.id}
                    onClick={() => setSelectedSeason(temporada)}
                    className={`p-3 rounded-xl border-2 transition-all text-left ${
                      selectedSeason?.id === temporada.id
                        ? 'border-purple-500 bg-purple-50 text-purple-900'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    <div className="font-medium">{temporada.nome}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {temporada.numeroEpisodios} eps
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Status
            </label>
            <div className="grid grid-cols-1 gap-2">
              {statusOptions.map(({ status, icon: Icon, color }) => (
                <button
                  key={status}
                  onClick={() => {
                    console.log(
                      '🎯 MODAL - Status selecionado:',
                      status,
                      StatusDoramaLabels[status]
                    );
                    setSelectedStatus(status);
                  }}
                  className={`p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                    selectedStatus === status
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                  }`}
                >
                  <div className={`p-2 rounded-lg border ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {StatusDoramaLabels[status]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Episódios Assistidos */}
          {selectedStatus !== null &&
            selectedStatus !== StatusDoramaEnum.PlanejoAssistir && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Episódios Assistidos
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleEpisodeChange(episodiosAssistidos - 1)
                      }
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      disabled={episodiosAssistidos <= 0}
                    >
                      -
                    </button>
                    <div className="flex-1 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {episodiosAssistidos}
                      </div>
                      <div className="text-sm text-gray-600">
                        de {selectedSeason?.numeroEpisodios || 0}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        handleEpisodeChange(episodiosAssistidos + 1)
                      }
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      disabled={
                        episodiosAssistidos >=
                        (selectedSeason?.numeroEpisodios || 0)
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: selectedSeason
                          ? `${(episodiosAssistidos / selectedSeason.numeroEpisodios) * 100}%`
                          : '0%',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
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
            <button
              onClick={() => {
                console.log('💾 MODAL - Botão Salvar clicado!');
                console.log('💾 MODAL - selectedSeason:', selectedSeason);
                console.log('💾 MODAL - selectedStatus:', selectedStatus);
                console.log(
                  '💾 MODAL - episodiosAssistidos:',
                  episodiosAssistidos
                );
                handleSave();
              }}
              disabled={selectedStatus === null || isSubmitting}
              className="flex-1 py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
