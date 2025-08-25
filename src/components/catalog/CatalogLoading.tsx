export default function CatalogLoading() {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div
            className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-purple-400 rounded-full animate-spin animate-reverse"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
        <span className="text-purple-600 font-semibold text-lg">
          Carregando catálogo...
        </span>
        <p className="text-gray-500 text-sm">
          Preparando os melhores doramas para você
        </p>
      </div>
    </div>
  );
}
