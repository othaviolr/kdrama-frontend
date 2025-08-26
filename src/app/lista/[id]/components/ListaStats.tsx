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
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
            <FilmIcon className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {lista.doramas.length}
            </div>
            <div className="text-sm text-gray-600">
              {lista.doramas.length === 1 ? 'Dorama' : 'Doramas'}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
            <CalendarIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Criada em</div>
            <div className="text-sm text-gray-600">
              {formatDate(lista.dataCriacao)}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Criador</div>
            <div className="text-sm text-gray-600">Você</div>
          </div>
        </div>
      </div>
    </div>
  );
}
