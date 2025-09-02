import React, { useState } from 'react';
import { Save, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import { adminService, validateTemporadaData } from 'src/services/adminService';
import { CreateTemporadaRequest, DoramaCompleto } from 'src/types/admin';
import DoramaSearch from './DoramaSearch';

export default function TemporadaForm() {
  const [formData, setFormData] = useState<CreateTemporadaRequest>({
    doramaId: '',
    numero: 1,
    anoLancamento: new Date().getFullYear(),
    emExibicao: false,
    nome: 'T1.',
    sinopse: '',
  });

  const [selectedDorama, setSelectedDorama] = useState<DoramaCompleto | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });

  const showFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleDoramaChange = (dorama: DoramaCompleto | null) => {
    setSelectedDorama(dorama);
    setFormData((prev) => ({
      ...prev,
      doramaId: dorama?.doramaId || '',
    }));
  };

  // Auto-generate season name when number changes
  const handleNumeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numero = parseInt(e.target.value);
    setFormData((prev) => ({
      ...prev,
      numero,
      nome: `T${numero}.`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateTemporadaData(formData);
    if (errors.length > 0) {
      showFeedback(errors.join(', '), 'error');
      return;
    }

    setIsLoading(true);
    try {
      await adminService.createTemporada(formData);
      showFeedback('Temporada criada com sucesso! 📺', 'success');

      // Reset form but keep dorama selected
      setFormData((prev) => ({
        doramaId: prev.doramaId,
        numero: prev.numero + 1,
        anoLancamento: new Date().getFullYear(),
        emExibicao: false,
        nome: `T${prev.numero + 1}.`,
        sinopse: '',
      }));
    } catch (error) {
      console.error('Erro ao criar temporada:', error);
      showFeedback('Erro ao criar temporada. Tente novamente.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-purple-100">
        <div className="p-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Criar Temporada</h2>
          <p className="text-gray-600">
            Adicione uma nova temporada a um dorama
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Número da Temporada */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número da Temporada *
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

          {/* Nome da Temporada */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome da Temporada *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Ex: T1., Temporada 1, Parte I"
            />
          </div>

          {/* Ano de Lançamento */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ano de Lançamento
            </label>
            <input
              type="number"
              name="anoLancamento"
              value={formData.anoLancamento}
              onChange={handleInputChange}
              min="1900"
              max={new Date().getFullYear() + 5}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        {/* Sinopse */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sinopse da Temporada
          </label>
          <textarea
            name="sinopse"
            value={formData.sinopse}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Descreva o que acontece nesta temporada..."
          />
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
            disabled={isLoading || !selectedDorama}
            className={`
              w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02]
              ${
                isLoading || !selectedDorama
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-500/25'
              }
            `}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isLoading ? 'Criando...' : 'Criar Temporada'}
          </button>
        </div>
      </form>
    </div>
  );
}
