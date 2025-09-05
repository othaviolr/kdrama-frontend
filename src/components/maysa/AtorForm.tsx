import React, { useState } from 'react';
import { Save, User, AlertCircle, CheckCircle } from 'lucide-react';
import { adminService, validateAtorData } from 'src/services/adminService';
import { CreateAtorRequest } from 'src/types/admin';

export default function AtorForm() {
  const [formData, setFormData] = useState<CreateAtorRequest>({
    nome: '',
    nomeCompleto: '',
    anoNascimento: 1990,
    altura: 1.7,
    pais: 'Coreia do Sul',
    biografia: '',
    fotoUrl: '',
    instagram: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    message: string;
    type: 'success' | 'error' | '';
  }>({ message: '', type: '' });

  const paises = [
    'Coreia do Sul',
    'Japão',
    'China',
    'Tailândia',
    'Filipinas',
    'Taiwan',
    'Estados Unidos',
    'Outros',
  ];

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
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateAtorData(formData);
    if (errors.length > 0) {
      showFeedback(errors.join(', '), 'error');
      return;
    }

    setIsLoading(true);
    try {
      await adminService.createAtor(formData);
      showFeedback('Ator criado com sucesso! 🎭', 'success');

      setFormData({
        nome: '',
        nomeCompleto: '',
        anoNascimento: 1990,
        altura: 1.7,
        pais: 'Coreia do Sul',
        biografia: '',
        fotoUrl: '',
        instagram: '',
      });
    } catch (error) {
      console.error('Erro ao criar ator:', error);
      showFeedback('Erro ao criar ator. Tente novamente.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-purple-100">
        <div className="p-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Criar Ator</h2>
          <p className="text-gray-600">Adicione um novo ator à base de dados</p>
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
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="Woo Do-hwan"
            />
          </div>

          {/* Nome Completo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nome Coreano *
            </label>
            <input
              type="text"
              name="nomeCompleto"
              value={formData.nomeCompleto}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="우도환"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ano de Nascimento */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ano de Nascimento *
            </label>
            <input
              type="number"
              name="anoNascimento"
              value={formData.anoNascimento}
              onChange={handleInputChange}
              required
              min="1900"
              max={new Date().getFullYear()}
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Altura */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Altura (metros) *
            </label>
            <input
              type="number"
              name="altura"
              value={formData.altura}
              onChange={handleInputChange}
              required
              min="0.5"
              max="3.0"
              step="0.01"
              className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              placeholder="1.75"
            />
          </div>

          {/* País */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              País *
            </label>
            <select
              name="pais"
              value={formData.pais}
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
        </div>

        {/* URL da Foto */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            URL da Foto *
          </label>
          <input
            type="url"
            name="fotoUrl"
            value={formData.fotoUrl}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="https://exemplo.com/foto.jpg"
          />
        </div>

        {/* Instagram */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Instagram
          </label>
          <input
            type="url"
            name="instagram"
            value={formData.instagram}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            placeholder="@username"
          />
        </div>

        {/* Biografia */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Biografia *
          </label>
          <textarea
            name="biografia"
            value={formData.biografia}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Conte sobre a carreira e trabalhos do ator..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-purple-100">
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02]
              ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25'
              }
            `}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isLoading ? 'Criando...' : 'Criar Ator'}
          </button>
        </div>
      </form>
    </div>
  );
}
