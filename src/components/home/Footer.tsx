import React from 'react';

export function Footer(): JSX.Element {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white mt-12 relative overflow-hidden">
      {/* Subtle background pattern or decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Hanlyu Drama
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-4"></div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md opacity-90">
              Descubra e acompanhe os melhores dramas coreanos. 
              <br/>
                Avalie, comente e conecte-se com outros fãs.
                <br/>
            </p>
          </div>

          {/* Suporte - Alinhado à direita em desktop, left em mobile */}
          <div className="md:w-1/3 md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-white tracking-wide text-left md:text-right">
              Suporte
            </h4>
            <ul className="space-y-3 md:ml-auto">
              {[
                { label: 'Central de Ajuda', href: '#' },
                { label: 'Contato', href: '#' },
                { label: 'Privacidade', href: '#' },
                { label: 'Termos de Uso', href: '#' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 text-sm flex items-center group relative justify-start md:justify-end"
                  >
                    <span className="absolute left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-4 transition-all duration-300 md:left-auto md:right-0 md:group-hover:w-[1rem]"></span>
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex-shrink-0"></span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Linha divisória e Copyright */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Hanlyu Drama. Todos os direitos reservados.
            </p>
            <p className="text-purple-400 text-xs font-medium">
              Desenvolvido por Othávio e Maysa 💜
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}