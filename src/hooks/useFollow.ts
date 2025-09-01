import { useState, useCallback, useEffect } from 'react';
import { usuarioService } from '../services/usuarioService';

interface UseFollowOptions {
  usuarioId: string;
  isFollowingInitial: boolean;
  onSuccess?: (isFollowing: boolean) => void;
  onError?: (error: Error) => void;
}

export function useFollow({
  usuarioId,
  isFollowingInitial,
  onSuccess,
  onError,
}: UseFollowOptions) {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsFollowing(isFollowingInitial);
  }, [isFollowingInitial]);

  const toggleFollow = useCallback(async () => {
    if (isLoading) return;

    console.log('🚀 Iniciando toggle follow:', { usuarioId, isFollowing });
    setIsLoading(true);

    try {
      if (isFollowing) {
        console.log('🔄 Deixando de seguir usuário:', usuarioId);
        await usuarioService.deixarDeSeguir(usuarioId);
        console.log('✅ Deixou de seguir com sucesso');
        setIsFollowing(false);
        onSuccess?.(false);
      } else {
        console.log('🔄 Seguindo usuário:', usuarioId);
        await usuarioService.seguirUsuario(usuarioId);
        console.log('✅ Seguiu com sucesso');
        setIsFollowing(true);
        onSuccess?.(true);
      }
    } catch (error: any) {
      console.error('❌ Erro detalhado ao seguir/deixar de seguir:', error);

      if (error?.message?.includes('Você já segue esse usuário')) {
        console.log('🔧 Corrigindo estado: usuário já está sendo seguido');
        setIsFollowing(true);
        onSuccess?.(true);
        return;
      }

      if (
        error?.message?.includes('Você não segue esse usuário') ||
        error?.message?.includes('não está seguindo')
      ) {
        console.log('🔧 Corrigindo estado: usuário não está sendo seguido');
        setIsFollowing(false);
        onSuccess?.(false);
        return;
      }

      if (error && typeof error === 'object') {
        console.error('❌ Error.message:', error.message);
        console.error('❌ Error.status:', error.status);
        console.error('❌ Error.response:', error.response);
      }

      onError?.(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [usuarioId, isFollowing, isLoading, onSuccess, onError]);

  return {
    isFollowing,
    isLoading,
    toggleFollow,
  };
}
