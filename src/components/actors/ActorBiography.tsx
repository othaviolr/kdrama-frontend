// src/components/actors/ActorBiography.tsx

import { User, Award, Lightbulb } from 'lucide-react';

interface ActorBiographyProps {
  actor: any;
}

export default function ActorBiography({ actor }: ActorBiographyProps) {
  return (
    <section className="space-y-8">
      {/* Biografia */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <User className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Biografia</h2>
        </div>

        <div className="prose prose-lg text-gray-700 leading-relaxed">
          <p>{actor.biografia}</p>
        </div>
      </div>

      {/* Prêmios e Conquistas */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Prêmios e Conquistas
            </h2>
            <p className="text-gray-600">
              Reconhecimentos ao longo da carreira
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          {actor.premios.map((premio: string, index: number) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-transparent rounded-xl border border-purple-100 hover:border-purple-200 transition-colors"
            >
              <div className="p-2 bg-purple-600 rounded-full">
                <Award className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{premio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curiosidades */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Lightbulb className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Curiosidades</h2>
            <p className="text-gray-600">
              Fatos interessantes sobre {actor.nome}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {actor.curiosidades.map((curiosidade: string, index: number) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors"
            >
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{curiosidade}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
