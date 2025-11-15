'use client';

import { User } from 'lucide-react';

interface ActorBiographyProps {
  actor: any;
}

export default function ActorBiography({ actor }: ActorBiographyProps) {
  if (!actor?.biografia) return null;

  return (
    <section className="space-y-4 md:space-y-6">
      {/* Biografia */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-lg p-4 md:p-6 border border-gray-100 md:border-purple-100">
        {/* Header */}
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg flex-shrink-0">
            <User className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
          </div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
            Biografia
          </h2>
        </div>

        {/* Conteúdo da biografia */}
        <div className="text-gray-700 leading-relaxed">
          <div className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg">
            {actor.biografia.split('\n').map((paragraph: string, index: number) => (
              paragraph.trim() && (
                <p key={index} className="text-justify md:text-left">
                  {paragraph.trim()}
                </p>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}