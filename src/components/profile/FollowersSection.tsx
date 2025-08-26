'use client';

import { useState, useEffect } from 'react';
import { usuarioService } from 'src/services/usuarioService';
import { FollowerCard } from './FollowersSection/FollowerCard';
import { FollowersTabs } from './FollowersSection/FollowersTabs';
import { EmptyFollowers } from './FollowersSection/EmptyFollowers';
import { LoadingFollowers } from './FollowersSection/LoadingFollowers';
import { UserGroupIcon } from '@heroicons/react/24/outline';

interface Usuario {
  id: string;
  nome: string;
  nomeUsuario: string;
  fotoUrl?: string;
  bio?: string;
  segueVoce?: boolean;
  voceSegue?: boolean;
}

interface FollowersSectionProps {
  usuarioId: string;
}

export function FollowersSection({ usuarioId }: FollowersSectionProps) {
  const [activeTab, setActiveTab] = useState<'seguidores' | 'seguindo'>(
    'seguidores'
  );
  const [seguidores, setSeguidores] = useState<Usuario[]>([]);
  const [seguindo, setSeguindo] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarDados();
  }, [usuarioId, activeTab]);

  const carregarDados = async () => {
    setLoading(true);
    try {
      if (activeTab === 'seguidores') {
        // Assumindo que você terá estes endpoints
        const data = await usuarioService.getSeguidores(usuarioId);
        setSeguidores(data);
      } else {
        const data = await usuarioService.getSeguindo(usuarioId);
        setSeguindo(data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeguir = async (targetUserId: string) => {
    try {
      await usuarioService.seguirUsuario(targetUserId);

      // Atualizar estado local
      if (activeTab === 'seguidores') {
        setSeguidores((prev) =>
          prev.map((user) =>
            user.id === targetUserId ? { ...user, voceSegue: true } : user
          )
        );
      } else {
        setSeguindo((prev) =>
          prev.map((user) =>
            user.id === targetUserId ? { ...user, voceSegue: true } : user
          )
        );
      }
    } catch (error) {
      console.error('Erro ao seguir usuário:', error);
    }
  };

  const handleDeixarDeSeguir = async (targetUserId: string) => {
    try {
      await usuarioService.deixarDeSeguir(targetUserId);

      // Atualizar estado local
      if (activeTab === 'seguidores') {
        setSeguidores((prev) =>
          prev.map((user) =>
            user.id === targetUserId ? { ...user, voceSegue: false } : user
          )
        );
      } else {
        setSeguindo((prev) => prev.filter((user) => user.id !== targetUserId));
      }
    } catch (error) {
      console.error('Erro ao deixar de seguir usuário:', error);
    }
  };

  const currentData = activeTab === 'seguidores' ? seguidores : seguindo;
  const totalConnections = seguidores.length + seguindo.length;

  return (
    <div className="space-y-8">
      {/* Header modernizado */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <UserGroupIcon className="w-8 h-8 text-purple-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Conexões</h2>
                <p className="text-gray-600 text-lg">
                  Pessoas que você segue e que te seguem
                </p>
              </div>
            </div>
          </div>

          {/* Total de conexões */}
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {totalConnections}
            </div>
            <div className="text-sm text-purple-600">
              conexão{totalConnections !== 1 ? 'ões' : ''}
            </div>
          </div>
        </div>
      </div>

      <FollowersTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        seguidoresCount={seguidores.length}
        seguindoCount={seguindo.length}
      />

      {loading ? (
        <LoadingFollowers />
      ) : currentData.length === 0 ? (
        <EmptyFollowers type={activeTab} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentData.map((usuario, index) => (
            <div
              key={usuario.id}
              className="animate-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FollowerCard
                usuario={usuario}
                onSeguir={() => handleSeguir(usuario.id)}
                onDeixarDeSeguir={() => handleDeixarDeSeguir(usuario.id)}
                showFollowButton={activeTab === 'seguidores'}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
