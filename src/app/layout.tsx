import { Inter } from 'next/font/google';
import { Navbar } from '../components/layout/Navbar';
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
  // Aqui você pode definir se o usuário está logado ou não
  // Por exemplo, pegando de um context, cookie, etc.
  const user = undefined; // ou seu objeto de usuário

  // Exemplo de usuário logado:
  // const user = {
  //   id: "1",
  //   username: "João",
  //   avatar: "https://example.com/avatar.jpg"
  // };

  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Navbar user={user} />
        <main>{children}</main>
      </body>
    </html>
  );
}
