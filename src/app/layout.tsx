import { Inter } from 'next/font/google';
import { Header } from '../components/layout/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'KDramaSystem - Acompanhe seus doramas favoritos',
  description:
    'Sistema completo para acompanhar, avaliar e descobrir novos doramas coreanos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
