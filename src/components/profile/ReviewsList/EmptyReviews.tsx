import { StarIcon, PlusIcon } from '@heroicons/react/24/outline';

export function EmptyReviews() {
  return (
    <div className="text-center py-16">
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:scale-105 transition-transform duration-200">
          <StarIcon className="w-12 h-12 text-yellow-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Nenhuma review ainda
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Comece avaliando seus doramas favoritos e compartilhe sua opinião com a
        comunidade
      </p>

      <button className="group px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-2xl hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium">
        <span className="flex items-center gap-2">
          <PlusIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
          Fazer Primeira Review
        </span>
      </button>
    </div>
  );
}
