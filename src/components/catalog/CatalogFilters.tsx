'use client';

interface CatalogFiltersProps {
  availableGenres: string[];
  availableCountries: string[];
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
}

export default function CatalogFilters({
  availableGenres,
  availableCountries,
  selectedGenre,
  setSelectedGenre,
  selectedCountry,
  setSelectedCountry,
}: CatalogFiltersProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Filtros de Gêneros */}
      {availableGenres.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-100/30">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-gray-800 mr-2">
              Gênero:
            </span>
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                selectedGenre === 'all'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-700 hover:scale-105'
              }`}
            >
              Todos
            </button>
            {availableGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                  selectedGenre === genre
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-700 hover:scale-105'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filtros de Países */}
      {availableCountries.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-100/30">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-gray-800 mr-2">País:</span>
            <button
              onClick={() => setSelectedCountry('all')}
              className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                selectedCountry === 'all'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105'
                  : 'bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-700 hover:scale-105'
              }`}
            >
              Todos
            </button>
            {availableCountries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-300 ${
                  selectedCountry === country
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-purple-100 hover:text-purple-700 hover:scale-105'
                }`}
              >
                {country}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
