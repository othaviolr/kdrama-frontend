import Link from 'next/link';
import { Shield } from 'lucide-react';

const secoes = [
  {
    titulo: '1. Informações que coletamos',
    conteudo:
      'Coletamos as informações que você nos fornece diretamente ao criar sua conta, como nome, nome de usuário, endereço de e-mail e foto de perfil. Também registramos dados de uso da plataforma, como doramas assistidos, avaliações publicadas, listas criadas e interações sociais (seguir/seguidores).',
  },
  {
    titulo: '2. Como usamos suas informações',
    conteudo:
      'Utilizamos seus dados para operar e melhorar a plataforma, personalizar sua experiência, exibir seu histórico de doramas e progresso, permitir interações sociais com outros usuários e enviar comunicações relacionadas à sua conta quando necessário.',
  },
  {
    titulo: '3. Compartilhamento de dados',
    conteudo:
      'Não vendemos nem compartilhamos seus dados pessoais com terceiros para fins comerciais. Informações do seu perfil público (nome de usuário, foto, listas públicas e avaliações) são visíveis para outros usuários da plataforma conforme sua configuração de privacidade.',
  },
  {
    titulo: '4. Armazenamento e segurança',
    conteudo:
      'Seus dados são armazenados em servidores seguros. Utilizamos autenticação via token JWT para proteger o acesso à sua conta. Recomendamos que você mantenha sua senha segura e não a compartilhe com terceiros.',
  },
  {
    titulo: '5. Cookies e armazenamento local',
    conteudo:
      'Utilizamos o armazenamento local do navegador (localStorage) para manter sua sessão ativa e salvar preferências. Não utilizamos cookies de rastreamento ou publicidade de terceiros.',
  },
  {
    titulo: '6. Seus direitos',
    conteudo:
      'Você pode acessar, corrigir ou solicitar a exclusão dos seus dados pessoais a qualquer momento por meio das configurações do perfil ou entrando em contato conosco. A exclusão da conta remove permanentemente todos os seus dados da plataforma.',
  },
  {
    titulo: '7. Alterações nesta política',
    conteudo:
      'Podemos atualizar esta política periodicamente. Quando houver mudanças significativas, notificaremos os usuários pela plataforma. O uso continuado do serviço após as alterações implica a aceitação da nova política.',
  },
];

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-purple-100/20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Política de Privacidade
          </h1>
          <p className="text-gray-500 text-sm">
            Última atualização: março de 2026
          </p>
          <p className="text-gray-600 mt-3 text-base">
            Sua privacidade é importante para nós. Esta política explica como
            coletamos, usamos e protegemos suas informações.
          </p>
        </div>

        {/* Seções */}
        <div className="space-y-6">
          {secoes.map((secao, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </span>
                {secao.titulo.replace(/^\d+\.\s/, '')}
              </h2>
              <p className="text-gray-600 leading-relaxed">{secao.conteudo}</p>
            </div>
          ))}
        </div>

        {/* Contato */}
        <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 p-6 text-center">
          <p className="text-gray-700 font-medium mb-1">
            Dúvidas sobre esta política?
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Entre em contato com nossa equipe.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-purple-600 text-purple-700 font-semibold rounded-xl hover:bg-purple-600 hover:text-white transition-all duration-300 text-sm"
          >
            Falar com o suporte
          </Link>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-purple-600 transition-colors font-medium"
          >
            ← Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
