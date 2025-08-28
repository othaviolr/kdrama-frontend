import { useState, useMemo } from 'react';
import {
  Check,
  Clock,
  Play,
  Pause,
  Ban,
  CheckCircle,
  LucideIcon,
} from 'lucide-react';
import { DoramaCompleto } from '@/types/dorama';
import { StatusDoramaEnum, StatusDoramaLabels } from '@/types/progresso';
import { useProgresso } from 'src/context/ProgressoContext';

type ProgressoInfoSemProgresso = {
  hasProgress: false;
  status: null;
  label: string;
  icon: LucideIcon;
  colorClass: string;
  episodiosAssistidos?: undefined;
};

type ProgressoInfoComProgresso = {
  hasProgress: true;
  status: StatusDoramaEnum;
  label: string;
  icon: LucideIcon;
  colorClass: string;
  episodiosAssistidos: number;
};

type ProgressoInfo = ProgressoInfoSemProgresso | ProgressoInfoComProgresso;

export function useProgressButton(dorama: DoramaCompleto) {
  const [showModal, setShowModal] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const { progressos } = useProgresso();

  const progressoInfo = useMemo((): ProgressoInfo => {
    console.log('Hook recalculando progressoInfo... timestamp:', lastUpdate);
    console.log(
      'Temporadas do dorama:',
      dorama.temporadas.map((t) => ({ id: t.id, nome: t.nome }))
    );
    console.log(
      'Progressos disponíveis:',
      progressos.map((p) => ({
        id: p.temporadaId,
        status: p.status,
        eps: p.episodiosAssistidos,
      }))
    );

    if (!dorama.temporadas.length) {
      return {
        hasProgress: false,
        status: null,
        label: 'Adicionar Progresso',
        icon: Check,
        colorClass:
          'bg-white border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700',
      };
    }

    let progressoAtivo = null;
    for (const temporada of dorama.temporadas) {
      const progresso = progressos.find((p) => p.temporadaId === temporada.id);
      console.log(
        `Verificando temporada ${temporada.nome} (${temporada.id}):`,
        progresso
      );

      if (progresso) {
        console.log('Progresso encontrado!', progresso);
        progressoAtivo = progresso;
        break;
      }
    }

    if (!progressoAtivo) {
      console.log('Nenhum progresso encontrado - botão padrão');
      return {
        hasProgress: false,
        status: null,
        label: 'Adicionar Progresso',
        icon: Check,
        colorClass:
          'bg-white border-purple-200 hover:border-purple-300 hover:bg-purple-50 text-purple-700',
      };
    }

    const statusMap = {
      [StatusDoramaEnum.PlanejoAssistir]: {
        label: StatusDoramaLabels[StatusDoramaEnum.PlanejoAssistir],
        icon: Clock,
        colorClass:
          'bg-blue-50 border-blue-200 hover:border-blue-300 hover:bg-blue-100 text-blue-700',
      },
      [StatusDoramaEnum.Assistindo]: {
        label: StatusDoramaLabels[StatusDoramaEnum.Assistindo],
        icon: Play,
        colorClass:
          'bg-green-50 border-green-200 hover:border-green-300 hover:bg-green-100 text-green-700',
      },
      [StatusDoramaEnum.Pausado]: {
        label: StatusDoramaLabels[StatusDoramaEnum.Pausado],
        icon: Pause,
        colorClass:
          'bg-yellow-50 border-yellow-200 hover:border-yellow-300 hover:bg-yellow-100 text-yellow-700',
      },
      [StatusDoramaEnum.Abandonado]: {
        label: StatusDoramaLabels[StatusDoramaEnum.Abandonado],
        icon: Ban,
        colorClass:
          'bg-red-50 border-red-200 hover:border-red-300 hover:bg-red-100 text-red-700',
      },
      [StatusDoramaEnum.Concluido]: {
        label: StatusDoramaLabels[StatusDoramaEnum.Concluido],
        icon: CheckCircle,
        colorClass:
          'bg-purple-50 border-purple-200 hover:border-purple-300 hover:bg-purple-100 text-purple-700',
      },
    };

    const statusConfig = statusMap[progressoAtivo.status];
    const resultado: ProgressoInfoComProgresso = {
      hasProgress: true,
      status: progressoAtivo.status,
      episodiosAssistidos: progressoAtivo.episodiosAssistidos,
      ...statusConfig,
    };

    console.log('Resultado final do hook:', resultado);
    return resultado;
  }, [dorama.temporadas, progressos, lastUpdate]);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      console.log('Forçando recálculo após modal...');
      setLastUpdate(Date.now());
    }, 300);
  };

  return {
    progressoInfo,
    showModal,
    openModal,
    closeModal,
  };
}
