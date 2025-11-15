'use client';

import { User, Calendar, Ruler, Instagram, ExternalLink, Users, Award } from 'lucide-react';

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
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Informações Pessoais */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-lg p-4 md:p-6 border border-gray-100 md:border-purple-100">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg flex-shrink-0">
            <User className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-900">
            Informações Pessoais
          </h3>
        </div>

        <div className="space-y-3 md:space-y-4">
          {/* Data de Nascimento */}
          <div className="flex items-center gap-2 md:gap-3">
            <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-sm text-gray-600">Nascimento</p>
              <p className="font-medium text-gray-900 text-sm md:text-base truncate">
                {formatarData(actor.nascimento)}
              </p>
              <p className="text-xs text-purple-600 font-medium">
                {calcularIdade(actor.nascimento)} anos
              </p>
            </div>
          </div>

          {/* Altura */}
          {actor.altura && (
            <div className="flex items-center gap-2 md:gap-3">
              <Ruler className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <div>
                <p className="text-xs md:text-sm text-gray-600">Altura</p>
                <p className="font-medium text-gray-900 text-sm md:text-base">{actor.altura} cm</p>
              </div>
            </div>
          )}

          {/* Tipo Sanguíneo */}
          {actor.tipoSanguineo && (
            <div className="flex items-center gap-2 md:gap-3">
              <Users className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <div>
                <p className="text-xs md:text-sm text-gray-600">Tipo Sanguíneo</p>
                <p className="font-medium text-gray-900 text-sm md:text-base">{actor.tipoSanguineo}</p>
              </div>
            </div>
          )}

          {/* Agência */}
          {actor.agency && (
            <div className="flex items-center gap-2 md:gap-3">
              <Award className="w-4 h-4 text-purple-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs md:text-sm text-gray-600">Agência</p>
                <p className="font-medium text-gray-900 text-sm md:text-base truncate">
                  {actor.agency}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Redes Sociais */}
      {actor.redes && actor.redes.instagram && (
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-lg p-4 md:p-6 border border-gray-100 md:border-purple-100">
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
            Redes Sociais
          </h3>

          <div className="space-y-2 md:space-y-3">
            <a
              href={`https://instagram.com/${actor.redes.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg md:rounded-xl hover:from-pink-100 hover:to-purple-100 transition-all duration-300 group border border-pink-100"
            >
              <Instagram className="w-4 h-4 md:w-5 md:h-5 text-pink-600 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-sm md:text-base truncate">Instagram</p>
                <p className="text-xs text-gray-600 truncate">{actor.redes.instagram}</p>
              </div>
              <ExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-400 group-hover:text-pink-600 transition-colors flex-shrink-0" />
            </a>
          </div>
        </div>
      )}

      {/* Estatísticas */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm md:shadow-lg p-4 md:p-6 border border-gray-100 md:border-purple-100">
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
          Estatísticas
        </h3>

        <div className="space-y-3 md:space-y-4">
          {/* Barra de Popularidade */}
          <div>
            <div className="flex items-center justify-between text-xs md:text-sm mb-1 md:mb-2">
              <span className="text-gray-600">Popularidade</span>
              <span className="font-medium text-purple-600">
                {actor.popularidade}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
              <div
                className="bg-purple-600 h-1.5 md:h-2 rounded-full transition-all duration-1000"
                style={{ width: `${actor.popularidade}%` }}
              ></div>
            </div>
          </div>

          {/* Contador de Doramas */}
          <div className="flex justify-center pt-1 md:pt-2">
            <div className="text-center p-3 md:p-4 bg-purple-50 rounded-lg w-full border border-purple-100">
              <p className="text-2xl md:text-3xl font-bold text-purple-600">
                {actor.doramas?.length || 0}
              </p>
              <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">
                {actor.doramas?.length === 1 ? 'Dorama' : 'Doramas'}
              </p>
            </div>
          </div>

          {/* Contador de Prêmios se disponível */}
          {actor.premios && actor.premios.length > 0 && (
            <div className="flex justify-center">
              <div className="text-center p-3 md:p-4 bg-yellow-50 rounded-lg w-full border border-yellow-100">
                <p className="text-2xl md:text-3xl font-bold text-yellow-600">
                  {actor.premios.length}
                </p>
                <p className="text-xs md:text-sm text-gray-600 mt-0.5 md:mt-1">
                  {actor.premios.length === 1 ? 'Prêmio' : 'Prêmios'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}