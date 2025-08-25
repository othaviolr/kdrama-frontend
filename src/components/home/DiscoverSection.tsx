'use client';

import { useState, useEffect } from 'react';
import { Star, TrendingUp, MapPin, User, Play } from 'lucide-react';
import { useDorama } from '../../context/DoramaContext';
import { DoramaCompleto } from '../../types/dorama';

export function DiscoverSection() {
  const [activeTab, setActiveTab] = useState('recommended');
  const { doramas, carregarDoramas, loading } = useDorama();

  // Carregar doramas quando o componente monta
  useEffect(() => {
    carregarDoramas();
  }, []);

  const tabs = [
    { id: 'recommended', label: 'Recomendados', active: true },
    { id: 'trending', label: 'Em Alta', active: false },
    { id: 'new', label: 'Novos', active: false },
  ];

  // Função para gerar badge baseado no dorama
  const getBadge = (dorama: DoramaCompleto, index: number) => {
    if (index === 0 || index === 1) return 'trending';
    if (index === 2 || index === 3) return 'similar';
    return '';
  };

  // Função para gerar recomendação
  const getRecommendation = (dorama: DoramaCompleto, index: number) => {
    const recommendations = [
      'Em alta',
      'Recomendado para você',
      'Similar aos seus',
      'Você pode gostar',
      'Popular',
    ];
    return recommendations[index % recommendations.length];
  };

  // Função para gerar rating (simulado)
  const getRating = (dorama: DoramaCompleto) => {
    // Gera um rating baseado no ID do dorama para consistência
    const hash = dorama.doramaId.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash % 11) / 10 + 4.0; // Rating entre 4.0 e 5.0
  };

  const handleDoramaClick = (dorama: DoramaCompleto) => {
    console.log('Clicou no dorama:', dorama.titulo);
    // Aqui você pode navegar para a página de detalhes
    // router.push(`/dorama/${dorama.doramaId}`);
  };

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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Descobrir</h2>
            <p className="text-gray-600">
              Encontre novos doramas baseados no seu gosto
            </p>
          </div>

          {/* Tabs modernos */}
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 p-1 bg-purple-50 rounded-2xl border border-purple-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-700 shadow-lg border border-purple-200 transform scale-105'
                      : 'text-purple-600 hover:text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-purple-600 font-medium">
                  Carregando doramas...
                </span>
              </div>
            </div>
          ) : doramas.length === 0 ? (
            // Empty State
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum dorama encontrado
              </h3>
              <p className="text-gray-600">
                Tente novamente ou adicione alguns doramas.
              </p>
            </div>
          ) : (
            // Shows Grid
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {doramas.slice(0, 10).map((dorama, index) => {
                const badge = getBadge(dorama, index);
                const recommendation = getRecommendation(dorama, index);
                const rating = getRating(dorama);

                return (
                  <div
                    key={dorama.doramaId}
                    className="group cursor-pointer"
                    onClick={() => handleDoramaClick(dorama)}
                  >
                    <div className="aspect-[3/4] mb-4 relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                      {/* Imagem de fundo ou placeholder */}
                      {dorama.capaUrl && dorama.capaUrl !== 'teste' ? (
                        <div
                          className="absolute inset-0 w-full h-full bg-cover bg-center transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                          style={{ backgroundImage: `url(${dorama.capaUrl})` }}
                        />
                      ) : (
                        // Placeholder quando não tem imagem
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Play className="w-12 h-12 mx-auto mb-2 opacity-80" />
                            <span className="text-sm font-medium opacity-90">
                              {dorama.titulo}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>

                      {/* Badge */}
                      {badge && (
                        <div className="absolute top-3 left-3">
                          <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20">
                            <div className="flex items-center gap-1.5">
                              {badge === 'trending' && (
                                <TrendingUp className="w-3 h-3 text-yellow-400" />
                              )}
                              {badge === 'similar' && (
                                <MapPin className="w-3 h-3 text-blue-400" />
                              )}
                              <span className="text-xs text-white font-semibold">
                                {badge === 'trending' ? 'Em alta' : 'Similar'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Indicador de país */}
                      <div className="absolute top-3 right-3">
                        <div className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-lg">
                          <span className="text-xs text-white font-medium">
                            {dorama.paisOrigem}
                          </span>
                        </div>
                      </div>

                      {/* Efeito de brilho sutil */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/0 group-hover:via-white/10 group-hover:to-white/5 transition-all duration-600"></div>
                    </div>

                    {/* Título */}
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors text-lg line-clamp-2">
                      {dorama.titulo}
                    </h3>

                    {/* Ano e Status */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-600">
                        {dorama.anoLancamento}
                      </span>
                      {dorama.emExibicao && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          Em exibição
                        </span>
                      )}
                    </div>

                    {/* Rating com estrelas */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-900 ml-1">
                        {rating.toFixed(1)}
                      </span>
                    </div>

                    {/* Gêneros */}
                    {dorama.generos.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {dorama.generos.slice(0, 2).map((genero) => (
                          <span
                            key={genero.id}
                            className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-md font-medium"
                          >
                            {genero.nome}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Recomendação */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-600">
                      <User className="w-3 h-3" />
                      <span>{recommendation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-3">
          {tabs.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-purple-300 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.4}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
