import Link from 'next/link';
import { HelpCircle, ChevronDown } from 'lucide-react';

const perguntas = [
  {
    pergunta: 'Como adiciono um dorama à minha lista?',
    resposta:
      'Na página de detalhes de qualquer dorama, clique no botão "Adicionar à Lista". Você pode escolher uma lista existente ou criar uma nova. Suas listas ficam disponíveis no seu perfil.',
  },
  {
    pergunta: 'Como registro meu progresso em um episódio?',
    resposta:
      'Na página de detalhes do dorama, vá até a seção de temporadas e episódios. Clique no ícone de progresso ao lado do episódio que assistiu para marcá-lo como visto.',
  },
  {
    pergunta: 'Como faço uma avaliação?',
    resposta:
      'Na página de detalhes do dorama, role até a seção de avaliações e clique em "Avaliar". Você pode dar uma nota de 1 a 10 estrelas e escrever um comentário sobre o dorama.',
  },
  {
    pergunta: 'Posso criar várias listas personalizadas?',
    resposta:
      'Sim! No seu perfil, acesse a aba "Listas" e clique em "Nova Lista". Você pode criar quantas listas quiser e dar nomes como "Assistindo", "Quero Assistir", "Favoritos", etc.',
  },
  {
    pergunta: 'Como sigo outros usuários?',
    resposta:
      'Acesse o perfil público de outro usuário pelo nome de usuário e clique no botão "Seguir". Você pode ver as atividades de quem você segue na aba de feed.',
  },
  {
    pergunta: 'Como altero minha foto de perfil?',
    resposta:
      'No seu perfil, clique em "Editar Perfil". Você poderá atualizar sua foto, nome de exibição e outras informações da sua conta.',
  },
  {
    pergunta: 'O que fazer se encontrar um erro no sistema?',
    resposta:
      'Entre em contato conosco pela página de Contato descrevendo o problema encontrado. Informe o que estava fazendo quando o erro ocorreu para que possamos ajudar mais rapidamente.',
  },
];

export default function AjudaPage() {
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
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Central de Ajuda
          </h1>
          <p className="text-gray-600 text-lg">
            Encontre respostas para as dúvidas mais comuns sobre o Hanlyu Drama.
          </p>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          {perguntas.map((item, index) => (
            <details
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-semibold text-gray-800 hover:text-purple-700 transition-colors">
                {item.pergunta}
                <ChevronDown className="w-5 h-5 flex-shrink-0 text-purple-400 group-open:rotate-180 transition-transform duration-300" />
              </summary>
              <div className="px-6 pb-5">
                <div className="h-px bg-gray-100 mb-4" />
                <p className="text-gray-600 leading-relaxed">{item.resposta}</p>
              </div>
            </details>
          ))}
        </div>

        {/* CTA contato */}
        <div className="mt-12 text-center bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-white/60 p-8">
          <p className="text-gray-700 font-medium mb-2">
            Não encontrou o que procurava?
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Nossa equipe está pronta para ajudar você.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 hover:shadow-lg transition-all duration-300"
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
