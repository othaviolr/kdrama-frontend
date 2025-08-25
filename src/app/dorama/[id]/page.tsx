'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Star,
  Calendar,
  MapPin,
  Play,
  Plus,
  Heart,
  Share2,
  Clock,
  Users,
  Tv,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useDorama } from 'src/context/DoramaContext';
import { DoramaCompleto, Temporada, Ator } from '@/types/dorama';

export default function DoramaDetalhes() {
  const { id } = useParams();
  const router = useRouter();
  const { doramaAtual, carregarDorama, loadingDorama } = useDorama();
  const [expandedSeasons, setExpandedSeasons] = useState<Set<string>>(
    new Set()
  );
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  useEffect(() => {
    if (id) {
      carregarDorama(id as string);
    }
  }, [id]);

  // Função para gerar rating simulado
  const getRating = (dorama: DoramaCompleto) => {
    const hash = dorama.doramaId.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    return Math.abs(hash % 11) / 10 + 4.0;
  };

  const toggleSeason = (seasonId: string) => {
    const newExpanded = new Set(expandedSeasons);
    if (newExpanded.has(seasonId)) {
      newExpanded.delete(seasonId);
    } else {
      newExpanded.add(seasonId);
    }
    setExpandedSeasons(newExpanded);
  };

  const getPlataformaName = (plataforma: number) => {
    const plataformas = {
      0: 'Netflix',
      1: 'Amazon Prime',
      2: 'Viki',
      3: 'Disney+',
      4: 'Apple TV+',
    };
    return (
      plataformas[plataforma as keyof typeof plataformas] || 'Desconhecida'
    );
  };

  if (loadingDorama) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-purple-600 font-medium">
            Carregando detalhes...
          </span>
        </div>
      </div>
    );
  }

  if (!doramaAtual) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tv className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Dorama não encontrado
          </h2>
          <p className="text-gray-600 mb-4">
            O dorama que você está procurando não existe.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const rating = getRating(doramaAtual);
  const totalEpisodes = doramaAtual.temporadas.reduce(
    (acc, temp) => acc + temp.numeroEpisodios,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header com backdrop */}
      <div className="relative h-96 bg-gradient-to-r from-purple-900 to-purple-700 overflow-hidden">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Navigation */}
        <div className="absolute top-0 left-0 right-0 z-20 p-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="w-48 h-72 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl">
                {doramaAtual.capaUrl && doramaAtual.capaUrl !== 'teste' ? (
                  <img
                    src={doramaAtual.capaUrl}
                    alt={doramaAtual.titulo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-80" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {doramaAtual.titulo}
                </h1>
                {doramaAtual.tituloOriginal !== doramaAtual.titulo && (
                  <p className="text-purple-200 text-lg mb-4">
                    {doramaAtual.tituloOriginal}
                  </p>
                )}

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-white">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-5 h-5" />
                    <span>{doramaAtual.anoLancamento}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5" />
                    <span>{doramaAtual.paisOrigem}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tv className="w-5 h-5" />
                    <span>{totalEpisodes} episódios</span>
                  </div>
                  {doramaAtual.emExibicao && (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Em exibição
                    </span>
                  )}
                </div>

                {/* Gêneros */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {doramaAtual.generos.map((genero) => (
                    <span
                      key={genero.id}
                      className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {genero.nome}
                    </span>
                  ))}
                </div>

                {/* Ações */}
                <div className="flex gap-3">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Assistir
                  </button>
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sinopse */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sinopse</h2>
              <div className="relative">
                <p
                  className={`text-gray-700 leading-relaxed ${
                    !showFullSynopsis ? 'line-clamp-4' : ''
                  }`}
                >
                  {doramaAtual.sinopse}
                </p>
                {doramaAtual.sinopse.length > 200 && (
                  <button
                    onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                    className="mt-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
                  >
                    {showFullSynopsis ? 'Ver menos' : 'Ver mais'}
                  </button>
                )}
              </div>
            </section>

            {/* Temporadas */}
            <section className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Temporadas ({doramaAtual.temporadas.length})
              </h2>
              <div className="space-y-4">
                {doramaAtual.temporadas.map((temporada) => (
                  <div
                    key={temporada.id}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleSeason(temporada.id)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {temporada.nome}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {temporada.numeroEpisodios} episódios •{' '}
                          {new Date(temporada.dataEstreia).getFullYear()}
                        </p>
                      </div>
                      {expandedSeasons.has(temporada.id) ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {expandedSeasons.has(temporada.id) && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="space-y-2">
                          {temporada.episodios.map((episodio) => (
                            <div
                              key={episodio.id}
                              className="flex items-center gap-3 p-3 bg-white rounded-lg"
                            >
                              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-sm font-medium text-purple-600">
                                  {episodio.numero}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                  {episodio.titulo}
                                </h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Clock className="w-4 h-4" />
                                  <span>{episodio.duracaoMinutos} min</span>
                                </div>
                                {episodio.sinopse && (
                                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                    {episodio.sinopse}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Elenco */}
            {doramaAtual.atores.length > 0 && (
              <section className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Elenco ({doramaAtual.atores.length})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {doramaAtual.atores.slice(0, 8).map((ator) => (
                    <div key={ator.id} className="text-center">
                      <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600">
                        {ator.fotoUrl && ator.fotoUrl !== 'teste' ? (
                          <img
                            src={ator.fotoUrl}
                            alt={ator.nome}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-white opacity-80" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {ator.nome}
                      </h3>
                      <p className="text-xs text-gray-600">{ator.pais}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações técnicas */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Informações</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plataforma:</span>
                  <span className="font-medium">
                    {getPlataformaName(doramaAtual.plataforma)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium">
                    {doramaAtual.emExibicao ? 'Em exibição' : 'Finalizado'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Temporadas:</span>
                  <span className="font-medium">
                    {doramaAtual.temporadas.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Episódios:</span>
                  <span className="font-medium">{totalEpisodes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ano:</span>
                  <span className="font-medium">
                    {doramaAtual.anoLancamento}
                  </span>
                </div>
              </div>
            </div>

            {/* Ações */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Suas ações</h3>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors">
                  Adicionar à lista
                </button>
                <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition-colors">
                  Marcar como assistido
                </button>
                <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium transition-colors">
                  Avaliar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
