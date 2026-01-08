import { useMemo, useRef } from "react";
import logoScript from "../assets/hero/logo-script.png";
import frame from "../assets/hero/frame.png";
import ringYellow from "../assets/hero/ring-yellow.png";
import ringPink from "../assets/hero/ring-pink.png";

export default function HeroSection() {
  const wrapRef = useRef(null);

  const onMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = wrapRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.setProperty("--px", (x * 10).toFixed(2) + "px");
    el.style.setProperty("--py", (y * 10).toFixed(2) + "px");
  };

  const partyFeatures = [
    { label: "Chuleteada", icon: "🍖", color: "from-orange-400 to-red-500" },
    { label: "DJ en Vivo", icon: "🎧", color: "from-purple-500 to-indigo-600" },
    { label: "Piscina", icon: "💦", color: "from-blue-400 to-cyan-500" },
    { label: "Open Bar", icon: "🍹", color: "from-pink-500 to-rose-500" },
  ];

  const bubbles = Array.from({ length: 35 });

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-slate-900 isolate p-1 md:p-4">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-8px) rotate(1deg); } }
        @keyframes rise {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
        .animate-fade { animation: fadeIn 0.6s ease-out forwards; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .bubble {
          position: absolute;
          bottom: -50px;
          background: rgba(255, 255, 255, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 5;
          animation: rise linear infinite;
        }

        /* Estilo específico para Android */
        @media (max-width: 768px) and (pointer: coarse) {
          /* Aseguramos que el contenido ocupe toda la pantalla */
          .hero-content {
            font-size: 1.5rem; /* Aumentamos el tamaño del contenido */
            padding: 0; /* Eliminamos padding */
            margin-top: 0; /* Eliminamos margen superior */
            margin-bottom: 0; /* Eliminamos margen inferior */
            min-height: 100vh; /* Hacemos que ocupe toda la pantalla */
          }

          /* Título más grande */
          .text-title {
            font-size: 2.5rem;
          }

          /* Burbujas más pequeñas */
          .bubble {
            width: 15px;
            height: 15px;
          }

          /* El contenido de la tarjeta debe estar más cerca de los bordes */
          .card {
            padding: 10px;
            margin: 0;
          }

          /* Hacemos que los elementos estén en una sola columna */
          .grid {
            grid-template-columns: 1fr;
            gap: 4px; /* Reducimos el espacio entre elementos */
          }
        }
      `}</style>

      {/* FONDO */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${frame})` }}
        />
      </div>

      {/* BURBUJAS */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {bubbles.map((_, i) => (
          <div
            key={i}
            className="bubble"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        className="relative z-20 w-full max-w-[95%] lg:max-w-6xl mx-auto" 
      >
        <div 
          className="transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(var(--px, 0px), var(--py, 0px), 0)` }}
        >
          {/* TARJETA: px-3 en móvil para casi tocar los bordes */}
          <div className="backdrop-blur-2xl bg-white/80 border border-white/40 rounded-[35px] md:rounded-[80px] px-3 py-6 md:p-12 lg:px-20 lg:py-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-center hero-content">
            
            {/* LOGO AGRANDADO EN MÓVIL */}
            <div className="animate-float mb-4 lg:mb-8">
              <img 
                src={logoScript} 
                alt="Logo" 
                className="mx-auto w-full max-w-[180px] md:max-w-[200px] lg:max-w-[340px] drop-shadow-md" 
              />
            </div>

            {/* TÍTULO */}
            <div className="space-y-1 md:space-y-2 mb-6 lg:mb-10 animate-fade">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] text-title">
                Fundo <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-500">
                  Linda Pau
                </span>
              </h1>
              <p className="text-cyan-800 font-bold tracking-[0.3em] text-[8px] md:text-xs lg:text-sm uppercase">
                Sábado • 07 Febrero • 2026
              </p>
            </div>

            {/* ATRACTIVOS: gap-2 en móvil para aprovechar espacio */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mb-8 lg:mb-10">
              {partyFeatures.map((f, i) => (
                <div 
                  key={i}
                  className="flex items-center lg:flex-col lg:justify-center gap-2 bg-white/60 rounded-xl p-2 md:p-5 border border-white transition-all hover:bg-white shadow-sm"
                >
                  <div className={`w-8 h-8 md:w-14 md:h-14 shrink-0 rounded-lg md:rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-lg md:text-3xl shadow-lg`}>
                    {f.icon}
                  </div>
                  <span className="text-[8px] md:text-xs lg:text-[11px] font-black uppercase text-slate-800 tracking-tight lg:tracking-widest lg:text-center">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            {/* FRASE Y REGISTRO */}
            <div className="animate-fade" style={{ animationDelay: '0.4s' }}>
              <p className="text-slate-600 font-bold italic text-xs md:text-lg lg:text-xl mb-4 lg:mb-6 px-4">
                "Prepárate para vivir una experiencia inolvidable"
              </p>
              
              <div className="flex flex-col items-center gap-1.5 lg:gap-2">
                <span className="text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase tracking-[0.4em] text-cyan-600/80 animate-pulse">
                  Desliza
                </span>
                <div className="w-1 h-5 lg:h-8 bg-gradient-to-b from-cyan-500 to-transparent rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ANILLOS POSICIONADOS MÁS HACIA AFUERA */}
      <img src={ringYellow} className="absolute top-[2%] left-[-8%] w-24 md:w-48 lg:w-64 opacity-20 animate-float pointer-events-none z-10" alt="" />
      <img src={ringPink} className="absolute bottom-[2%] right-[-8%] w-32 md:w-56 lg:w-72 opacity-20 animate-float pointer-events-none z-10" alt="" style={{ animationDelay: '-3s' }} />
    </section>
  );
}
