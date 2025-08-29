'use client';

import { AuthProvider } from '../context/AuthContext';
import { DoramaProvider } from '../context/DoramaContext';
import { ProgressoProvider } from '../context/ProgressoContext';
import { AtividadeProvider } from '../context/AtividadeContext';
import { AvaliacaoProvider } from '../context/AvaliacaoContext';
import { ListaProvider } from '../context/ListaContext';
import { FeedProvider } from '../context/FeedContext';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <DoramaProvider>
        <ProgressoProvider>
          <AtividadeProvider>
            <AvaliacaoProvider>
              <ListaProvider>
                <FeedProvider> {children}</FeedProvider>
              </ListaProvider>
            </AvaliacaoProvider>
          </AtividadeProvider>
        </ProgressoProvider>
      </DoramaProvider>
    </AuthProvider>
  );
}
