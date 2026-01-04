import { useMemo, useRef } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import { eventConfig } from "../config/eventConfig";
import frame from "../assets/hero/frame.png";
import ringYellow from "../assets/hero/ring-yellow.png";
import ringPink from "../assets/hero/ring-pink.png";
import logoScript from "../assets/hero/logo-script.png";

export default function HeroSection() {
  const wrapRef = useRef(null);

  // ✅ FIX MOBILE: scroll robusto (iOS/Android) + fallback
  const scrollToRegister = (e) => {
    // en móviles ayuda a que no “cancele” el scroll
    e?.preventDefault?.();

    const target = document.getElementById("registro");
    if (!target) return;

    // intento normal
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // fallback (más confiable en móvil)
    requestAnimationFrame(() => {
      const y = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  };

  const onMouseMove = (e) => {
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
    const n = 130;
    const rand01 = (i) => {
      const x = Math.sin(i * 437.123) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: n }).map((_, i) => {
      const r1 = rand01(i + 1);
      const r2 = rand01(i + 2);
      const r3 = rand01(i + 3);
      return {
        left: r1 * 100,
        size: 8 + r2 * 30,
        delay: -(r3 * 25),
        dur: 10 + r2 * 15,
        op: 0.2 + r1 * 0.4,
      };
    });
  }, []);

  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden bg-[#e0f7fa] isolate">
      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(30px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes floating {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -15px, 0); }
        }
        @keyframes textPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes bubbleFallHero {
          0% { transform: translate3d(0, -10vh, 0) scale(0.8); opacity: 0; }
          10% { opacity: var(--op); }
          90% { opacity: var(--op); }
          100% { transform: translate3d(0, 110vh, 0) scale(1.1); opacity: 0; }
        }
        @keyframes cardPop {
          from { opacity: 0; transform: scale(0.5) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-reveal { animation: revealUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-fade-down { animation: fadeInDown 1s ease-out 0.4s backwards; }
        .logo-float { animation: floating 5s ease-in-out infinite; will-change: transform; }
        .fundo-pulse { animation: textPulse 4s ease-in-out infinite; display: inline-block; }
        .smooth-move { transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1); will-change: transform; }

        .bubble-hero-back {
          position: absolute;
          top: -50px;
          z-index: 1;
          pointer-events: none;
          border-radius: 50%;
          animation: bubbleFallHero linear infinite;
          will-change: transform;
        }

        /* ✅ FIX: evita “deterioro” del fondo al scrollear */
        .hero-bg{
          transform: translate3d(0,0,0);
          backface-visibility: hidden;
          will-change: transform;
          image-rendering: auto;
        }
      `}</style>

      {/* 1. FONDO */}
      <div
        className="hero-bg absolute -inset-[1px] z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${frame})`,
          height: "101%",
          width: "100.5%",
        }}
      />

      {/* 2. BURBUJAS */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble-hero-back"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7), rgba(180, 240, 255, 0.2))`,
            boxShadow: "inset -1px -1px 4px rgba(255,255,255,0.3)",
            "--op": b.op,
          }}
        />
      ))}

      <div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="relative z-10 w-full h-full flex items-center justify-center p-6 lg:p-12"
      >
        <div
          className="relative z-10 w-full max-w-3xl smooth-move"
          style={{ transform: `translate3d(var(--px), var(--py), 0)` }}
        >
          <div className="backdrop-blur-xl bg-white/40 p-4 lg:p-8 rounded-[60px] shadow-2xl border border-white/70 text-center">
            <div className="logo-float mb-4">
              <img
                src={logoScript}
                alt="Logo Evento"
                className="mx-auto w-full max-w-[320px] lg:max-w-[420px] drop-shadow-2xl"
              />
            </div>

            <div className="space-y-3">
              <div className="space-y-5">
                <div className="flex justify-center items-center gap-4 animate-fade-down">
                  <span className="h-[1px] w-8 bg-cyan-800/30"></span>
                  <p className="text-cyan-900 font-bold uppercase tracking-[0.4em] text-[10px] lg:text-xs">
                    Sábado 7 de febrero
                  </p>
                  <span className="h-[1px] w-8 bg-cyan-800/30"></span>
                </div>

                <h2
                  className="text-5xl lg:text-7xl font-black tracking-tighter animate-reveal fundo-pulse"
                  style={{ animationDelay: "0.6s" }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600">
                    Fundo Linda Pau
                  </span>
                </h2>
              </div>

              <div className="max-w-md mx-auto">
                <p className="text-slate-700 font-semibold italic text-sm lg:text-lg opacity-80">
                  Confirma tu asistencia para que no falte nada. ✨
                </p>
              </div>

              <div className="pt-4">

                <PrimaryButton
  href="#registro"
  onClick={(e) => {
    e.preventDefault();
    const targetId = "registro";
    const element = document.getElementById(targetId);

    if (element) {
      // 1. Forzamos un pequeño retraso para que el navegador móvil 
      // procese el "toque" antes de intentar mover la pantalla.
      setTimeout(() => {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        
        // 2. Opcional: Actualiza la URL sin recargar para que el "atrás" funcione
        window.history.pushState(null, null, `#${targetId}`);
      }, 100); 
    }
  }}
  className="bg-cyan-600 hover:bg-cyan-500 text-white font-black py-5 px-14 lg:py-6 lg:px-20 rounded-full shadow-xl transition-all hover:scale-110 active:scale-95 tracking-[0.2em] text-[12px] lg:text-sm border-b-4 border-cyan-800 touch-manipulation"
>
  CONFIRMAR ASISTENCIA
</PrimaryButton>

              </div>

              <div className="flex flex-wrap justify-center gap-3 lg:gap-5 mt-10">
                {["Chuleteada 🍖🔥", "Música 🎶🎧", "Pool 🌊🏊‍♂️", "Dj en vivo 🎧🔥🕺"].map(
                  (item, idx) => (
                    <span
                      key={item}
                      style={{
                        animation: `cardPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                          1 + idx * 0.15
                        }s backwards`,
                      }}
                      className="bg-white/70 px-6 py-3 rounded-2xl text-[11px] lg:text-xs font-black text-cyan-950 uppercase tracking-tight border border-white/80 shadow-md hover:shadow-cyan-200/50 hover:-translate-y-3 hover:bg-white transition-all duration-300 cursor-default"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        <img
          src={ringYellow}
          alt=""
          className="absolute z-[2] left-[8%] top-[15%] w-20 lg:w-32 opacity-60 smooth-move"
          style={{
            transform: `translate3d(calc(var(--px) * 2), calc(var(--py) * 2), 0) rotate(15deg)`,
          }}
        />
        <img
          src={ringPink}
          alt=""
          className="absolute z-[2] right-[8%] bottom-[10%] w-24 lg:w-40 opacity-60 smooth-move"
          style={{
            transform: `translate3d(calc(var(--px) * -2), calc(var(--py) * -2), 0) rotate(-15deg)`,
          }}
        />
      </div>
    </section>
  );
}
