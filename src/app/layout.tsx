import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ModernNavbar } from '@/components/layout/ModernNavbar';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KDrama System - Seu universo de doramas',
  description:
    'A plataforma mais moderna para acompanhar, descobrir e compartilhar sua paixão por doramas asiáticos',
  keywords: ['kdrama', 'dorama', 'asian drama', 'korean drama', 'streaming'],
  authors: [{ name: 'KDrama System Team' }],
  openGraph: {
    title: 'KDrama System',
    description: 'A plataforma mais moderna para acompanhar doramas',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={inter.className}>
        {/* Background gradiente moderno */}
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
          {/* Efeitos de background */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Gradiente sutil */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            <div
              className="absolute top-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: '2s' }}
            />
            <div
              className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: '4s' }}
            />
          </div>

          {/* Navbar com glassmorphism */}
          <ModernNavbar
            user={{
              id: '1',
              username: 'dev_user',
              avatar:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
            }}
          />

          {/* Conteúdo principal com padding para navbar fixa */}
          <main className="relative z-10 pt-16">{children}</main>

          {/* Scroll to top button - agora como componente separado */}
          <ScrollToTop />
        </div>
      </body>
    </html>
  );
}
