'use client';

import { Users } from 'lucide-react';

interface FollowersSectionProps {
  usuarioId: string;
}

export function FollowersSection({ usuarioId }: FollowersSectionProps) {
  return (
    <div className="text-center py-12">
      <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Seguidores</h3>
      <p className="text-gray-600">
        Em breve você poderá ver seus seguidores aqui
      </p>
    </div>
  );
}
