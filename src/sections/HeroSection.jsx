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
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-slate-900 isolate p-3 md:p-4">
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

        @media (max-width: 768px) {
          .hero-card {
            padding: 2rem 1.25rem !important; /* Reducido de 3rem */
          }
          .text-title {
            font-size: 2.8rem !important; /* Reducido de 3.2rem */
          }
          .logo-img {
            max-width: 170px !important; /* Reducido de 220px */
          }
          .feature-icon {
            width: 3.2rem !important; /* Reducido de 3.8rem */
            height: 3.2rem !important;
            font-size: 1.6rem !important;
          }
          .feature-label {
            font-size: 10px !important;
          }
        }
      `}</style>

      {/* FONDO (Sin cambios) */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${frame})` }}
        />
      </div>

      {/* BURBUJAS (Sin cambios) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {bubbles.map((_, i) => (
          <div key={i} className="bubble" style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              animationDelay: `${Math.random() * 8}s`,
          }} />
        ))}
      </div>

      <div ref={wrapRef} onMouseMove={onMouseMove} className="relative z-20 w-full max-w-[96%] lg:max-w-6xl mx-auto">
        <div className="transition-transform duration-700 ease-out" style={{ transform: `translate3d(var(--px, 0px), var(--py, 0px), 0)` }}>
          
          <div className="backdrop-blur-2xl bg-white/85 border border-white/60 rounded-[45px] md:rounded-[80px] px-4 py-8 md:p-12 lg:px-20 lg:py-10 shadow-2xl text-center hero-card">
            
 {/* LOGO: Tamaño aumentado a 240px en móvil */}
            <div className="animate-float mb-6 md:mb-10">
              <img 
                src={logoScript} 
                alt="Logo" 
                className="mx-auto w-full max-w-[240px] md:max-w-[220px] lg:max-w-[340px] drop-shadow-md logo-img" 
              />
            </div>

            {/* TÍTULO REDUCIDO */}
            <div className="space-y-2 mb-8 md:mb-12 animate-fade">
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter text-title uppercase italic">
                Fundo <br className="block md:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-500">
                  Linda Pau
                </span>
              </h1>
              <p className="text-cyan-800 font-black tracking-[0.2em] text-[10px] md:text-xs lg:text-sm uppercase">
                Sábado • 07 Febrero • 2026
              </p>
            </div>

            {/* ATRACTIVOS: Iconos más compactos */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
              {partyFeatures.map((f, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-2 bg-slate-50/50 rounded-[20px] p-3 border border-white shadow-sm feature-item">
                  <div className={`w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl shadow-lg feature-icon text-white`}>
                    {f.icon}
                  </div>
                  <span className="text-[10px] md:text-xs lg:text-[11px] font-black uppercase text-slate-800 tracking-tight feature-label">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>

            {/* PIE DE TARJETA: Margen de deslizar reducido */}
            <div className="animate-fade" style={{ animationDelay: '0.4s' }}>
              <p className="text-slate-600 font-bold italic text-sm md:text-xl lg:text-2xl mb-4 px-2">
                "Una experiencia inolvidable"
              </p>
              
              <div className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-600 animate-pulse">
                  Desliza
                </span>
                <div className="w-[2px] h-6 bg-gradient-to-b from-cyan-500 to-transparent rounded-full animate-bounce" />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ANILLOS */}
      <img src={ringYellow} className="absolute top-[2%] left-[-5%] w-28 md:w-48 lg:w-64 opacity-20 animate-float pointer-events-none z-10" alt="" />
      <img src={ringPink} className="absolute bottom-[2%] right-[-5%] w-32 md:w-56 lg:w-72 opacity-20 animate-float pointer-events-none z-10" alt="" style={{ animationDelay: '-3s' }} />
    </section>
  );
}