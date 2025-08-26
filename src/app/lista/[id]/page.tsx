'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLista } from 'src/context/ListaContext';
import { useDorama } from 'src/context/DoramaContext';
import { DoramaLista } from '@/types/lista';
import { DoramaCompleto } from '@/types/dorama';
import { ListaBanner } from './components/ListaBanner';
import { ListaStats } from './components/ListaStats';
import { DoramasGrid } from './components/DoramasGrid';
import { Toast } from '../../../components/profile/UserLists/Toast';

interface DoramaWithInfo extends DoramaLista {
  info?: DoramaCompleto;
}

export default function ListaPage() {
  const params = useParams();
  const router = useRouter();
  const { carregarLista, listaAtual, loadingLista, compartilharLista } =
    useLista();
  const { buscarDoramaPorId, carregarDorama } = useDorama();

  const [doramasComInfo, setDoramasComInfo] = useState<DoramaWithInfo[]>([]);
  const [loadingDoramas, setLoadingDoramas] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const listaId = params.id as string;

  useEffect(() => {
    if (listaId) {
      carregarLista(listaId);
    }
  }, [listaId]);

  useEffect(() => {
    if (listaAtual?.doramas) {
      carregarInformacoesDoramas();
    }
  }, [listaAtual]);

  const carregarInformacoesDoramas = async () => {
    if (!listaAtual?.doramas) return;

    setLoadingDoramas(true);
    try {
      const doramasComInfoPromises = listaAtual.doramas.map(async (dorama) => {
        let info = buscarDoramaPorId(dorama.doramaId);

        if (!info) {
          await carregarDorama(dorama.doramaId);
          info = buscarDoramaPorId(dorama.doramaId);
        }

        return { ...dorama, info };
      });

      const doramasComInfoResult = await Promise.all(doramasComInfoPromises);
      setDoramasComInfo(doramasComInfoResult);
    } catch (error) {
      console.error('Erro ao carregar informações dos doramas:', error);
    } finally {
      setLoadingDoramas(false);
    }
  };

  const handleCompartilhar = async () => {
    if (!listaAtual) return;

    try {
      let shareToken = listaAtual.shareToken;

      if (!shareToken) {
        shareToken = await compartilharLista(listaAtual.id);
      }

      const shareUrl = `${window.location.origin}/lista/compartilhada/${shareToken}`;
      await navigator.clipboard.writeText(shareUrl);

      showToast('Link copiado para a área de transferência!', 'success');
    } catch (error) {
      console.error('Erro ao compartilhar lista:', error);
      showToast('Erro ao copiar link', 'error');
    }
  };

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (loadingLista) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-purple-600 font-medium">
                Carregando lista...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listaAtual) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <div className="w-10 h-10 text-purple-400">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Lista não encontrada
            </h1>
            <p className="text-gray-600 mb-6">
              A lista que você está procurando pode ter sido removida ou não
              existe.
            </p>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl transition-colors duration-200 font-medium"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <ListaBanner
          lista={listaAtual}
          onBack={() => router.back()}
          onShare={handleCompartilhar}
        />

        <ListaStats lista={listaAtual} />

        <DoramasGrid
          doramas={doramasComInfo}
          loading={loadingDoramas}
          onDoramaClick={(doramaId) => router.push(`/dorama/${doramaId}`)}
        />

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
