import { RectangleStackIcon, SparklesIcon } from '@heroicons/react/24/outline';

export function EmptyActivity() {
  return (
    <div className="text-center py-16">
      <div className="relative">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:scale-105 transition-transform duration-200">
          <RectangleStackIcon className="w-12 h-12 text-purple-500" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-3">
        Nenhuma atividade ainda
      </h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Quando você começar a avaliar doramas, criar listas ou atualizar
        progressos, suas atividades aparecerão aqui
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button className="group px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium">
          <span className="flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            Explorar Doramas
          </span>
        </button>
      </div>
    </div>
  );
}
