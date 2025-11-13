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
    fotoBackground: atorAtual.fotoUrl, // Se tiver uma foto de background diferente, ajustar
    nacionalidade: atorAtual.pais,
    nascimento: `${atorAtual.anoNascimento}-01-01`, // Você pode ter a data completa na API
    idade: new Date().getFullYear() - atorAtual.anoNascimento,
    altura: atorAtual.altura,
    peso: null, // Se não tiver na API
    signo: null, // Calcular baseado na data de nascimento se tiver
    tipoSanguineo: null, // Se não tiver na API
    agency: null, // Se não tiver na API
    biografia: atorAtual.biografia,
    doramas: [], // TODO: Buscar doramas do ator se tiver endpoint
    redes: {
      instagram: atorAtual.instagram,
      twitter: null, // Se não tiver na API
    },
    popularidade: 0, // Calcular se tiver métrica
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ActorHeader actor={actor} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ActorBiography actor={actor} />

            {actor.doramas.length > 0 && (
              <ActorDoramas doramas={actor.doramas} />
            )}
          </div>

          <ActorSidebar actor={actor} />
        </div>
      </div>
    </div>
  );
}