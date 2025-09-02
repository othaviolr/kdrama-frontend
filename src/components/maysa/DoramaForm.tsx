import React, { useState, useEffect } from 'react';
import { Save, Film, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { adminService, validateDoramaData } from 'src/services/adminService';
import {
  CreateDoramaRequest,
  AtorBusca,
  Plataforma,
  Genero,
} from '@/types/admin';
import AtorSearch from './AtorSearch';

export default function DoramaForm() {
  const [formData, setFormData] = useState<CreateDoramaRequest>({
    usuarioCriadorId: 'f02be115-c504-4981-855b-2ed176020c87',
    titulo: '',
    tituloOriginal: '',
    paisOrigem: 'Coreia do Sul',
    anoLancamento: new Date().getFullYear(),
    emExibicao: false,
    plataforma: Plataforma.Netflix,
    generoIds: [],
    sinopse: '',
    atorIds: [],
    imagemCapaUrl: '',
  });

  const [selectedAtores, setSelectedAtores] = useState<AtorBusca[]>([]);
  const [generosDisponiveis, setGenerosDisponiveis] = useState<Genero[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGeneros, setIsLoadingGeneros] = useState(true);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });

  const plataformas = [
    { value: Plataforma.Netflix, label: 'Netflix' },
    { value: Plataforma.PrimeVideo, label: 'Prime Video' },
    { value: Plataforma.Disney, label: 'Disney+' },
    { value: Plataforma.Viki, label: 'Viki' },
  ];

  const paises = [
    'Coreia do Sul',
    'Japão',
    'China',
    'Tailândia',
    'Filipinas',
    'Taiwan',
    'Outros',
  ];

  useEffect(() => {
    const loadGeneros = async () => {
      try {
        setIsLoadingGeneros(true);
        const generos = await adminService.getAllGeneros();
        setGenerosDisponiveis(generos);
      } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
        showFeedback('Erro ao carregar gêneros. Tente novamente.', 'error');
      } finally {
        setIsLoadingGeneros(false);
      }
    };

    loadGeneros();
  }, []);

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
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
            ? parseInt(value)
            : value,
    }));
  };

  const handleGeneroChange = (generoId: string) => {
    setFormData((prev) => {
      const generoIds = prev.generoIds.includes(generoId)
        ? prev.generoIds.filter((id) => id !== generoId)
        : [...prev.generoIds, generoId];

      return { ...prev, generoIds };
    });
  };

  const handleAtoresChange = (atores: AtorBusca[]) => {
    setSelectedAtores(atores);
    setFormData((prev) => ({
      ...prev,
      atorIds: atores.map((ator) => ator.id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.generoIds.length === 0) {
      showFeedback('Selecione pelo menos um gênero.', 'error');
      return;
    }

    const errors = validateDoramaData(formData);
    if (errors.length > 0) {
      showFeedback(errors.join(', '), 'error');
      return;
    }

    setIsLoading(true);
    try {
      const doramaData = {
        ...formData,
        usuarioCriadorId: 'f02be115-c504-4981-855b-2ed176020c87',
      };

      await adminService.createDorama(doramaData);
      showFeedback('Dorama criado com sucesso! 🎉', 'success');

      setFormData({
        usuarioCriadorId: 'f02be115-c504-4981-855b-2ed176020c87',
        titulo: '',
        tituloOriginal: '',
        paisOrigem: 'Coreia do Sul',
        anoLancamento: new Date().getFullYear(),
        emExibicao: false,
        plataforma: Plataforma.Netflix,
        generoIds: [],
        sinopse: '',
        atorIds: [],
        imagemCapaUrl: '',
      });
      setSelectedAtores([]);
    } catch (error) {
      console.error('Erro ao criar dorama:', error);
      showFeedback('Erro ao criar dorama. Tente novamente.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-purple-100">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg">
          <Film className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Criar Dorama</h2>
          <p className="text-gray-600">Adicione um novo dorama à plataforma</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Ex: Bloodhounds"
            />
          </div>

          {/* Título Original */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Título Original *
            </label>
            <input
              type="text"
              name="tituloOriginal"
              value={formData.tituloOriginal}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Ex: 사냥개들"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* País */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              País de Origem *
            </label>
            <select
              name="paisOrigem"
              value={formData.paisOrigem}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              {paises.map((pais) => (
                <option key={pais} value={pais}>
                  {pais}
                </option>
              ))}
            </select>
          </div>

          {/* Ano */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ano de Lançamento *
            </label>
            <input
              type="number"
              name="anoLancamento"
              value={formData.anoLancamento}
              onChange={handleInputChange}
              required
              min="1900"
              max={new Date().getFullYear() + 5}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Plataforma */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Plataforma
            </label>
            <select
              name="plataforma"
              value={formData.plataforma}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            >
              {plataformas.map((plataforma) => (
                <option key={plataforma.value} value={plataforma.value}>
                  {plataforma.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Gêneros */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gêneros * (selecione pelo menos um)
          </label>

          {isLoadingGeneros ? (
            <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl border border-purple-200">
              <Loader className="w-6 h-6 text-purple-500 animate-spin mr-2" />
              <span className="text-gray-600">Carregando gêneros...</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {generosDisponiveis.map((genero) => (
                  <label
                    key={genero.id}
                    className={`
                      flex items-center p-3 rounded-xl border cursor-pointer transition-all duration-200
                      ${
                        formData.generoIds.includes(genero.id)
                          ? 'bg-purple-100 border-purple-500 text-purple-800'
                          : 'bg-white border-purple-200 text-gray-700 hover:bg-purple-50'
                      }
                    `}
                  >
                    <input
                      type="checkbox"
                      checked={formData.generoIds.includes(genero.id)}
                      onChange={() => handleGeneroChange(genero.id)}
                      className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <span className="ml-3 text-sm font-medium">
                      {genero.nome}
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {formData.generoIds.length} gênero(s) selecionado(s)
              </p>
            </>
          )}
        </div>

        {/* URL da Capa */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            URL da Capa
          </label>
          <input
            type="url"
            name="imagemCapaUrl"
            value={formData.imagemCapaUrl}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="https://exemplo.com/capa.jpg"
          />
        </div>

        {/* Sinopse */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sinopse *
          </label>
          <textarea
            name="sinopse"
            value={formData.sinopse}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Descreva a história do dorama..."
          />
        </div>

        {/* Atores */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Atores
          </label>
          <AtorSearch
            selectedAtores={selectedAtores}
            onAtoresChange={handleAtoresChange}
            placeholder="Pesquisar e adicionar atores..."
          />
          <p className="text-sm text-gray-500 mt-2">
            Digite pelo menos 2 caracteres para pesquisar atores
          </p>
        </div>

        {/* Em Exibição */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="emExibicao"
            checked={formData.emExibicao}
            onChange={handleInputChange}
            className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500 focus:ring-2"
          />
          <label className="ml-3 text-sm font-medium text-gray-700">
            Em exibição atualmente
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-purple-100">
          <button
            type="submit"
            disabled={isLoading || formData.generoIds.length === 0}
            className={`
              w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02]
              ${
                isLoading || formData.generoIds.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg shadow-purple-500/25'
              }
            `}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isLoading ? 'Criando...' : 'Criar Dorama'}
          </button>
        </div>
      </form>
    </div>
  );
}
