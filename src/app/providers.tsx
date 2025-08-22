'use client';

import { AuthProvider } from '../context/AuthContext';
import { DoramaProvider } from '../context/DoramaContext';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <DoramaProvider>{children}</DoramaProvider>
    </AuthProvider>
  );
}
