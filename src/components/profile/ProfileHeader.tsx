'use client';

import { Camera } from 'lucide-react';
import { PerfilApi } from '@/types/user';

interface ProfileHeaderProps {
  usuario: PerfilApi;
  onEditClick: () => void;
}

export function ProfileHeader({ usuario, onEditClick }: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-purple-100 opacity-60"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-40"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg">
            {usuario.fotoUrl ? (
              <img
                src={usuario.fotoUrl}
                alt={usuario.nome}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                {usuario.nome.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Botão de editar foto */}
          <button
            className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors group-hover:scale-110 duration-200"
            onClick={onEditClick}
          >
            <Camera className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Info do usuário */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {usuario.nome}
          </h1>
          <p className="text-gray-600">@{usuario.nomeUsuario.split('@')[0]}</p>

          {usuario.bio && (
            <p className="mt-4 text-gray-700 leading-relaxed">{usuario.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}
