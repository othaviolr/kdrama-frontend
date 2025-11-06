import { User } from 'lucide-react';

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
    </section>
  );
}