'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, ChevronDown, Tv2, Menu, X, Bell, User } from 'lucide-react';
import { ModernButton } from '@/components/ui/ModernButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { cn } from '@/lib/utils';

interface NavbarProps {
  user?: {
    id: string;
    username: string;
    avatar?: string;
  };
}

export const ModernNavbar = ({ user }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Efeito de scroll para glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-purple-500/10'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo com animação */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                  <Tv2 className="h-5 w-5 text-white" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl blur opacity-0 group-hover:opacity-50 transition-all duration-300 -z-10" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                KDramaSystem
              </span>
            </Link>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/catalog"
                className="text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                Catálogo
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-600 transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Dropdown Social com glassmorphism */}
              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 hover:scale-105"
                  onClick={() => setIsSocialMenuOpen(!isSocialMenuOpen)}
                >
                  <span>Social</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform duration-300',
                      isSocialMenuOpen && 'rotate-180'
                    )}
                  />
                </button>

                {isSocialMenuOpen && (
                  <div className="absolute top-full left-0 mt-3 w-48 animate-in slide-in-from-top-5 duration-200">
                    <GlassCard className="p-2">
                      <Link
                        href="/friends"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        👥 Amigos
                      </Link>
                      <Link
                        href="/activities"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        📱 Atividades
                      </Link>
                    </GlassCard>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Barra de Pesquisa Moderna */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div
              className={cn(
                'relative transition-all duration-300',
                isSearchFocused && 'scale-105'
              )}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Buscar doramas, atores, listas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={cn(
                  'w-full pl-12 pr-4 py-3 rounded-2xl transition-all duration-300',
                  'bg-white/10 backdrop-blur-xl border border-white/20',
                  'focus:bg-white/20 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20',
                  'placeholder:text-gray-400 text-gray-700 text-sm',
                  isSearchFocused && 'shadow-2xl shadow-purple-500/20'
                )}
              />

              {/* Resultados de busca instantânea */}
              {searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 animate-in slide-in-from-top-5 duration-200">
                  <GlassCard className="p-4">
                    <div className="text-sm text-gray-600">
                      Buscando por:{' '}
                      <span className="font-semibold text-purple-600">
                        "{searchQuery}"
                      </span>
                    </div>
                  </GlassCard>
                </div>
              )}
            </div>
          </div>

          {/* Área do usuário */}
          <div className="flex items-center space-x-4">
            {/* Notificações */}
            {user && (
              <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 hover:scale-110">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full border-2 border-white" />
              </button>
            )}

            {/* Botões de Auth */}
            {!user ? (
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <ModernButton
                    variant="glass"
                    size="sm"
                    className="hidden sm:inline-flex"
                  >
                    Login
                  </ModernButton>
                </Link>
                <Link href="/register">
                  <ModernButton variant="primary" size="sm" glow>
                    Cadastrar
                  </ModernButton>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:block text-sm text-gray-600">
                  Olá,{' '}
                  <span className="font-semibold text-purple-600">
                    {user.username}
                  </span>
                </span>

                {/* Avatar com efeito hover */}
                <div className="relative group">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-10 h-10 rounded-xl object-cover shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}

                  {/* Dropdown do usuário */}
                  <div className="absolute top-full right-0 mt-3 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 animate-in slide-in-from-top-5">
                    <GlassCard className="p-2">
                      <Link
                        href="/profile"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        👤 Perfil
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        ⚙️ Configurações
                      </Link>
                      <hr className="my-2 border-white/20" />
                      <button className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-white/10 rounded-lg transition-colors">
                        🚪 Sair
                      </button>
                    </GlassCard>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 animate-in slide-in-from-top-5 duration-300">
            <GlassCard className="mx-4 p-4">
              <div className="space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm"
                  />
                </div>

                {/* Mobile Links */}
                <div className="space-y-2">
                  <Link
                    href="/catalog"
                    className="block py-2 text-gray-700 hover:text-purple-600 font-medium"
                  >
                    📚 Catálogo
                  </Link>
                  <Link
                    href="/friends"
                    className="block py-2 text-gray-700 hover:text-purple-600 font-medium"
                  >
                    👥 Amigos
                  </Link>
                  <Link
                    href="/activities"
                    className="block py-2 text-gray-700 hover:text-purple-600 font-medium"
                  >
                    📱 Atividades
                  </Link>
                </div>

                {/* Mobile Auth */}
                {!user && (
                  <div className="flex space-x-3 pt-4 border-t border-white/20">
                    <ModernButton
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Login
                    </ModernButton>
                    <ModernButton
                      variant="primary"
                      size="sm"
                      className="flex-1"
                    >
                      Cadastrar
                    </ModernButton>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </nav>
  );
};
