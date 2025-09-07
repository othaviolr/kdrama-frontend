import { Star, Users, Award, Heart, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ActorsHeader() {
  const router = useRouter();

  return (
    <div className="relative min-h-[50vh] overflow-hidden">
      {/* Background com imagem de fundo desfocada */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1489749798305-4fea3ae436d8?w=1600&h=900&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-20 blur-[3px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/75 via-purple-900/70 to-indigo-900/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-black/20" />
      </div>

      {/* Efeitos visuais modernos - mais escuros */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-900 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-800 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Botão de voltar moderno */}
      <div className="absolute top-0 left-0 right-0 z-30 p-6">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300 bg-black/20 backdrop-blur-md rounded-full px-4 py-2 hover:bg-black/30 border border-white/10 hover:border-white/20"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Voltar</span>
        </button>
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-20 flex items-center justify-center min-h-[50vh] p-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col items-center text-center">
            {/* Informações principais */}
            <div className="space-y-6 max-w-4xl">
              {/* Título principal */}
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  Conheça os Atores
                </h1>
                <p className="text-xl text-purple-200/90 font-medium">
                  Os talentos por trás dos seus doramas favoritos
                </p>
              </div>

              {/* Estatísticas importantes */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-white/90">
                <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-500/30">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-white">500+ Atores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-300" />
                  <span className="font-medium">50+ Premiações</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-300" />
                  <span className="font-medium">1M+ Fãs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-300" />
                  <span className="font-medium">20+ Países</span>
                </div>
              </div>

              {/* Categorias/Tags */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Atores Coreanos',
                  'Estrelas em Ascensão',
                  'Veteranos',
                  'K-Drama',
                  'C-Drama',
                  'J-Drama',
                  'Romance',
                  'Ação',
                ].map((categoria, index) => (
                  <span
                    key={categoria}
                    className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards',
                    }}
                  >
                    {categoria}
                  </span>
                ))}
              </div>

              {/* Descrição adicional */}
              <div className="text-lg text-purple-100/80 max-w-2xl mx-auto leading-relaxed">
                Descubra biografias, filmografias e curiosidades dos atores mais
                amados. Explore trajetórias inspiradoras e conecte-se com os
                talentos que dão vida aos seus personagens favoritos.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradiente inferior para transição suave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10" />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
