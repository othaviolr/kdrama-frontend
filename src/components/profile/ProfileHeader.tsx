'use client';

import { Camera, Edit3, Calendar } from 'lucide-react';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  bio: string;
  avatar?: string;
  followers: number;
  following: number;
  joinDate: string;
  stats: {
    watched: number;
    reviews: number;
    lists: number;
  };
}

interface ProfileHeaderProps {
  profile: UserProfile;
  onEditClick: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileHeader({
  profile,
  onEditClick,
  onImageUpload,
}: ProfileHeaderProps) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-purple-50 rounded-full -translate-y-32 translate-x-32 opacity-60"></div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={profile.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-purple-600">
                  {profile.username.charAt(0).toUpperCase()}
                </span>
              )}

              {/* Upload overlay */}
              <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity duration-300">
                <Camera className="w-8 h-8 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Info do usuário */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profile.username}
                </h1>
                <p className="text-gray-600 mb-4 max-w-2xl leading-relaxed">
                  {profile.bio}
                </p>
              </div>

              <button
                onClick={onEditClick}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors font-medium"
              >
                <Edit3 className="w-4 h-4" />
                Editar Perfil
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {profile.stats.watched}
                </div>
                <div className="text-sm text-gray-600">Assistidos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {profile.stats.reviews}
                </div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {profile.stats.lists}
                </div>
                <div className="text-sm text-gray-600">Listas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {profile.followers}
                </div>
                <div className="text-sm text-gray-600">Seguidores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {profile.following}
                </div>
                <div className="text-sm text-gray-600">Seguindo</div>
              </div>
            </div>

            {/* Data de entrada */}
            <div className="flex items-center gap-2 mt-6 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">
                Membro desde{' '}
                {new Date(profile.joinDate).toLocaleDateString('pt-BR', {
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
