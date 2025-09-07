'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ActorHeader from '@/components/actors/ActorHeader'; // Componente individual do ator
import ActorBiography from '@/components/actors/ActorBiography';
import ActorDoramas from '@/components/actors/ActorDoramas';
import ActorSidebar from '@/components/actors/ActorSidebar';
import ActorLoading from '@/components/actors/ActorLoading';
import ActorNotFound from '@/components/actors/ActorNotFound';

export default function ActorDetailPage() {
  const { id } = useParams();
  const [actor, setActor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      carregarAtor(id as string);
    }
  }, [id]);

  const carregarAtor = async (actorId: string) => {
    try {
      setLoading(true);
      // Aqui você faria a chamada para sua API
      // const response = await api.get(`/actors/${actorId}`);
      // setActor(response.data);

      // Mock data por enquanto
      const mockActor = {
        id: actorId,
        nome: 'Park Bo-gum',
        nomeOriginal: '박보검',
        foto: 'https://i.pinimg.com/1200x/c3/f1/e3/c3f1e3606e6150499c879b35fa1c3933.jpg',
        fotoBackground:
          'https://i.pinimg.com/1200x/c3/f1/e3/c3f1e3606e6150499c879b35fa1c3933.jpg',
        nacionalidade: 'Coreia do Sul',
        nascimento: '1993-06-16',
        idade: 31,
        altura: 182,
        peso: 70,
        signo: 'Gêmeos',
        tipoSanguineo: 'A',
        agency: 'Blossom Entertainment',
        biografia:
          'Park Bo-gum é um ator e cantor sul-coreano que ganhou reconhecimento mundial por seus papéis em dramas como "Reply 1988", "Love in the Moonlight" e "Record of Youth". Nascido em Seoul, ele começou sua carreira como modelo antes de se tornar ator. É conhecido por sua personalidade carismática e talento versátil.',
        doramas: [
          {
            id: '1',
            titulo: 'Cães de Caça',
            ano: 2015,
            papel: 'Choi Taek',
            poster:
              'https://m.media-amazon.com/images/M/MV5BNjU2NThhZWYtN2MxMy00MzExLTlhOTYtNDk1YmUxY2I3YzdhXkEyXkFqcGc@._V1_.jpg',
            rating: 9.2,
          },
          {
            id: '2',
            titulo: 'Vincenzo',
            ano: 2016,
            papel: 'Crown Prince Lee Yeong',
            poster:
              'https://lh7-rt.googleusercontent.com/docsz/AD_4nXeoCxVCN6bnH5ADb12pHVrkoTmyS1MmhiskrqHTV4m1wsxmOkUVmMuc-sfvQS4IxsnOicgxUWrVN_BVJbe59L2PwaILp9_IqgA41BHcEA-cm_vmYdAOiWrQZ9-ysXQLYKYkIwQd1K73_OjgoY3-tmA?key=S_TI5tpNPznjXhroGXhZf5BF',
            rating: 8.9,
          },
          {
            id: '3',
            titulo: 'Rei de Porcelana',
            ano: 2020,
            papel: 'Sa Hye-jun',
            poster:
              'https://image.tmdb.org/t/p/w500/xiwbHmrFqC2UJejuHsKGYoYegbi.jpg',
            rating: 8.1,
          },
        ],
        premios: [
          'Baeksang Arts Award - Best New Actor (2016)',
          'KBS Drama Award - Excellence Award (2016)',
          'Asia Artist Award - Actor of the Year (2020)',
        ],
        redes: {
          instagram: '@bogummy',
          twitter: '@bogummy_twt',
        },
        curiosidades: [
          'Começou a carreira como modelo',
          'Toca piano desde criança',
          'É conhecido por sua personalidade humilde',
          'Tem uma base de fãs internacional muito forte',
        ],
        popularidade: 95,
      };

      setActor(mockActor);
    } catch (error) {
      console.error('Erro ao carregar ator:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActorLoading />;
  }

  if (!actor) {
    return <ActorNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ActorHeader actor={actor} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ActorBiography actor={actor} />

            <ActorDoramas doramas={actor.doramas} />
          </div>

          <ActorSidebar actor={actor} />
        </div>
      </div>
    </div>
  );
}
