import { useMemo, useRef } from "react";
import logoScript from "../assets/hero/logo-script.png";
import frame from "../assets/hero/frame.png";
import ringYellow from "../assets/hero/ring-yellow.png";
import ringPink from "../assets/hero/ring-pink.png";

export default function HeroSection() {
  const wrapRef = useRef(null);

  // Función única para el scroll (usada por el botón y la flecha)
  const scrollToRegister = (e) => {
    if (e) e.preventDefault();
    const nextSection = document.getElementById("registro");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
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
    const n = 20; 
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
        @keyframes revealUp { from { opacity: 0; transform: translateY(40px); filter: blur(10px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes floating { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(2deg); } }
        @keyframes bounceDown { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } 60% { transform: translateY(-5px); } }
        @keyframes pulseRing { 0% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 0.8; } 100% { transform: scale(1); opacity: 0.5; } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        
        .animate-reveal { animation: revealUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .logo-float { animation: floating 6s ease-in-out infinite; }
        .scroll-arrow { animation: bounceDown 2s infinite; }
        .ring-pulse { animation: pulseRing 4s ease-in-out infinite; }
      `}</style>

      {/* Fondo Frame */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-80"
        style={{ backgroundImage: `url(${frame})` }}
      />

      {/* Burbujas */}
      {bubbles.map((b, i) => (
        <div 
          key={i} 
          className="absolute top-[-10%] pointer-events-none rounded-full animate-[bubbleFallHero_linear_infinite]" 
          style={{ 
            left: `${b.left}%`, 
            width: `${b.size}px`, 
            height: `${b.size}px`, 
            animationDuration: `${b.dur}s`, 
            animationDelay: `${b.delay}s`, 
            background: `white`,
            opacity: b.op,
            filter: 'blur(1px)'
          }} 
        />
      ))}

      {/* Contenido Principal */}
      <div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative z-10 w-full flex items-center justify-center p-6"
      >
        <div 
          className="relative z-20 w-full max-w-2xl transition-transform duration-500 ease-out" 
          style={{ transform: `translate3d(var(--px, 0px), var(--py, 0px), 0)` }}
        >
          <div className="backdrop-blur-sm bg-white/30 p-8 md:p-14 rounded-[50px] border border-white/40 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            
            <div className="logo-float mb-8">
              <img src={logoScript} alt="Logo" className="mx-auto w-full max-w-[300px] md:max-w-[420px] drop-shadow-2xl" />
            </div>

            <div className="space-y-6 animate-reveal">
              <div className="inline-flex items-center gap-4 px-4 py-1 rounded-full bg-cyan-900/5 border border-cyan-900/10">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <p className="text-cyan-900 font-bold uppercase tracking-[0.4em] text-[11px]">7 de Febrero • 2026</p>
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              </div>

              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-tight">
                Fundo <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500">
                  Linda Pau
                </span>
              </h2>

              <p className="text-slate-600 font-light text-base md:text-lg max-w-md mx-auto leading-relaxed">
                Una celebración mágica nos espera. <br className="hidden md:block"/> Confirma tu asistencia aquí mismo.
              </p>

              {/* NUEVO BOTÓN REGISTRARTE */}
              <div className="pt-4">
                <button
                  onClick={scrollToRegister}
                  className="group relative overflow-hidden px-10 py-4 bg-gradient-to-r from-cyan-600 to-teal-500 rounded-full text-white font-black tracking-widest text-xs uppercase shadow-[0_10px_30px_rgba(14,165,233,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  
                  <span className="relative z-10">REGISTRARSE AHORA</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Elementos Decorativos */}
        <img src={ringYellow} className="absolute z-[-1] left-[10%] top-[20%] w-24 ring-pulse opacity-40 blur-[1px]" alt="" />
        <img src={ringPink} className="absolute z-[-1] right-[8%] bottom-[20%] w-32 ring-pulse opacity-40 blur-[1px]" alt="" />
      </div>

    </section>
  );
}