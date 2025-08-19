"use client";

import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { label: "Todos", value: "all" },
    { label: "Romance", value: "romance" },
    { label: "Drama", value: "drama" },
    { label: "Comédia", value: "comedy" },
    { label: "Ação", value: "action" },
    { label: "Thriller", value: "thriller" },
  ];

  const countries = [
    { label: "Todos", value: "all" },
    { label: "Coreia do Sul", value: "south-korea" },
    { label: "China", value: "china" },
    { label: "Japão", value: "japan" },
    { label: "Tailândia", value: "thailand" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Catálogo</h1>

          {/* Barra de busca e filtros */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar doramas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>

          {/* Filtros rápidos */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium text-gray-700 mr-2">
              Gênero:
            </span>
            {filters.map((filter) => (
              <button
                key={filter.value}
                className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">
              País:
            </span>
            {countries.map((country) => (
              <button
                key={country.value}
                className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                {country.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resultados */}
        <div className="text-sm text-gray-600 mb-4">
          Encontrados 248 doramas
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
              : "space-y-4"
          }
        >
          {/* Placeholder para doramas */}
          {Array.from({ length: 12 }).map((_, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className={viewMode === "grid" ? "aspect-[3/4]" : "flex"}>
                <div
                  className={`bg-gray-300 ${viewMode === "grid" ? "w-full h-full" : "w-24 h-32 flex-shrink-0"}`}
                />
                <CardContent
                  className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}
                >
                  <h3 className="font-medium text-gray-900 mb-2">
                    Drama Title {index + 1}
                  </h3>
                  {viewMode === "list" && (
                    <p className="text-sm text-gray-600 mb-2">
                      2024 • 16 episódios • Romance, Drama
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">⭐ 4.5</span>
                    {viewMode === "list" && (
                      <Button size="sm">Ver Detalhes</Button>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Paginação */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button size="sm">1</Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
