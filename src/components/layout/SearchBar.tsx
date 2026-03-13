'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Tv2, User, List, Loader2 } from 'lucide-react';
import { useDebounce } from '@/src/hooks/useDebounce';
import { doramaService } from '@/src/services/doramaService';
import { atorService } from '@/src/services/atorService';
import { listaService } from '@/src/services/listaService';
import type { DoramaCompleto } from '@/src/types/dorama';
import type { Ator } from '@/src/types/ator';
import type { ListaApi } from '@/src/types/lista';

interface SearchResults {
  doramas: DoramaCompleto[];
  atores: Ator[];
  listas: ListaApi[];
}

const MAX_PER_CATEGORY = 4;

interface SearchBarProps {
  placeholder?: string;
  inputClassName?: string;
  onNavigate?: () => void;
}

export function SearchBar({
  placeholder = 'Buscar doramas, atores, listas...',
  inputClassName,
  onNavigate,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Cached raw data — fetched once per session
  const cache = useRef<{
    doramas: DoramaCompleto[] | null;
    atores: Ator[] | null;
    listas: ListaApi[] | null;
  }>({ doramas: null, atores: null, listas: null });

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const debouncedQuery = useDebounce(query.trim(), 350);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const buscar = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults(null);
      setOpen(false);
      return;
    }

    setLoading(true);
    setOpen(true);

    try {
      // Fetch each category once, then cache
      const [doramas, atoresResp, listas] = await Promise.all([
        cache.current.doramas
          ? Promise.resolve(cache.current.doramas)
          : doramaService.getDoramas().then((d) => {
              cache.current.doramas = d;
              return d;
            }),
        cache.current.atores
          ? Promise.resolve(cache.current.atores)
          : atorService.getAtores(1, 200, true).then((r) => {
              const itens = r.itens as Ator[];
              cache.current.atores = itens;
              return itens;
            }),
        cache.current.listas
          ? Promise.resolve(cache.current.listas)
          : listaService.getListasPublicas().then((l) => {
              cache.current.listas = l;
              return l;
            }),
      ]);

      const lower = q.toLowerCase();

      setResults({
        doramas: doramas
          .filter(
            (d) =>
              d.titulo.toLowerCase().includes(lower) ||
              d.tituloOriginal?.toLowerCase().includes(lower)
          )
          .slice(0, MAX_PER_CATEGORY),
        atores: atoresResp
          .filter(
            (a) =>
              a.nome.toLowerCase().includes(lower) ||
              a.nomeCompleto?.toLowerCase().includes(lower)
          )
          .slice(0, MAX_PER_CATEGORY),
        listas: listas
          .filter((l) => l.nome.toLowerCase().includes(lower))
          .slice(0, MAX_PER_CATEGORY),
      });
    } catch {
      setResults({ doramas: [], atores: [], listas: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscar(debouncedQuery);
  }, [debouncedQuery, buscar]);

  const navigate = (href: string) => {
    setOpen(false);
    setQuery('');
    onNavigate?.();
    router.push(href);
  };

  const temResultados =
    results &&
    (results.doramas.length > 0 ||
      results.atores.length > 0 ||
      results.listas.length > 0);

  return (
    <div ref={containerRef} className="relative w-full group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-purple-500 transition-colors duration-300 pointer-events-none" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results && setOpen(true)}
        className={
          inputClassName ??
          'w-full pl-10 pr-4 py-2.5 border border-gray-200/60 rounded-xl bg-gray-50/50 focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-500/10 transition-all duration-300 text-sm outline-none font-medium placeholder:text-gray-500'
        }
      />

      {open && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden max-h-[420px] overflow-y-auto">
          {loading && (
            <div className="flex items-center justify-center gap-2 py-6 text-gray-400 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              Buscando...
            </div>
          )}

          {!loading && !temResultados && (
            <div className="py-8 text-center text-gray-400 text-sm">
              Nenhum resultado para{' '}
              <span className="font-semibold text-gray-600">"{query}"</span>
            </div>
          )}

          {!loading && temResultados && (
            <div className="py-2">
              {/* Doramas */}
              {results!.doramas.length > 0 && (
                <section>
                  <p className="px-4 pt-3 pb-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Tv2 className="w-3.5 h-3.5" />
                    Doramas
                  </p>
                  {results!.doramas.map((d) => (
                    <button
                      key={d.doramaId}
                      onClick={() => navigate(`/dorama/${d.doramaId}`)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 transition-colors text-left"
                    >
                      {d.capaUrl ? (
                        <img
                          src={d.capaUrl}
                          alt={d.titulo}
                          className="w-8 h-11 object-cover rounded-md flex-shrink-0 bg-gray-100"
                        />
                      ) : (
                        <div className="w-8 h-11 rounded-md bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <Tv2 className="w-4 h-4 text-purple-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {d.titulo}
                        </p>
                        {d.tituloOriginal && d.tituloOriginal !== d.titulo && (
                          <p className="text-xs text-gray-400 truncate">
                            {d.tituloOriginal}
                          </p>
                        )}
                        {d.anoLancamento && (
                          <p className="text-xs text-purple-500 font-medium">
                            {d.anoLancamento}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </section>
              )}

              {/* Atores */}
              {results!.atores.length > 0 && (
                <section>
                  <p className="px-4 pt-3 pb-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Atores
                  </p>
                  {results!.atores.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => navigate(`/actors/${a.id}`)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 transition-colors text-left"
                    >
                      {a.fotoUrl ? (
                        <img
                          src={a.fotoUrl}
                          alt={a.nome}
                          className="w-8 h-8 object-cover rounded-full flex-shrink-0 bg-gray-100"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-purple-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {a.nome}
                        </p>
                        {a.nomeCompleto && a.nomeCompleto !== a.nome && (
                          <p className="text-xs text-gray-400 truncate">
                            {a.nomeCompleto}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </section>
              )}

              {/* Listas */}
              {results!.listas.length > 0 && (
                <section>
                  <p className="px-4 pt-3 pb-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <List className="w-3.5 h-3.5" />
                    Listas
                  </p>
                  {results!.listas.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => navigate(`/lista/${l.id}`)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-purple-50 transition-colors text-left"
                    >
                      {l.imagemCapaUrl ? (
                        <img
                          src={l.imagemCapaUrl}
                          alt={l.nome}
                          className="w-8 h-8 object-cover rounded-md flex-shrink-0 bg-gray-100"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <List className="w-4 h-4 text-purple-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {l.nome}
                        </p>
                        {l.descricao && (
                          <p className="text-xs text-gray-400 truncate">
                            {l.descricao}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </section>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
