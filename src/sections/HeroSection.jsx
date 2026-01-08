import { useMemo, useRef } from "react";
import logoScript from "../assets/hero/logo-script.png";
import frame from "../assets/hero/frame.png";
import ringYellow from "../assets/hero/ring-yellow.png";
import ringPink from "../assets/hero/ring-pink.png";

export default function HeroSection() {
  const wrapRef = useRef(null);

  // FUNCIÓN DE SCROLL ULTRA-COMPATIBLE PARA MÓVILES
  const scrollToRegister = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const target = document.getElementById("registro");
    
    if (target) {
      // Intento 1: Estándar moderno
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Intento 2: Fallback manual (para Safari iOS y navegadores antiguos)
      const offset = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const onMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = wrapRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.setProperty("--px", (x * 15).toFixed(2) + "px");
    el.style.setProperty("--py", (y * 15).toFixed(2) + "px");
  };

  const onMouseLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
  };

  const bubbles = useMemo(() => {
    const n = 15; // Reducido para mejor rendimiento móvil
    const rand01 = (i) => {
      const x = Math.sin(i * 437.123) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: n }).map((_, i) => {
      const r1 = rand01(i + 1);
      const r2 = rand01(i + 2);
      return {
        left: r1 * 100,
        size: 10 + r2 * 25,
        delay: -(rand01(i + 3) * 20),
        dur: 10 + r2 * 10,
        op: 0.1 + r1 * 0.2,
      };
    });
  }, []);

  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#f0f9ff] isolate">
      <style>{`
        @keyframes revealUp { from { opacity: 0; transform: translateY(30px); filter: blur(8px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes floating { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes bounceDown { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } 60% { transform: translateY(-4px); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes bubbleFall { 0% { transform: translateY(-10vh) scale(0.8); opacity: 0; } 10% { opacity: 0.3; } 90% { opacity: 0.3; } 100% { transform: translateY(110vh) scale(1.2); opacity: 0; } }
        
        .animate-reveal { animation: revealUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .logo-float { animation: floating 5s ease-in-out infinite; }
        .scroll-arrow { animation: bounceDown 2s infinite; }
        .bubble-anim { animation: bubbleFall linear infinite; }
      `}</style>

      {/* 1. Fondo Frame */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-60 md:opacity-80"
        style={{ backgroundImage: `url(${frame})` }}
      />

      {/* 2. Burbujas (pointer-events-none para no bloquear clics) */}
      {bubbles.map((b, i) => (
        <div 
          key={i} 
          className="absolute top-[-10%] pointer-events-none rounded-full bubble-anim" 
          style={{ 
            left: `${b.left}%`, 
            width: `${b.size}px`, 
            height: `${b.size}px`, 
            animationDuration: `${b.dur}s`, 
            animationDelay: `${b.delay}s`, 
            background: `rgba(255, 255, 255, 0.4)`,
            filter: 'blur(1px)'
          }} 
        />
      ))}

      {/* 3. Contenedor Interactivo */}
      <div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative z-20 w-full flex items-center justify-center p-4"
      >
        <div 
          className="relative w-full max-w-2xl transition-transform duration-300 ease-out" 
          style={{ transform: `translate3d(var(--px, 0px), var(--py, 0px), 0)` }}
        >
          {/* Tarjeta Glassmorphism */}
          <div className="backdrop-blur-md bg-white/40 p-8 md:p-14 rounded-[40px] md:rounded-[60px] border border-white/60 text-center shadow-xl">
            
            <div className="logo-float mb-6">
              <img src={logoScript} alt="Logo" className="mx-auto w-full max-w-[280px] md:max-w-[400px] drop-shadow-xl" />
            </div>

            <div className="space-y-6 animate-reveal">
              <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-cyan-950/5 border border-cyan-950/10">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                <p className="text-cyan-900 font-bold uppercase tracking-[0.3em] text-[10px] md:text-[11px]">Sábado 7 de Febrero</p>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
              </div>

              <h2 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900">
                Fundo <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500">
                  Linda Pau
                </span>
              </h2>

              <p className="text-slate-700 font-medium text-sm md:text-lg max-w-xs md:max-w-md mx-auto leading-relaxed">
                Una celebración mágica nos espera. <br/> Confirma tu asistencia aquí mismo. ✨
              </p>

              {/* BOTÓN REGISTRARTE */}
              <div className="pt-4 relative z-50">
                <button
                  type="button"
                  onClick={scrollToRegister}
                  className="group relative overflow-hidden px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-cyan-600 to-teal-500 rounded-full text-white font-black tracking-[0.2em] text-xs uppercase shadow-lg transition-all duration-300 active:scale-90 touch-manipulation"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative z-10">REGISTRARSE</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Decoraciones de fondo */}
        <img src={ringYellow} className="absolute z-[-1] left-[5%] top-[15%] w-16 md:w-24 opacity-30 animate-pulse" alt="" />
        <img src={ringPink} className="absolute z-[-1] right-[5%] bottom-[15%] w-20 md:w-32 opacity-30 animate-pulse" alt="" />
      </div>

    

      {/* Fade para suavizar el corte inferior */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#f0f9ff] to-transparent z-10 pointer-events-none" />
    </section>
  );
}