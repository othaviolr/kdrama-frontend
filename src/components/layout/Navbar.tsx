'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ChevronDown, Tv2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NavbarProps {
  user?: {
    id: string;
    username: string;
    avatar?: string;
  };
}

export const Navbar = ({ user }: NavbarProps) => {
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Tv2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                KDramaSystem
              </span>
            </Link>

            {/* Menu Principal */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/catalog"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Catálogo
              </Link>

              {/* Dropdown Social */}
              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                  onClick={() => setIsSocialMenuOpen(!isSocialMenuOpen)}
                  onBlur={() =>
                    setTimeout(() => setIsSocialMenuOpen(false), 200)
                  }
                >
                  <span>Social</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {isSocialMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                      <Link
                        href="/friends"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Amigos
                      </Link>
                      <Link
                        href="/activities"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Atividades
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Barra de Pesquisa */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar doramas, atores, listas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Botões Login/Cadastrar */}
          <div className="flex items-center space-x-3">
            {!user ? (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-purple-600"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-sm"
                  >
                    Cadastrar
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Olá, {user.username}
                </span>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
