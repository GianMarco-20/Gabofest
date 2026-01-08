import { useMemo, useRef } from "react";
import logoScript from "../assets/hero/logo-script.png";
import frame from "../assets/hero/frame.png";
import ringYellow from "../assets/hero/ring-yellow.png";
import ringPink from "../assets/hero/ring-pink.png";

export default function HeroSection() {
  const wrapRef = useRef(null);

  // Función de scroll suave
  const handleAnchorClick = (e) => {
    const target = document.getElementById("registro");
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
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

  const bubbles = useMemo(() => {
    const n = 12; 
    const rand01 = (i) => {
      const x = Math.sin(i * 437.123) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: n }).map((_, i) => {
      const r = rand01(i + 1);
      return { left: r * 100, size: 10 + r * 25, dur: 12 + r * 8, op: 0.1 + r * 0.2 };
    });
  }, []);

  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#f0f9ff] isolate">
      <style>{`
        @keyframes revealUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floating { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes bubbleFall { 0% { transform: translateY(-10vh); opacity: 0; } 50% { opacity: 0.3; } 100% { transform: translateY(110vh); opacity: 0; } }
        .bubble-anim { animation: bubbleFall linear infinite; pointer-events: none; }
      `}</style>

      {/* Fondo y Burbujas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${frame})` }} />
        {bubbles.map((b, i) => (
          <div key={i} className="absolute top-[-5%] bubble-anim" style={{ left: `${b.left}%`, width: `${b.size}px`, height: `${b.size}px`, animationDuration: `${b.dur}s`, background: `rgba(255, 255, 255, 0.5)`, borderRadius: '50%' }} />
        ))}
      </div>

      <div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        className="relative z-20 w-full flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-2xl transition-transform duration-300" style={{ transform: `translate3d(var(--px, 0px), var(--py, 0px), 0)` }}>
          
          {/* Tarjeta Glassmorphism */}
          <div className="backdrop-blur-md bg-white/40 p-10 md:p-16 rounded-[50px] border border-white/60 text-center shadow-2xl">
            
            {/* Logo */}
            <div className="animate-[floating_5s_infinite] mb-8">
              <img src={logoScript} alt="Logo" className="mx-auto w-full max-w-[280px] md:max-w-[420px] drop-shadow-lg" />
            </div>

            <div className="space-y-8 animate-[revealUp_1s_ease-out]">
              <div className="space-y-2">
                <h2 className="text-5xl md:text-8xl font-black text-slate-900 leading-none tracking-tighter">
                  Fundo <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-teal-500">Linda Pau</span>
                </h2>
                <p className="text-cyan-900/70 font-bold uppercase tracking-[0.3em] text-[10px] pt-2">Sábado 7 de Febrero • 2026</p>
              </div>

              <p className="text-slate-700 font-medium text-sm md:text-xl max-w-xs md:max-w-md mx-auto leading-relaxed">
                Tu presencia hará este día inolvidable. <br/> Confirma tu asistencia aquí. ✨
              </p>

              {/* BOTÓN ÚNICO REFORZADO */}
              <div className="pt-4 flex justify-center relative z-[100]">
                <a
                  href="#registro"
                  onClick={handleAnchorClick}
                  className="group relative inline-block overflow-hidden px-14 py-5 bg-gradient-to-r from-cyan-600 to-teal-500 rounded-full text-white font-black tracking-widest text-xs md:text-sm uppercase shadow-[0_15px_35px_rgba(14,165,233,0.3)] transition-all duration-300 active:scale-95 touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    cursor: 'pointer'
                  }}
                >
                  {/* Brillo Shimmer al pasar el mouse */}
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  
                  <span className="relative z-10">REGISTRARME AHORA</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decoraciones laterales */}
      <img src={ringYellow} className="absolute z-[10] left-[5%] top-[20%] w-16 md:w-24 opacity-30 animate-pulse pointer-events-none" alt="" />
      <img src={ringPink} className="absolute z-[10] right-[5%] bottom-[20%] w-20 md:w-32 opacity-30 animate-pulse pointer-events-none" alt="" />

      {/* Fade inferior */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f0f9ff] to-transparent z-10 pointer-events-none" />
    </section>
  );
}