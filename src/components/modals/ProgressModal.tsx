'use client';

import { useState, useEffect } from 'react';
import { X, Play, Clock, Pause, Ban, CheckCircle } from 'lucide-react';
import { DoramaCompleto, Temporada } from '@/types/dorama';
import { StatusDoramaEnum, StatusDoramaLabels } from '@/types/progresso';
import { useProgresso } from 'src/context/ProgressoContext';

interface ProgressModalProps {
  dorama: DoramaCompleto;
  onClose: () => void;
}

export function ProgressModal({ dorama, onClose }: ProgressModalProps) {
  const { atualizarStatus, atualizarProgresso, obterProgresso } =
    useProgresso();

  const [selectedStatus, setSelectedStatus] = useState<StatusDoramaEnum | null>(
    null
  );
  const [selectedSeason, setSelectedSeason] = useState<Temporada | null>(null);
  const [episodiosAssistidos, setEpisodiosAssistidos] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    },
    {
      status: StatusDoramaEnum.Assistindo,
      icon: Play,
    },
    {
      status: StatusDoramaEnum.Pausado,
      icon: Pause,
    },
    {
      status: StatusDoramaEnum.Abandonado,
      icon: Ban,
    },
    {
      status: StatusDoramaEnum.Concluido,
      icon: CheckCircle,
    },
  ];

  const handleSave = async () => {
    if (!selectedSeason || selectedStatus === null) return;

    setIsSubmitting(true);
    try {
      await atualizarStatus({
        temporadaId: selectedSeason.id,
        status: selectedStatus,
      });

      if (selectedStatus !== StatusDoramaEnum.PlanejoAssistir) {
        await atualizarProgresso({
          temporadaId: selectedSeason.id,
          episodiosAssistidos,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
      onClose();
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
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
      <div className="bg-white rounded-3xl max-w-md w-full h-fit shadow-2xl border border-violet-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-t-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                Atualizar Progresso
              </h2>
              <p className="text-violet-100 mt-1">{dorama.titulo}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
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
              <div className="grid grid-cols-2 gap-3">
                {dorama.temporadas.map((temporada) => (
                  <button
                    key={temporada.id}
                    onClick={() => setSelectedSeason(temporada)}
                    className={`p-4 rounded-xl border-2 transition-all text-left hover:scale-105 transform ${
                      selectedSeason?.id === temporada.id
                        ? 'border-violet-500 bg-gradient-to-br from-violet-50 to-purple-50 text-violet-900 shadow-lg'
                        : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/50'
                    }`}
                  >
                    <div className="font-semibold">{temporada.nome}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {temporada.numeroEpisodios} episódios
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
            <div className="space-y-3">
              {statusOptions.map(({ status, icon: Icon }) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 hover:scale-[1.02] transform ${
                    selectedStatus === status
                      ? 'border-violet-500 bg-gradient-to-r from-violet-50 to-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-violet-300 hover:bg-violet-50/30'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-lg border ${
                      selectedStatus === status
                        ? 'text-violet-600 bg-violet-50 border-violet-200'
                        : 'text-gray-400 bg-gray-50 border-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-gray-900">
                    {StatusDoramaLabels[status]}
                  </span>
                  {selectedStatus === status && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-violet-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Episódios Assistidos */}
          {selectedStatus !== null &&
            selectedStatus !== StatusDoramaEnum.PlanejoAssistir && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Episódios Assistidos
                </label>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        handleEpisodeChange(episodiosAssistidos - 1)
                      }
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 hover:from-violet-200 hover:to-purple-200 flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                      disabled={episodiosAssistidos <= 0}
                    >
                      <span className="text-violet-600 font-bold text-lg">
                        −
                      </span>
                    </button>

                    <div className="flex-1 text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
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
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 hover:from-violet-200 hover:to-purple-200 flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                      disabled={
                        episodiosAssistidos >=
                        (selectedSeason?.numeroEpisodios || 0)
                      }
                    >
                      <span className="text-violet-600 font-bold text-lg">
                        +
                      </span>
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-violet-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: selectedSeason
                          ? `${(episodiosAssistidos / selectedSeason.numeroEpisodios) * 100}%`
                          : '0%',
                      }}
                    />
                  </div>

                  <div className="text-center text-sm text-gray-600">
                    {selectedSeason
                      ? Math.round(
                          (episodiosAssistidos /
                            selectedSeason.numeroEpisodios) *
                            100
                        )
                      : 0}
                    % concluído
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 rounded-b-3xl p-6 border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 border border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-all hover:scale-[1.02] transform"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={selectedStatus === null || isSubmitting}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 hover:scale-[1.02] transform disabled:hover:scale-100"
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
