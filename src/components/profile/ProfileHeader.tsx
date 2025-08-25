'use client';

import { Edit2, Camera, Users, Star, List } from 'lucide-react';
import { Usuario } from '@/types/user';

interface ProfileHeaderProps {
  usuario: Usuario;
  onEditClick: () => void;
}

export function ProfileHeader({ usuario, onEditClick }: ProfileHeaderProps) {
  // Stats mockados - podem ser implementados futuramente
  const stats = {
    watched: 0,
    reviews: 0,
    lists: 0,
    followers: 0,
    following: 0,
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-purple-100 opacity-60"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-40"></div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg">
              {/* Placeholder avatar - pode ser implementado upload futuramente */}
              <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                {usuario.nome.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* Botão de editar foto */}
            <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors group-hover:scale-110 duration-200">
              <Camera className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Info do usuário */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  {usuario.nome}
                </h1>
                <p className="text-purple-600 font-medium">
                  @{usuario.nomeUsuario}
                </p>
              </div>

              <button
                onClick={onEditClick}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                <Edit2 className="w-4 h-4" />
                Editar Perfil
              </button>
            </div>

            {/* Bio placeholder */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              Olá! Sou {usuario.nome} e adoro assistir doramas asiáticos. Aqui
              você pode acompanhar minhas atividades e descobertas! ✨
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mx-auto mb-2">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.watched}
                </div>
                <div className="text-sm text-gray-600">Assistidos</div>
              </div>

              <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg mx-auto mb-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.reviews}
                </div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>

              <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mx-auto mb-2">
                  <List className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.lists}
                </div>
                <div className="text-sm text-gray-600">Listas</div>
              </div>

              <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg mx-auto mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.followers}
                </div>
                <div className="text-sm text-gray-600">Seguidores</div>
              </div>

              <div className="text-center p-4 bg-white/50 rounded-2xl backdrop-blur-sm border border-white/20">
                <div className="flex items-center justify-center w-10 h-10 bg-pink-100 rounded-lg mx-auto mb-2">
                  <Users className="w-5 h-5 text-pink-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stats.following}
                </div>
                <div className="text-sm text-gray-600">Seguindo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
