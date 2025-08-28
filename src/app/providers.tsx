'use client';

import { AuthProvider } from '../context/AuthContext';
import { DoramaProvider } from '../context/DoramaContext';
import { ProgressoProvider } from '../context/ProgressoContext';
import { AtividadeProvider } from '../context/AtividadeContext';
import { AvaliacaoProvider } from '../context//AvaliacaoContext';
import { ListaProvider } from '../context//ListaContext';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <DoramaProvider>
        <ProgressoProvider>
          <AtividadeProvider>
            <AvaliacaoProvider>
              <ListaProvider>{children}</ListaProvider>
            </AvaliacaoProvider>
          </AtividadeProvider>
        </ProgressoProvider>
      </DoramaProvider>
    </AuthProvider>
  );
}
