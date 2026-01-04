import { useMemo, useRef } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import logoScript from "../assets/hero/logo-script.png";
import frame from "../assets/hero/frame.png";
import ringYellow from "../assets/hero/ring-yellow.png";
import ringPink from "../assets/hero/ring-pink.png";

export default function HeroSection() {
  const wrapRef = useRef(null);

  const handleScroll = (e) => {
    // IMPORTANTE: En móvil, a veces el preventDefault bloquea la ejecución si no es cancelable
    if (e && e.cancelable) e.preventDefault();

    const target = document.getElementById("registro");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      
      // Fallback inmediato para móviles
      const offset = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

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
    const n = 30; // Bajamos cantidad para evitar que las burbujas saturen el táctil
    const rand01 = (i) => {
      const x = Math.sin(i * 437.123) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: n }).map((_, i) => {
      const r1 = rand01(i + 1);
      const r2 = rand01(i + 2);
      return {
        left: r1 * 100,
        size: 8 + r2 * 20,
        delay: -(rand01(i + 3) * 25),
        dur: 15 + r2 * 15,
        op: 0.2 + r1 * 0.3,
      };
    });
  }, []);

  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden bg-[#e0f7fa] isolate">
      <style>{`
        @keyframes revealUp { from { opacity: 0; transform: translateY(30px); filter: blur(8px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes floating { 0%, 100% { transform: translate3d(0, 0, 0); } 50% { transform: translate3d(0, -15px, 0); } }
        @keyframes bubbleFallHero { 0% { transform: translate3d(0, -10vh, 0) scale(0.8); opacity: 0; } 10% { opacity: var(--op); } 90% { opacity: var(--op); } 100% { transform: translate3d(0, 110vh, 0) scale(1.1); opacity: 0; } }
        .animate-reveal { animation: revealUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-fade-down { animation: fadeInDown 1s ease-out 0.4s backwards; }
        .logo-float { animation: floating 5s ease-in-out infinite; will-change: transform; }
        .smooth-move { transition: transform 0.4s ease-out; will-change: transform; }
        /* CRÍTICO: Las burbujas NO deben recibir eventos táctiles */
        .bubble-hero-back { position: absolute; top: -50px; z-index: 1; pointer-events: none !important; border-radius: 50%; animation: bubbleFallHero linear infinite; will-change: transform; }
      `}</style>

      <div
        className="absolute -inset-[1px] z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${frame})`, height: "101%", width: "100%" }}
      />

      {bubbles.map((b, i) => (
        <div key={i} className="bubble-hero-back" style={{ left: `${b.left}%`, width: `${b.size}px`, height: `${b.size}px`, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s`, background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(180, 240, 255, 0.1))`, "--op": b.op }} />
      ))}

      <div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative z-10 w-full h-full flex items-center justify-center p-4 lg:p-12"
      >
        <div 
          className="relative z-20 w-full max-w-3xl smooth-move"
          style={{ transform: `translate3d(var(--px, 0px), var(--py, 0px), 0)` }}
        >
          {/* Añadimos z-30 para asegurar que el contenido esté arriba de todo */}
          <div className="relative z-30 backdrop-blur-md bg-white/40 p-6 lg:p-12 rounded-[40px] lg:rounded-[60px] shadow-2xl border border-white/60 text-center">
            
            <div className="logo-float mb-6">
              <img src={logoScript} alt="Logo" className="mx-auto w-full max-w-[280px] lg:max-w-[420px] drop-shadow-xl" />
            </div>

            <div className="space-y-6">
              <div className="flex justify-center items-center gap-3 animate-fade-down">
                <span className="h-[1px] w-6 bg-cyan-800/30"></span>
                <p className="text-cyan-900 font-bold uppercase tracking-[0.3em] text-[10px]">Sábado 7 de febrero</p>
                <span className="h-[1px] w-6 bg-cyan-800/30"></span>
              </div>

              <h2 className="text-4xl lg:text-7xl font-black tracking-tighter animate-reveal">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600">
                  Fundo Linda Pau
                </span>
              </h2>

              <p className="text-slate-700 font-medium italic text-sm lg:text-lg">
                Confirma tu asistencia para que no falte nada. ✨
              </p>

              <div className="pt-4 relative z-[50]">
                <PrimaryButton
                  // Cambiamos a onClick puro, pero forzamos que sea un elemento clickeable real
                  onClick={handleScroll}
                  className="bg-cyan-600 active:bg-cyan-700 text-white font-black py-5 px-10 rounded-full shadow-xl transition-transform active:scale-95 tracking-widest text-[12px] border-b-4 border-cyan-800 touch-manipulation cursor-pointer relative z-[100]"
                >
                  CONFIRMAR ASISTENCIA
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>

        {/* Imágenes decorativas con pointer-events-none para que no "tapen" el botón */}
        <img src={ringYellow} className="hidden sm:block absolute z-[5] left-[5%] top-[15%] w-20 opacity-50 pointer-events-none" alt="" />
        <img src={ringPink} className="hidden sm:block absolute z-[5] right-[5%] bottom-[10%] w-24 opacity-50 pointer-events-none" alt="" />
      </div>
    </section>
  );
}