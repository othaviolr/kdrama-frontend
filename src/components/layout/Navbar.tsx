'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Menu,
  ChevronDown,
  Tv2,
  X,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '@/src/context/AuthContext'; // 👈 NOVO!

export function Navbar() {
  // 👈 Removeu props, vai usar contexto
  const [isSocialMenuOpen, setIsSocialMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 👈 USANDO O CONTEXTO!
  const { usuario, isAuthenticated, logout, isLoading } = useAuth();

  const socialMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Fechar menus quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        socialMenuRef.current &&
        !socialMenuRef.current.contains(event.target as Node)
      ) {
        setIsSocialMenuOpen(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 👈 FUNÇÃO DE LOGOUT
  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
  };

  // Mostrar loading enquanto verifica token
  if (isLoading) {
    return (
      <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold text-purple-600">
              KDramaSystem
            </span>
            <div className="animate-pulse">Carregando...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo roxo por padrão */}
          <div className="flex items-center gap-8">
            <Link href="/" className="group transition-all duration-300">
              <span className="text-xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors duration-300 tracking-tight">
                KDramaSystem
              </span>
            </Link>

            {/* Navigation compacta */}
            <nav className="hidden md:flex items-center gap-1">
              <Link
                href="/catalog"
                className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 px-4 py-2 rounded-xl hover:bg-purple-50/80 group"
              >
                Catálogo
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-600 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></div>
              </Link>

              {/* Dropdown Social compacto */}
              <div className="relative" ref={socialMenuRef}>
                <button
                  className="relative text-gray-700 hover:text-purple-600 font-medium transition-all duration-300 flex items-center gap-1 px-4 py-2 rounded-xl hover:bg-purple-50/80 group"
                  onClick={() => setIsSocialMenuOpen(!isSocialMenuOpen)}
                >
                  Social
                  <ChevronDown
                    className={`w-4 h-4 transition-all duration-300 ${isSocialMenuOpen ? 'rotate-180 text-purple-600' : 'group-hover:text-purple-600'}`}
                  />
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-purple-600 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></div>
                </button>

                {isSocialMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/50 z-50 overflow-hidden">
                    <div className="py-2">
                      <Link
                        href="/friends"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50/80 hover:text-purple-600 transition-all duration-300 group"
                        onClick={() => setIsSocialMenuOpen(false)}
                      >
                        <span className="text-base group-hover:scale-110 transition-transform">
                          👥
                        </span>
                        <span className="font-medium">Amigos</span>
                      </Link>
                      <Link
                        href="/activities"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50/80 hover:text-purple-600 transition-all duration-300 group"
                        onClick={() => setIsSocialMenuOpen(false)}
                      >
                        <span className="text-base group-hover:scale-110 transition-transform">
                          📱
                        </span>
                        <span className="font-medium">Atividades</span>
                      </Link>
                      <Link
                        href="/reviews"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50/80 hover:text-purple-600 transition-all duration-300 group"
                        onClick={() => setIsSocialMenuOpen(false)}
                      >
                        <span className="text-base group-hover:scale-110 transition-transform">
                          ⭐
                        </span>
                        <span className="font-medium">Reviews</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Search compacta */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-purple-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Buscar doramas, atores, listas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200/60 rounded-xl bg-gray-50/50 focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 transition-all duration-300 text-sm outline-none font-medium placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile buttons modernos */}
            <button
              className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <button className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300">
              <Search className="w-5 h-5" />
            </button>

            {!isAuthenticated ? ( // 👈 MUDOU AQUI
              /* Botões ultra sofisticados */
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">
                  <button className="relative group px-6 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-500 hover:text-purple-600 overflow-hidden rounded-xl border border-gray-200 hover:border-purple-300">
                    <span className="relative z-10 transition-colors duration-300">
                      Login
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-purple-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="absolute inset-0 bg-purple-50/50 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"></div>
                  </button>
                </Link>
                <Link href="/register">
                  <button className="relative group px-6 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-xl transition-all duration-500 hover:bg-purple-700 hover:shadow-xl hover:scale-105 overflow-hidden">
                    <span className="relative z-10">Cadastrar</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
                  </button>
                </Link>
              </div>
            ) : (
              /* Menu do usuário compacto */
              <div className="relative" ref={userMenuRef}>
                <button
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-purple-50/80 transition-all duration-300 group"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  {/* 👈 MUDOU AQUI - usando dados do contexto */}
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center ring-2 ring-gray-200 group-hover:ring-purple-300 transition-all duration-300">
                    <span className="text-white text-sm font-medium">
                      {usuario?.nome?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors duration-300">
                    {usuario?.nome}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-all duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/50 z-50 overflow-hidden">
                    <div className="py-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {usuario?.nome}
                        </p>
                        <p className="text-xs text-purple-600 font-medium">
                          @{usuario?.nomeUsuario}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50/80 hover:text-purple-600 transition-all duration-300 font-medium"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Meu Perfil</span>
                      </Link>

                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-purple-50/80 hover:text-purple-600 transition-all duration-300 font-medium"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Configurações</span>
                      </Link>

                      <hr className="my-2" />

                      <button
                        className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50/80 transition-all duration-300 w-full text-left font-medium"
                        onClick={handleLogout} // 👈 MUDOU AQUI
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Mobile modernizado */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-purple-100">
          <div className="px-4 py-4 space-y-2">
            {/* Search mobile */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar doramas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-purple-500 transition-all text-sm outline-none"
              />
            </div>

            <Link
              href="/catalog"
              className="block px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Catálogo
            </Link>

            <Link
              href="/friends"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-lg">👥</span>
              Amigos
            </Link>

            <Link
              href="/activities"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-lg">📱</span>
              Atividades
            </Link>

            <Link
              href="/reviews"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-lg">⭐</span>
              Reviews
            </Link>

            {!isAuthenticated && ( // 👈 MUDOU AQUI
              <div className="pt-4 space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center py-3 px-4 border-2 border-purple-600 rounded-xl text-purple-600 hover:bg-purple-50 transition-all font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl text-white hover:from-purple-700 hover:to-purple-800 transition-all font-semibold shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              </div>
            )}

            {isAuthenticated && ( // 👈 MUDOU AQUI
              <div className="pt-4 flex items-center gap-3 px-4 py-3 bg-purple-50 rounded-xl">
                <span className="text-sm font-semibold text-gray-700">
                  Olá, {usuario?.nome}
                </span>
                <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {usuario?.nome?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
