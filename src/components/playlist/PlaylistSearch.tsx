'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, Film, Check, X, Play } from 'lucide-react';
import { adminService } from 'src/services/adminService';
import { DoramaCompleto } from 'src/types/admin';

interface PlaylistSearchProps {
  onDoramaSelect: (dorama: DoramaCompleto) => void;
  placeholder?: string;
  className?: string;
}

export default function PlaylistSearch({
  onDoramaSelect,
  placeholder = 'Pesquisar dorama...',
  className = '',
}: PlaylistSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DoramaCompleto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDorama, setSelectedDorama] = useState<DoramaCompleto | null>(null);
  const [allDoramas, setAllDoramas] = useState<DoramaCompleto[]>([]);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Carrega todos os doramas inicialmente (como no catálogo)
  useEffect(() => {
    const loadAllDoramas = async () => {
      try {
        console.log('📥 Carregando todos os doramas...');
        const doramas = await adminService.getAllDoramasCompleto();
        console.log('✅ Doramas carregados:', doramas.length);
        setAllDoramas(doramas);
      } catch (error) {
        console.error('❌ Erro ao carregar doramas:', error);
      }
    };

    loadAllDoramas();
  }, []);

  useEffect(() => {
    if (selectedDorama) {
      setSearchTerm(selectedDorama.titulo);
    }
  }, [selectedDorama]);

  // Filtra localmente como no catálogo, em vez de fazer request para cada busca
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm.trim().length >= 2) {
      searchTimeoutRef.current = setTimeout(() => {
        setIsLoading(true);
        try {
          console.log('🔍 Filtrando doramas para:', searchTerm);
          
          // Filtra localmente como no catálogo
          const query = searchTerm.toLowerCase();
          const filtered = allDoramas.filter(
            (dorama) =>
              dorama.titulo.toLowerCase().includes(query) ||
              dorama.tituloOriginal.toLowerCase().includes(query) ||
              dorama.sinopse.toLowerCase().includes(query) ||
              dorama.generos.some((genero) =>
                genero.nome.toLowerCase().includes(query)
              ) ||
              dorama.atores.some((ator) => ator.nome.toLowerCase().includes(query))
          );

          console.log('✅ Resultados filtrados:', filtered.length);
          setSearchResults(filtered);
          setIsOpen(true);
        } catch (error) {
          console.error('❌ Erro ao filtrar doramas:', error);
          setSearchResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, allDoramas]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectDorama = (dorama: DoramaCompleto) => {
    console.log('✅ Dorama selecionado:', dorama.titulo);
    setSelectedDorama(dorama);
    onDoramaSelect(dorama);
    setSearchTerm(dorama.titulo);
    setIsOpen(false);
    setSearchResults([]);
  };

  const handleClearSelection = () => {
    console.log('🗑️ Limpando seleção');
    setSelectedDorama(null);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setSelectedDorama(null);
    }
  };

  return (
    <div className={`p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg">
          <Film className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Selecionar Dorama</h2>
          <p className="text-gray-600">Busque pelo dorama para adicionar playlists</p>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        {/* Selected Dorama Display */}
        {selectedDorama && (
          <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl">
            <div className="flex items-center gap-3">
              {/* Imagem com fallback igual ao catálogo */}
              <div className="w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                {selectedDorama.capaUrl && selectedDorama.capaUrl !== 'teste' ? (
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedDorama.capaUrl})` }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center">
                    <Play className="w-5 h-5 text-white opacity-90" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="font-medium text-purple-900">
                  {selectedDorama.titulo}
                </p>
                <p className="text-sm text-purple-600">
                  {selectedDorama.tituloOriginal}
                </p>
                <p className="text-sm text-purple-500">
                  {selectedDorama.anoLancamento} • {selectedDorama.paisOrigem}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedDorama.generos.slice(0, 3).map((genero) => (
                    <span
                      key={genero.id}
                      className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full"
                    >
                      {genero.nome}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={handleClearSelection}
                className="text-purple-600 hover:text-purple-800 transition-colors p-1"
                title="Limpar seleção"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-500 border-t-transparent"></div>
            </div>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isOpen && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-purple-200 rounded-xl shadow-lg shadow-purple-500/10 max-h-64 overflow-y-auto">
            {searchResults.map((dorama) => (
              <button
                key={dorama.doramaId}
                onClick={() => handleSelectDorama(dorama)}
                className="w-full flex items-center gap-3 p-3 hover:bg-purple-50 transition-colors text-left border-b border-purple-100 last:border-b-0"
              >
                {/* Imagem com fallback igual ao catálogo */}
                <div className="w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                  {dorama.capaUrl && dorama.capaUrl !== 'teste' ? (
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${dorama.capaUrl})` }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white opacity-90" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{dorama.titulo}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {dorama.tituloOriginal}
                  </p>
                  <p className="text-sm text-gray-500">
                    {dorama.anoLancamento} • {dorama.paisOrigem}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {dorama.generos.slice(0, 2).map((genero) => (
                      <span
                        key={genero.id}
                        className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
                      >
                        {genero.nome}
                      </span>
                    ))}
                  </div>
                </div>
                <Check className="w-5 h-5 text-purple-500 flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {isOpen && !isLoading && searchTerm.length >= 2 && searchResults.length === 0 && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-purple-200 rounded-xl shadow-lg p-4 text-center text-gray-500">
            <Film className="w-8 h-8 mx-auto mb-2 text-purple-300" />
            <p>Nenhum dorama encontrado para "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
          <div>Total de doramas carregados: {allDoramas.length}</div>
          <div>Resultados filtrados: {searchResults.length}</div>
        </div>
      )}
    </div>
  );
}