'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, User, Send, CheckCircle } from 'lucide-react';

export default function ContatoPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setEnviando(false);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-purple-100/20 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full mb-6 shadow-lg">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Mensagem enviada!
          </h2>
          <p className="text-gray-600 mb-8">
            Obrigado pelo contato, <span className="font-semibold text-purple-700">{nome}</span>. Retornaremos em até 2 dias úteis para o e-mail <span className="font-semibold">{email}</span>.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-purple-100/20 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-lg">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl mb-4 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Contato</h1>
            <p className="text-gray-600">
              Envie sua mensagem e retornaremos em até 2 dias úteis.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nome */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Nome
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  required
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-sm outline-none font-medium placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                E-mail
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-sm outline-none font-medium placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Assunto */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Assunto
              </label>
              <select
                value={assunto}
                onChange={(e) => setAssunto(e.target.value)}
                required
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-sm outline-none font-medium text-gray-700"
              >
                <option value="" disabled>
                  Selecione um assunto
                </option>
                <option value="duvida">Dúvida geral</option>
                <option value="erro">Reportar erro</option>
                <option value="sugestao">Sugestão</option>
                <option value="conta">Problema com conta</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {/* Mensagem */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Mensagem
              </label>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 text-gray-400 w-5 h-5 group-focus-within:text-purple-500 transition-colors" />
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Descreva sua dúvida ou sugestão..."
                  required
                  rows={4}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-2xl bg-gray-50/50 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-sm outline-none font-medium placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-purple-800 hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {enviando ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar mensagem
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
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
