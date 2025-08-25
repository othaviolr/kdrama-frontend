'use client';

import { Usuario } from '@/types/user';

interface SettingsSectionProps {
  usuario: Usuario;
}

export function SettingsSection({ usuario }: SettingsSectionProps) {
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
            value={usuario.email}
            disabled
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            O email não pode ser alterado
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome de usuário
          </label>
          <input
            type="text"
            value={usuario.nomeUsuario}
            disabled
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            O nome de usuário não pode ser alterado
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
              <input type="checkbox" className="rounded text-purple-600" />
              <span className="ml-2 text-sm text-gray-700">
                Newsletter semanal
              </span>
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <h4 className="text-lg font-medium text-gray-900 mb-4">
            Zona de Perigo
          </h4>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            Deletar Conta
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Esta ação não pode ser desfeita
          </p>
        </div>
      </div>
    </div>
  );
}
