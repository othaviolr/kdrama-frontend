'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, ChevronDown, Tv2, X } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavbarProps {
  user?: {
    id: string;
    username: string;
    avatar?: string;
  };
}

export function Navbar({ user }: NavbarProps = {}) {
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const socialMenuRef = useRef<HTMLDivElement>(null);

  // Fechar menu social quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        socialMenuRef.current &&
        !socialMenuRef.current.contains(event.target as Node)
      ) {
        setIsSocialMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Agora clicável */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
            >
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-105 transition-transform">
                <Tv2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900 hover:text-purple-600 transition-colors">
                KDramaSystem
              </span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/catalog"
                className="text-gray-600 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
              >
                Catálogo
              </Link>

              {/* Dropdown Social - Funcionando */}
              <div className="relative" ref={socialMenuRef}>
                <button
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-purple-50"
                  onClick={() => setIsSocialMenuOpen(!isSocialMenuOpen)}
                >
                  Social
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isSocialMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isSocialMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                    <div className="py-2">
                      <Link
                        href="/friends"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                        onClick={() => setIsSocialMenuOpen(false)}
                      >
                        👥 Amigos
                      </Link>
                      <Link
                        href="/activities"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                        onClick={() => setIsSocialMenuOpen(false)}
                      >
                        📱 Atividades
                      </Link>
                      <Link
                        href="/reviews"
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                        onClick={() => setIsSocialMenuOpen(false)}
                      >
                        ⭐ Reviews
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar doramas, atores, listas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-sm outline-none"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile buttons */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Só mostra login/cadastrar se NÃO estiver logado */}
            {!user && (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-purple-50 hover:text-purple-600"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}

            {/* Se logado, mostra avatar/nome do usuário */}
            {user && (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Olá, {user.username}
                </span>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-100"
                  />
                ) : (
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
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

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-3 space-y-1">
            {/* Search mobile */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar doramas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-purple-500 transition-colors text-sm outline-none"
              />
            </div>

            <Link
              href="/catalog"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Catálogo
            </Link>

            <Link
              href="/friends"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              👥 Amigos
            </Link>

            <Link
              href="/activities"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📱 Atividades
            </Link>

            <Link
              href="/reviews"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ⭐ Reviews
            </Link>

            {/* Mobile Login/Cadastrar só se não estiver logado */}
            {!user && (
              <div className="pt-4 space-y-2">
                <Link
                  href="/login"
                  className="block w-full text-center py-2 px-4 border border-purple-600 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center py-2 px-4 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              </div>
            )}

            {/* Mobile user info se logado */}
            {user && (
              <div className="pt-4 flex items-center gap-2 px-3 py-2">
                <span className="text-sm text-gray-600">
                  Olá, {user.username}
                </span>
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
