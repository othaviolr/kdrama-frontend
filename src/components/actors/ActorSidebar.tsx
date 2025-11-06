// src/components/actors/ActorSidebar.tsx

import { User, Calendar, Ruler, Instagram, ExternalLink } from 'lucide-react';

interface ActorSidebarProps {
  actor: any;
}

export default function ActorSidebar({ actor }: ActorSidebarProps) {
  const calcularIdade = (nascimento: string) => {
    const hoje = new Date();
    const dataNasc = new Date(nascimento);
    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mes = hoje.getMonth() - dataNasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }
    return idade;
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Informações Pessoais */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Informações Pessoais
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Nascimento</p>
              <p className="font-medium text-gray-900">
                {formatarData(actor.nascimento)}
              </p>
              <p className="text-xs text-purple-600">
                {calcularIdade(actor.nascimento)} anos
              </p>
            </div>
          </div>

          {actor.altura && (
            <div className="flex items-center gap-3">
              <Ruler className="w-4 h-4 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Altura</p>
                <p className="font-medium text-gray-900">{actor.altura} cm</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Redes Sociais */}
      {actor.redes && actor.redes.instagram && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Redes Sociais
          </h3>

          <div className="space-y-3">
            <a
              href={`https://instagram.com/${actor.redes.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:from-pink-100 hover:to-purple-100 transition-all duration-300 group"
            >
              <Instagram className="w-5 h-5 text-pink-600" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Instagram</p>
                <p className="text-sm text-gray-600">{actor.redes.instagram}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-pink-600 transition-colors" />
            </a>
          </div>
        </div>
      )}

      {/* Estatísticas */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Estatísticas</h3>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Popularidade</span>
              <span className="font-medium text-purple-600">
                {actor.popularidade}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${actor.popularidade}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <div className="text-center p-4 bg-purple-50 rounded-lg w-full">
              <p className="text-3xl font-bold text-purple-600">
                {actor.doramas.length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Doramas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}