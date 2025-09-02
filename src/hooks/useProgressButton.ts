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
import { DoramaCompleto } from '../types/dorama';
import { StatusDoramaEnum, StatusDoramaLabels } from '../types/progresso';
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
    if (!dorama.temporadas.length) {
      return {
        hasProgress: false,
        status: null,
        label: 'Adicionar Progresso',
        icon: Check,
        colorClass:
          'bg-white border-2 border-violet-400 hover:border-violet-500 hover:bg-violet-50 text-violet-700 shadow-sm hover:shadow-md transition-all duration-200',
      };
    }

    let progressoAtivo = null;
    for (const temporada of dorama.temporadas) {
      const progresso = progressos.find((p) => p.temporadaId === temporada.id);
      if (progresso) {
        progressoAtivo = progresso;
        break;
      }
    }

    if (!progressoAtivo) {
      return {
        hasProgress: false,
        status: null,
        label: 'Adicionar Progresso',
        icon: Check,
        colorClass:
          'bg-white border-2 border-violet-400 hover:border-violet-500 hover:bg-violet-50 text-violet-700 shadow-sm hover:shadow-md transition-all duration-200',
      };
    }

    const statusMap = {
      [StatusDoramaEnum.PlanejoAssistir]: {
        label: StatusDoramaLabels[StatusDoramaEnum.PlanejoAssistir],
        icon: Clock,
        colorClass:
          'bg-white border-2 border-violet-300 hover:border-violet-400 hover:bg-violet-50 text-violet-600 shadow-sm hover:shadow-md transition-all duration-200',
      },
      [StatusDoramaEnum.Assistindo]: {
        label: StatusDoramaLabels[StatusDoramaEnum.Assistindo],
        icon: Play,
        colorClass:
          'bg-white border-2 border-violet-400 hover:border-violet-500 hover:bg-violet-50 text-violet-600 shadow-sm hover:shadow-md transition-all duration-200',
      },
      [StatusDoramaEnum.Pausado]: {
        label: StatusDoramaLabels[StatusDoramaEnum.Pausado],
        icon: Pause,
        colorClass:
          'bg-white border-2 border-violet-300 hover:border-violet-400 hover:bg-violet-50 text-violet-600 shadow-sm hover:shadow-md transition-all duration-200',
      },
      [StatusDoramaEnum.Abandonado]: {
        label: StatusDoramaLabels[StatusDoramaEnum.Abandonado],
        icon: Ban,
        colorClass:
          'bg-white border-2 border-gray-300 hover:border-violet-400 hover:bg-violet-50 text-gray-500 hover:text-violet-600 shadow-sm hover:shadow-md transition-all duration-200',
      },
      [StatusDoramaEnum.Concluido]: {
        label: StatusDoramaLabels[StatusDoramaEnum.Concluido],
        icon: CheckCircle,
        colorClass:
          'bg-white border-2 border-violet-400 hover:border-violet-500 hover:bg-violet-50 text-violet-600 shadow-sm hover:shadow-md transition-all duration-200',
      },
    };

    const statusConfig = statusMap[progressoAtivo.status];
    const resultado: ProgressoInfoComProgresso = {
      hasProgress: true,
      status: progressoAtivo.status,
      episodiosAssistidos: progressoAtivo.episodiosAssistidos,
      ...statusConfig,
    };

    return resultado;
  }, [dorama.temporadas, progressos, lastUpdate]);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
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
