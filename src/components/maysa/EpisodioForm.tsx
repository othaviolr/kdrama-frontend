import React, { useState, useEffect } from 'react';
import { Save, Play, AlertCircle, CheckCircle } from 'lucide-react';
import { adminService, validateEpisodioData } from 'src/services/adminService';
import {
  CreateEpisodioRequest,
  DoramaCompleto,
  TipoEpisodio,
} from 'src/types/admin';
import DoramaSearch from './DoramaSearch';

interface Temporada {
  id: string;
  nome: string;
  ordem: number;
  numeroEpisodios: number;
}

export default function EpisodioForm() {
  const [formData, setFormData] = useState<CreateEpisodioRequest>({
    temporadaId: '',
    numero: 1,
    titulo: 'Episódio 1',
    duracaoMinutos: 60,
    tipo: TipoEpisodio.Normal,
    sinopse: '',
  });

  const [selectedDorama, setSelectedDorama] = useState<DoramaCompleto | null>(
    null
  );
  const [temporadas, setTemporadas] = useState<Temporada[]>([]);
  const [selectedTemporada, setSelectedTemporada] = useState<Temporada | null>(
    null
  );
  const [loadingTemporadas, setLoadingTemporadas] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });

  const tiposEpisodio = [
    { value: TipoEpisodio.Normal, label: 'Normal' },
    { value: TipoEpisodio.Especial, label: 'Especial' },
    { value: TipoEpisodio.Final, label: 'Final' },
  ];

  useEffect(() => {
    if (selectedDorama) {
      loadTemporadas();
    } else {
      setTemporadas([]);
      setSelectedTemporada(null);
    }
  }, [selectedDorama]);

  const loadTemporadas = async () => {
    if (!selectedDorama) return;

    setLoadingTemporadas(true);
    try {
      const temporadasData = await adminService.getTemporadasPorDorama(
        selectedDorama.titulo
      );
      setTemporadas(temporadasData);
    } catch (error) {
      console.error('Erro ao carregar temporadas:', error);
      showFeedback('Erro ao carregar temporadas', 'error');
    } finally {
      setLoadingTemporadas(false);
    }
  };

  const showFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value,
    }));
  };

  const handleDoramaChange = (dorama: DoramaCompleto | null) => {
    setSelectedDorama(dorama);
    setSelectedTemporada(null);
    setFormData((prev) => ({
      ...prev,
      temporadaId: '',
    }));
  };

  const handleTemporadaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const temporadaId = e.target.value;
    const temporada = temporadas.find((t) => t.id === temporadaId);
    setSelectedTemporada(temporada || null);
    setFormData((prev) => ({
      ...prev,
      temporadaId,
    }));

    // Auto-increment episode number based on existing episodes
    if (temporada) {
      setFormData((prev) => ({
        ...prev,
        numero: temporada.numeroEpisodios + 1,
        titulo: `Episódio ${temporada.numeroEpisodios + 1}`,
      }));
    }
  };

  // Auto-generate episode title when number changes
  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numero = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      numero,
      titulo: `Episódio ${numero}`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateEpisodioData(formData);
    if (errors.length > 0) {
      showFeedback(errors.join(', '), 'error');
      return;
    }

    setIsLoading(true);
    try {
      await adminService.createEpisodio(formData);
      showFeedback('Episódio criado com sucesso! 🎬', 'success');

      // Increment episode number for next episode
      setFormData((prev) => ({
        ...prev,
        numero: prev.numero + 1,
        titulo: `Episódio ${prev.numero + 1}`,
        sinopse: '',
      }));

      // Update temporada episode count
      if (selectedTemporada) {
        setSelectedTemporada((prev) =>
          prev ? { ...prev, numeroEpisodios: prev.numeroEpisodios + 1 } : null
        );
      }
    } catch (error) {
      console.error('Erro ao criar episódio:', error);
      showFeedback('Erro ao criar episódio. Tente novamente.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-purple-100">
        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
          <Play className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Criar Episódio</h2>
          <p className="text-gray-600">
            Adicione um novo episódio a uma temporada
          </p>
        </div>
      </div>

      {/* Feedback */}
      {feedback.message && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
            feedback.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Dorama */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Dorama *
          </label>
          <DoramaSearch
            selectedDorama={selectedDorama}
            onDoramaChange={handleDoramaChange}
            placeholder="Pesquisar dorama..."
          />
          <p className="text-sm text-gray-500 mt-2">
            Digite pelo menos 2 caracteres para pesquisar doramas
          </p>
        </div>

        {/* Temporada */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Temporada *
          </label>
          {loadingTemporadas ? (
            <div className="flex items-center justify-center py-4 border border-purple-200 rounded-xl">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-purple-500 border-t-transparent"></div>
              <span className="ml-2 text-gray-600">
                Carregando temporadas...
              </span>
            </div>
          ) : temporadas.length > 0 ? (
            <select
              value={formData.temporadaId}
              onChange={handleTemporadaChange}
              required
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Selecione uma temporada</option>
              {temporadas.map((temporada) => (
                <option key={temporada.id} value={temporada.id}>
                  {temporada.nome} ({temporada.numeroEpisodios} episódios)
                </option>
              ))}
            </select>
          ) : selectedDorama ? (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800">
              Nenhuma temporada encontrada para este dorama. Crie uma temporada
              primeiro.
            </div>
          ) : (
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
              Selecione um dorama primeiro
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Número do Episódio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número do Episódio *
            </label>
            <input
              type="number"
              name="numero"
              value={formData.numero}
              onChange={handleNumeroChange}
              required
              min="1"
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Duração */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duração (minutos) *
            </label>
            <input
              type="number"
              name="duracaoMinutos"
              value={formData.duracaoMinutos}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Título do Episódio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título do Episódio *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Ex: Episódio 1, O Início"
            />
          </div>

          {/* Tipo do Episódio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo do Episódio
            </label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              {tiposEpisodio.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sinopse */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sinopse do Episódio
          </label>
          <textarea
            name="sinopse"
            value={formData.sinopse}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Descreva o que acontece neste episódio..."
          />
        </div>

        {/* Context Info */}
        {selectedTemporada && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
            <div className="flex items-center gap-2 text-purple-800">
              <Play className="w-5 h-5" />
              <span className="font-medium">
                Criando episódio {formData.numero} para {selectedTemporada.nome}
              </span>
            </div>
            <p className="text-sm text-purple-600 mt-1">
              Esta temporada já tem {selectedTemporada.numeroEpisodios}{' '}
              episódios
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-6 border-t border-purple-100">
          <button
            type="submit"
            disabled={isLoading || !selectedDorama || !formData.temporadaId}
            className={`
              w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02]
              ${
                isLoading || !selectedDorama || !formData.temporadaId
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25'
              }
            `}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isLoading ? 'Criando...' : 'Criar Episódio'}
          </button>
        </div>
      </form>
    </div>
  );
}
