export default function DoramaLoading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-purple-600 font-medium">
          Carregando detalhes...
        </span>
      </div>
    </div>
  );
}
