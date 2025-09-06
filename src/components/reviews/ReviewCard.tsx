import { Star, Clock, Heart } from 'lucide-react';

interface Review {
  id: number;
  usuario: {
    nome: string;
    nomeUsuario: string;
    fotoUrl: string | null;
  };
  dorama: {
    nome: string;
    anoLancamento: number;
    generos: string[];
  };
  nota: number;
  comentario: string;
  dataAvaliacao: Date;
  recomendacao: boolean;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (nota: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 sm:w-5 sm:h-5 ${
          index < nota ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Função simples para formatar tempo relativo em português
  const formatarTempoRelativo = (data: Date) => {
    const agora = new Date();
    const diferenca = agora.getTime() - data.getTime();

    const minutos = Math.floor(diferenca / (1000 * 60));
    const horas = Math.floor(diferenca / (1000 * 60 * 60));
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30);
    const anos = Math.floor(dias / 365);

    if (minutos < 1) return 'agora';
    if (minutos < 60) return `${minutos}m`;
    if (horas < 24) return `${horas}h`;
    if (dias < 7) return `${dias}d`;
    if (semanas < 4) return `${semanas}sem`;
    if (meses < 12) return `${meses} meses`;
    return `${anos}a`;
  };

  const tempoRelativo = formatarTempoRelativo(review.dataAvaliacao);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Header do card */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Avatar do usuário */}
          <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0">
            {review.usuario.fotoUrl ? (
              <img
                src={review.usuario.fotoUrl}
                alt={review.usuario.nome}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {review.usuario.nome.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Info do usuário */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-purple-600 font-medium text-sm sm:text-base">
                @{review.usuario.nomeUsuario}
              </span>
              <span className="text-gray-500 text-sm hidden sm:inline">
                avaliou
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                {review.dorama.nome}
              </h3>
              <span className="text-gray-500 text-xs sm:text-sm flex-shrink-0">
                ({review.dorama.anoLancamento})
              </span>
            </div>
          </div>
        </div>

        {/* Tempo da avaliação */}
        <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm flex-shrink-0 ml-2">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>{tempoRelativo}</span>
        </div>
      </div>

      {/* Avaliação e estrelas */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-1">
          {renderStars(review.nota)}
        </div>
        <span className="text-lg sm:text-xl font-bold text-gray-900">
          {review.nota}.0
        </span>
        {review.recomendacao && (
          <div className="flex items-center gap-1 text-purple-600">
            <span className="text-xs sm:text-sm font-medium">Recomenda</span>
          </div>
        )}
      </div>

      {/* Comentário */}
      <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
        "{review.comentario}"
      </p>

      {/* Gêneros */}
      <div className="flex flex-wrap gap-2 mb-4">
        {review.dorama.generos.map((genero) => (
          <span
            key={genero}
            className="px-3 py-1.5 sm:px-2 sm:py-1 bg-purple-50 text-purple-700 text-xs sm:text-xs font-medium rounded-lg sm:rounded-md"
          >
            {genero}
          </span>
        ))}
      </div>

      {/* Ações do card */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 sm:gap-6">
          <button className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors p-2 sm:p-1 -m-2 sm:-m-1 touch-manipulation">
            <Heart className="w-4 h-4 sm:w-4 sm:h-4" />
            <span className="text-sm">12</span>
          </button>
          <button className="text-sm text-gray-500 hover:text-purple-600 transition-colors p-2 sm:p-1 -m-2 sm:-m-1 touch-manipulation">
            Responder
          </button>
        </div>

        <button className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors px-3 py-2 sm:px-2 sm:py-1 -mx-3 sm:-mx-2 -my-2 sm:-my-1 touch-manipulation">
          Ver dorama
        </button>
      </div>
    </div>
  );
}
