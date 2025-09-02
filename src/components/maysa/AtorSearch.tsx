import React, { useState, useEffect, useRef } from 'react';
import { Search, User, X, Check } from 'lucide-react';
import { adminService } from 'src/services/adminService';
import { AtorBusca } from 'src/types/admin';

interface AtorSearchProps {
  selectedAtores: AtorBusca[];
  onAtoresChange: (atores: AtorBusca[]) => void;
  placeholder?: string;
  className?: string;
}

export default function AtorSearch({
  selectedAtores,
  onAtoresChange,
  placeholder = 'Pesquisar atores...',
  className = '',
}: AtorSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<AtorBusca[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Debounce search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchTerm.trim().length >= 2) {
      searchTimeoutRef.current = setTimeout(async () => {
        setIsLoading(true);
        try {
          const results = await adminService.buscarAtoresPorNome(searchTerm);
          // Filter out already selected actors
          const filteredResults = results.filter(
            (result) =>
              !selectedAtores.some((selected) => selected.id === result.id)
          );
          setSearchResults(filteredResults);
          setIsOpen(true);
        } catch (error) {
          console.error('Erro ao buscar atores:', error);
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
  }, [searchTerm, selectedAtores]);

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

  const handleSelectAtor = (ator: AtorBusca) => {
    onAtoresChange([...selectedAtores, ator]);
    setSearchTerm('');
    setIsOpen(false);
    setSearchResults([]);
  };

  const handleRemoveAtor = (atorId: string) => {
    onAtoresChange(selectedAtores.filter((ator) => ator.id !== atorId));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Selected Actors */}
      {selectedAtores.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedAtores.map((ator) => (
            <div
              key={ator.id}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 px-3 py-1.5 rounded-lg border border-purple-200"
            >
              <img
                src={ator.fotoUrl}
                alt={ator.nome}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{ator.nome}</span>
              <button
                onClick={() => handleRemoveAtor(ator.id)}
                className="text-purple-600 hover:text-purple-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative" ref={dropdownRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            {searchResults.map((ator) => (
              <button
                key={ator.id}
                onClick={() => handleSelectAtor(ator)}
                className="w-full flex items-center gap-3 p-3 hover:bg-purple-50 transition-colors text-left border-b border-purple-100 last:border-b-0"
              >
                <img
                  src={ator.fotoUrl}
                  alt={ator.nome}
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{ator.nome}</p>
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
              <User className="w-8 h-8 mx-auto mb-2 text-purple-300" />
              <p>Nenhum ator encontrado para "{searchTerm}"</p>
            </div>
          )}
      </div>
    </div>
  );
}
