'use client';

import { useState } from 'react';
import { Star, Eye, Users } from 'lucide-react';
import { ProfileHeader } from '@/src/components/profile/ProfileHeader';
import { ProfileTabs } from '@/src/components/profile/ProfileTabs';
import { ActivityTab } from '@/src/components/profile/ActivityTab';
import { EditProfileModal } from '@/src/components/profile/EditProfileModal';

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

interface Activity {
  id: string;
  type: 'review' | 'rating' | 'list' | 'follow';
  content: string;
  time: string;
  likes?: number;
  comments?: number;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('atividade');
  const [isLoading, setIsLoading] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    username: 'João Silva',
    email: 'joao@email.com',
    bio: 'Apaixonado por K-Dramas 🎭 | Especialista em romances coreanos | Sempre em busca do próximo drama para maratonar! ✨',
    avatar: '',
    followers: 234,
    following: 189,
    joinDate: '2024-01-15',
    stats: {
      watched: 47,
      reviews: 23,
      lists: 8,
    },
  });

  const [editForm, setEditForm] = useState({
    username: profile.username,
    bio: profile.bio,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const recentActivity: Activity[] = [
    {
      id: '1',
      type: 'review',
      content:
        'Avaliou "Hometown\'s Embrace" com 5 estrelas - "Drama perfeito! A química entre os protagonistas é incrível..."',
      time: '2 horas atrás',
      likes: 15,
      comments: 3,
    },
    {
      id: '2',
      type: 'list',
      content: 'Criou a lista "Melhores K-Dramas de 2024"',
      time: '1 dia atrás',
      likes: 8,
      comments: 2,
    },
    {
      id: '3',
      type: 'follow',
      content: 'Começou a seguir Maria Clara',
      time: '3 dias atrás',
    },
    {
      id: '4',
      type: 'rating',
      content: 'Adicionou "Business Proposal" à lista de assistidos',
      time: '5 dias atrás',
    },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setProfile((prev) => ({
      ...prev,
      username: editForm.username,
      bio: editForm.bio,
    }));

    setIsLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      username: profile.username,
      bio: profile.bio,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile((prev) => ({ ...prev, avatar: e.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormChange = (field: keyof typeof editForm, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'atividade':
        return <ActivityTab activities={recentActivity} />;

      case 'reviews':
        return (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Suas Reviews
            </h3>
            <p className="text-gray-600">
              Em breve você poderá ver todas as suas reviews aqui
            </p>
          </div>
        );

      case 'listas':
        return (
          <div className="text-center py-12">
            <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Suas Listas
            </h3>
            <p className="text-gray-600">
              Em breve você poderá gerenciar suas listas aqui
            </p>
          </div>
        );

      case 'seguidores':
        return (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Seguidores
            </h3>
            <p className="text-gray-600">
              Em breve você poderá ver seus seguidores aqui
            </p>
          </div>
        );

      case 'configuracoes':
        return (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Configurações da Conta
            </h3>
            <div className="max-w-2xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  O email não pode ser alterado
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notificações
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded text-purple-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Novos seguidores
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded text-purple-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Comentários em reviews
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded text-purple-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Newsletter semanal
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader
          profile={profile}
          onEditClick={() => setIsEditing(true)}
          onImageUpload={handleImageUpload}
        />

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="bg-white rounded-3xl shadow-lg">
          <div className="p-8">{renderTabContent()}</div>
        </div>

        <EditProfileModal
          isOpen={isEditing}
          editForm={editForm}
          isLoading={isLoading}
          onClose={handleCancel}
          onSave={handleSave}
          onFormChange={handleFormChange}
        />
      </div>
    </div>
  );
}
