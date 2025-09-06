import { ReviewCard } from './ReviewCard';

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

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {reviews.length}{' '}
          {reviews.length === 1
            ? 'avaliação encontrada'
            : 'avaliações encontradas'}
        </h2>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
