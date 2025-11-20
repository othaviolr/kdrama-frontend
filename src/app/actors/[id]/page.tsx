'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useAtor } from '../../../context/atorContext';
import ActorHeader from '@/components/actors/ActorHeader';
import ActorBiography from '@/components/actors/ActorBiography';
import ActorDoramas from '@/components/actors/ActorDoramas';
import ActorSidebar from '@/components/actors/ActorSidebar';
import ActorLoading from '@/components/actors/ActorLoading';
import ActorNotFound from '@/components/actors/ActorNotFound';

export default function ActorDetailPage() {
  const { id } = useParams();
  const { atorAtual, loadingAtor, carregarAtor, limparAtorAtual } = useAtor();

  useEffect(() => {
    if (id) {
      carregarAtor(id as string);
    }

    // Cleanup ao desmontar
    return () => {
      limparAtorAtual();
    };
  }, [id]);

  if (loadingAtor) {
    return <ActorLoading />;
  }

  if (!atorAtual) {
    return <ActorNotFound />;
  }

  // Transforma os dados da API para o formato esperado pelos componentes
  const actor = {
    id: atorAtual.id,
    nome: atorAtual.nome,
    nomeOriginal: atorAtual.nomeCompleto || atorAtual.nome,
    foto: atorAtual.fotoUrl,
    fotoBackground: atorAtual.fotoUrl,
    nacionalidade: atorAtual.pais,
    nascimento: `${atorAtual.anoNascimento}-01-01`,
    idade: new Date().getFullYear() - atorAtual.anoNascimento,
    altura: atorAtual.altura,
    peso: null,
    signo: null,
    tipoSanguineo: null,
    agency: null,
    biografia: atorAtual.biografia,
    doramas: [], // TODO: Buscar doramas do ator se tiver endpoint
    redes: {
      instagram: atorAtual.instagram,
      twitter: null,
    },
    popularidade: 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/20 via-transparent to-transparent pointer-events-none" />
      
      <ActorHeader actor={actor} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Layout modernizado */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Sidebar - coluna esquerda */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              <ActorSidebar actor={actor} />
            </div>
          </div>

          {/* Conteúdo principal - coluna direita */}
          <div className="lg:col-span-3 space-y-8 lg:space-y-12">
            {/* Biografia com card moderno */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 overflow-hidden">
              <div className="p-1 bg-gradient-to-r from-purple-500/10 to-purple-500/5">
                <ActorBiography actor={actor} />
              </div>
            </div>

            {/* Doramas com card moderno */}
            {actor.doramas.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-purple-500/10 to-purple-500/5">
                  <ActorDoramas doramas={actor.doramas} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}