import { useMemo, useRef } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import logoScript from "../assets/hero/logo-script.png";
import frame from "../assets/hero/frame.png";
import ringYellow from "../assets/hero/ring-yellow.png";
import ringPink from "../assets/hero/ring-pink.png";

export default function HeroSection() {
  const wrapRef = useRef(null);

  const handleScroll = (e) => {
    // En móviles, el evento táctil a veces necesita esta validación
    if (e && e.cancelable) e.preventDefault();

    const target = document.getElementById("registro");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Fallback para navegadores móviles antiguos
      const offset = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  // Desactivamos el efecto de movimiento 3D en móviles por completo
  const onMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return; 
    const el = wrapRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.setProperty("--px", (x * 3).toFixed(2) + "px");
    el.style.setProperty("--py", (y * 3).toFixed(2) + "px");
  };

  const onMouseLeave = () => {
    const el = wrapRef.current;
    if (!el) return;
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
  };

  const bubbles = useMemo(() => {
    // Reducimos burbujas en móvil (15) vs desktop (30) para rendimiento
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const n = isMobile ? 15 : 30; 
    
    const rand01 = (i) => {
      const x = Math.sin(i * 437.123) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: n }).map((_, i) => {
      const r1 = rand01(i + 1);
      const r2 = rand01(i + 2);
      return {
        left: r1 * 100,
        size: isMobile ? (5 + r2 * 12) : (8 + r2 * 20), // Burbujas más pequeñas en móvil
        delay: -(rand01(i + 3) * 25),
        dur: 15 + r2 * 15,
        op: 0.15 + r1 * 0.2, // Un poco más sutiles
      };
    });
  }, []);

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden bg-[#e0f7fa] isolate">
      <style>{`
        @keyframes revealUp { from { opacity: 0; transform: translateY(20px); filter: blur(4px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floating { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -10px, 0); } }
        @keyframes bubbleFallHero { 0% { transform: translate3d(0, -10vh, 0) scale(0.8); opacity: 0; } 10% { opacity: var(--op); } 90% { opacity: var(--op); } 100% { transform: translate3d(0, 110vh, 0) scale(1.1); opacity: 0; } }
        
        .animate-reveal { animation: revealUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-fade-down { animation: fadeInDown 0.8s ease-out 0.3s backwards; }
        .logo-float { animation: floating 4s ease-in-out infinite; will-change: transform; }
        .bubble-hero-back { position: absolute; top: -50px; z-index: 1; pointer-events: none; border-radius: 50%; animation: bubbleFallHero linear infinite; will-change: transform; }
      `}</style>

      {/* Frame de fondo: Ajustado para que no se deforme en pantallas altas */}
      <div
        className="absolute -inset-[1px] z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${frame})`, height: "100%", width: "100%" }}
      />

      {bubbles.map((b, i) => (
        <div key={i} className="bubble-hero-back" style={{ left: `${b.left}%`, width: `${b.size}px`, height: `${b.size}px`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s`, background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(180, 240, 255, 0.1))`, "--op": b.op }} />
      ))}

      <div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative z-10 w-full h-full flex items-center justify-center px-6 py-12"
      >
        <div className="relative z-20 w-full max-w-lg">
          {/* Card Principal: Padding reducido en móvil y blur suavizado */}
          <div className="relative z-30 backdrop-blur-md bg-white/50 p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/70 text-center">
            
            <div className="logo-float mb-8">
              <img 
                src={logoScript} 
                alt="Logo" 
                className="mx-auto w-[85%] max-w-[280px] md:max-w-[420px] drop-shadow-lg" 
              />
            </div>

            <div className="space-y-5">
              <div className="flex justify-center items-center gap-3 animate-fade-down">
                <span className="h-[1px] w-4 bg-cyan-800/30"></span>
                <p className="text-cyan-900 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Sábado 7 de febrero</p>
                <span className="h-[1px] w-4 bg-cyan-800/30"></span>
              </div>

              <h2 className="text-4xl md:text-7xl font-black tracking-tight animate-reveal leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-700">
                  Fundo Linda Pau
                </span>
              </h2>

              <p className="text-slate-700 font-medium italic text-sm md:text-lg px-4">
                Confirma tu asistencia para que no falte nada. ✨
              </p>

              <div className="pt-6">
                <PrimaryButton
                  onClick={handleScroll}
                  onTouchEnd={handleScroll}
                  className="w-full sm:w-auto bg-cyan-600 active:bg-cyan-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all active:scale-95 tracking-widest text-xs border-b-4 border-cyan-800 touch-manipulation"
                >
                  CONFIRMAR ASISTENCIA
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>

        {/* Decoraciones: Aparecen sutilmente en móvil en posiciones diferentes */}
        <img src={ringYellow} className="absolute z-[5] left-[10%] top-[10%] w-12 md:w-20 opacity-30 pointer-events-none rotate-12" alt="" />
        <img src={ringPink} className="absolute z-[5] right-[8%] bottom-[15%] w-16 md:w-24 opacity-30 pointer-events-none -rotate-12" alt="" />
      </div>
    </section>
  );
}