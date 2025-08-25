'use client';

import { List } from 'lucide-react';

interface UserListsProps {
  usuarioId: string;
}

export function UserLists({ usuarioId }: UserListsProps) {
  return (
    <div className="text-center py-12">
      <List className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Suas Listas</h3>
      <p className="text-gray-600">
        Em breve você poderá gerenciar suas listas aqui
      </p>
    </div>
  );
}
