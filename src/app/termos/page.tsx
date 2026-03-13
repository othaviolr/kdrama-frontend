import Link from 'next/link';
import { FileText } from 'lucide-react';

const secoes = [
  {
    titulo: 'Aceitação dos termos',
    conteudo:
      'Ao criar uma conta ou utilizar o Hanlyu Drama, você concorda com estes Termos de Uso. Se não concordar com alguma parte, pedimos que não utilize a plataforma.',
  },
  {
    titulo: 'Elegibilidade',
    conteudo:
      'A plataforma é destinada a usuários com 13 anos ou mais. Ao se cadastrar, você confirma que atende a esse requisito. Caso seja menor de 18 anos, recomendamos o uso com supervisão de um responsável.',
  },
  {
    titulo: 'Conta de usuário',
    conteudo:
      'Você é responsável por manter a confidencialidade das credenciais da sua conta e por todas as atividades realizadas nela. Não é permitido criar múltiplas contas para o mesmo usuário ou usar a conta de outra pessoa.',
  },
  {
    titulo: 'Uso aceitável',
    conteudo:
      'Você concorda em usar a plataforma apenas para fins legais e de acordo com estes termos. É proibido publicar conteúdo ofensivo, discriminatório, com spam ou que viole direitos de terceiros. Reservamo-nos o direito de remover conteúdos e suspender contas que violem estas regras.',
  },
  {
    titulo: 'Conteúdo do usuário',
    conteudo:
      'Avaliações, comentários e listas criadas por você permanecem de sua autoria. Ao publicá-los na plataforma, você nos concede uma licença não exclusiva para exibi-los e distribuí-los dentro do Hanlyu Drama. Você garante que seus conteúdos não infringem direitos de terceiros.',
  },
  {
    titulo: 'Propriedade intelectual',
    conteudo:
      'A marca, design e código do Hanlyu Drama são protegidos por direitos autorais. O uso não autorizado desses elementos é proibido. As informações sobre doramas, como títulos, sinopses e imagens de capa, são de propriedade de seus respectivos detentores.',
  },
  {
    titulo: 'Limitação de responsabilidade',
    conteudo:
      'O Hanlyu Drama é fornecido "como está". Não garantimos disponibilidade ininterrupta e não nos responsabilizamos por perdas de dados ou danos decorrentes do uso da plataforma. Fazemos nosso melhor para manter o serviço estável e seguro.',
  },
  {
    titulo: 'Encerramento de conta',
    conteudo:
      'Você pode encerrar sua conta a qualquer momento pelas configurações do perfil. Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos, sem aviso prévio em casos graves.',
  },
  {
    titulo: 'Alterações nos termos',
    conteudo:
      'Podemos atualizar estes termos periodicamente. Informaremos sobre mudanças significativas pela plataforma. O uso continuado após as alterações indica sua aceitação dos novos termos.',
  },
];

export default function TermosPage() {
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
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Termos de Uso
          </h1>
          <p className="text-gray-500 text-sm">
            Última atualização: março de 2026
          </p>
          <p className="text-gray-600 mt-3 text-base">
            Leia atentamente antes de utilizar o Hanlyu Drama. Estes termos
            regem o uso da plataforma.
          </p>
        </div>

        {/* Índice */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 p-6 mb-8">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
            Sumário
          </h2>
          <ol className="space-y-1.5">
            {secoes.map((secao, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-purple-500 font-bold w-5 flex-shrink-0">
                  {index + 1}.
                </span>
                {secao.titulo}
              </li>
            ))}
          </ol>
        </div>

        {/* Seções */}
        <div className="space-y-5">
          {secoes.map((secao, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </span>
                {secao.titulo}
              </h2>
              <p className="text-gray-600 leading-relaxed">{secao.conteudo}</p>
            </div>
          ))}
        </div>

        {/* Contato */}
        <div className="mt-10 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 p-6 text-center">
          <p className="text-gray-700 font-medium mb-1">
            Dúvidas sobre estes termos?
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
