import { Lista } from '@/types/lista';
import { CalendarIcon, FilmIcon, UserIcon } from '@heroicons/react/24/outline';

interface ListaStatsProps {
  lista: Lista;
}

export function ListaStats({ lista }: ListaStatsProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <FilmIcon className="w-8 h-8 text-purple-500" />
          <div>
            <div className="text-2xl font-bold text-black">
              {lista.doramas.length}
            </div>
            <div className="text-sm text-purple-600 font-medium">
              {lista.doramas.length === 1 ? 'Dorama' : 'Doramas'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <CalendarIcon className="w-8 h-8 text-purple-500" />
          <div>
            <div className="text-sm font-semibold text-black">Criada em</div>
            <div className="text-sm text-gray-600">
              {formatDate(lista.dataCriacao)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <UserIcon className="w-8 h-8 text-purple-500" />
          <div>
            <div className="text-sm font-semibold text-black">Criador</div>
            <div className="text-sm text-gray-600">Você</div>
          </div>
        </div>
      </div>
    </div>
  );
}
