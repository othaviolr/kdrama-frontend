import { useState, useEffect } from 'react';
import { listaService } from 'src/services/listaService';

interface ListaUsuarioApi {
  id: string;
  nome: string;
  descricao: string;
  imagemCapaUrl: string;
  privacidade: number;
  shareToken?: string;
  usuarioId: string;
  dataCriacao: string;
  doramas: Array<{
    doramaId: string;
    dataAdicao: string;
  }>;
}

interface PublicUserListsProps {
  usuarioId: string;
}

export function PublicUserLists({ usuarioId }: PublicUserListsProps) {
  const [listas, setListas] = useState<ListaUsuarioApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarListas();
  }, [usuarioId]);

  const carregarListas = async () => {
    setLoading(true);
    try {
      console.log('📋 Carregando listas públicas para:', usuarioId);

      const data = await listaService.getListasUsuario(usuarioId);
      setListas(data);

      console.log('✅ Listas carregadas:', data.length);
    } catch (error) {
      console.error('❌ Erro ao carregar listas públicas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (listas.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Nenhuma lista pública ainda
        </h3>
        <p className="text-gray-600">
          Este usuário ainda não criou nenhuma lista pública.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {listas.map((lista) => (
        <div
          key={lista.id}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Imagem de capa */}
          <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 relative">
            {lista.imagemCapaUrl ? (
              <img
                src={lista.imagemCapaUrl}
                alt={lista.nome}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-4xl text-gray-400">📋</span>
              </div>
            )}

            {/* Badge de privacidade */}
            <div className="absolute top-2 right-2">
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  lista.privacidade === 1
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {lista.privacidade === 1 ? 'Pública' : 'Privada'}
              </span>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
              {lista.nome}
            </h3>

            {lista.descricao && (
              <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                {lista.descricao}
              </p>
            )}

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{lista.doramas.length} doramas</span>
              <span>{new Date(lista.dataCriacao).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
