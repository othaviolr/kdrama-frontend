import React, { useState, useEffect, useRef } from 'react';
import { Search, Film, Check, X } from 'lucide-react';
import { adminService } from 'src/services/adminService';
import { DoramaCompleto } from 'src/types/admin';

interface DoramaSearchProps {
  selectedDorama: DoramaCompleto | null;
  onDoramaChange: (dorama: DoramaCompleto | null) => void;
  placeholder?: string;
  className?: string;
}

export default function DoramaSearch({
  selectedDorama,
  onDoramaChange,
  placeholder = 'Pesquisar dorama...',
  className = '',
}: DoramaSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DoramaCompleto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update search term when dorama is selected
    if (selectedDorama) {
      setSearchTerm(selectedDorama.titulo);
    }
  }, [selectedDorama]);

  useEffect(() => {
    // Debounce search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (
      searchTerm.trim().length >= 2 &&
      (!selectedDorama || searchTerm !== selectedDorama.titulo)
    ) {
      searchTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const results = await adminService.buscarDoramasPorTitulo(searchTerm);
          setSearchResults(results);
          setIsOpen(true);
        } catch (error) {
          console.error('Erro ao buscar doramas:', error);
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
  }, [searchTerm, selectedDorama]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectDorama = (dorama: DoramaCompleto) => {
    onDoramaChange(dorama);
    setSearchTerm(dorama.titulo);
    setIsOpen(false);
    setSearchResults([]);
  };

  const handleClearSelection = () => {
    onDoramaChange(null);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If user clears the input, clear selection
    if (!value.trim()) {
      onDoramaChange(null);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Selected Dorama Display */}
      {selectedDorama && (
        <div className="mb-3 p-3 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl">
          <div className="flex items-center gap-3">
            <img
              src={selectedDorama.capaUrl}
              alt={selectedDorama.titulo}
              className="w-12 h-16 object-cover rounded-lg border border-purple-200"
            />
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
            </div>
            <button
              onClick={handleClearSelection}
              className="text-purple-600 hover:text-purple-800 transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
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
                <img
                  src={dorama.capaUrl}
                  alt={dorama.titulo}
                  className="w-12 h-16 object-cover rounded-lg border border-purple-200"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{dorama.titulo}</p>
                  <p className="text-sm text-gray-600">
                    {dorama.tituloOriginal}
                  </p>
                  <p className="text-sm text-gray-500">
                    {dorama.anoLancamento} • {dorama.paisOrigem}
                  </p>
                </div>
                <Check className="w-5 h-5 text-purple-500" />
              </button>
            ))}
          </div>
        )}

        {/* No Results */}
        {isOpen &&
          !isLoading &&
          searchTerm.length >= 2 &&
          searchResults.length === 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-purple-200 rounded-xl shadow-lg p-4 text-center text-gray-500">
              <Film className="w-8 h-8 mx-auto mb-2 text-purple-300" />
              <p>Nenhum dorama encontrado para "{searchTerm}"</p>
            </div>
          )}
      </div>
    </div>
  );
}
