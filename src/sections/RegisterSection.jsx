import { useMemo } from "react";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import fondoAgua from "../assets/register/fondoregister.png";

export default function RegisterSection() {
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

  const whatsappUrl = `https://wa.me/51969871263?text=${encodeURIComponent(
    "¡Hola Gabo! Tengo una duda sobre la Gabo Fest 2026"
  )}`;

  return (
    <section id="registro" className="relative w-full py-20 md:py-32 px-4 flex items-center justify-center bg-white overflow-hidden">
      
      <style>{`
        @keyframes bubbleFall {
          0% { transform: translate3d(0, -10vh, 0) scale(0.8); opacity: 0; }
          10% { opacity: var(--op); }
          90% { opacity: var(--op); }
          100% { transform: translate3d(0, 110vh, 0) scale(1.1); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-soft {
          0%, 100% { box-shadow: 0 0 0 0px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
        }
        .register-bubble {
          position: absolute;
          top: -50px;
          z-index: 1;
          pointer-events: none;
          border-radius: 50%;
          animation: bubbleFall linear infinite;
          will-change: transform;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Fondo de Imagen con Overlay Dinámico */}
      <div className="absolute inset-0 z-0">
        <img src={fondoAgua} className="w-full h-full object-cover scale-105" alt="Fondo" />
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 via-white/20 to-emerald-900/30 backdrop-blur-[2px]" />
      </div>

      {/* Sistema de Burbujas */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="register-bubble"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(180, 240, 255, 0.2))`,
            boxShadow: "inset -2px -2px 6px rgba(255,255,255,0.4), 0 4px 10px rgba(0,0,0,0.05)",
            "--op": b.op,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-2xl z-10 w-full">
        <div className="relative rounded-[3rem] bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-10 md:p-16 text-center overflow-hidden">
          
          {/* Adornos visuales */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl" />
          <Sparkles className="absolute top-8 right-10 text-cyan-400/60 animate-pulse" size={32} />

          <div className="relative flex flex-col items-center">
            <span className="inline-block px-4 py-1 rounded-full bg-cyan-100/50 text-cyan-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Soporte Gabo Fest
            </span>

            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
              ¿TIENES ALGUNA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-emerald-500">
                PREGUNTA?
              </span>
            </h2>

            <p className="mt-6 text-slate-600 font-medium text-lg leading-relaxed">
              No te quedes con la duda. Gabo está listo para ayudarte con lo que necesites.
            </p>

            {/* Tarjeta de Contacto Llamativa */}
            <div className="mt-12 w-full">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center justify-between bg-gradient-to-r from-emerald-500 to-teal-600 p-1 md:p-2 rounded-3xl shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] transition-all duration-500 hover:shadow-[0_30px_60px_-12px_rgba(16,185,129,0.4)] hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 ml-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20" />
                    <div className="relative bg-white p-3 rounded-2xl text-emerald-600 shadow-sm">
                      <MessageCircle size={28} />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-black text-xl leading-none">Hablar con Gabo</p>
                    <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-widest mt-1">WhatsApp Personal</p>
                  </div>
                </div>

                <div className="mr-4 bg-white/20 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                  <ArrowRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>

            {/* Footer del cuadro */}
            <div className="mt-12 pt-8 border-t border-slate-100 w-full flex flex-col items-center gap-4">
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-800 uppercase">Fecha</p>
                  <p className="text-xs text-slate-500 font-bold">07 Feb</p>
                </div>
                <div className="w-px h-8 bg-slate-100" />
                <div className="text-center">
                  <p className="text-[10px] font-black text-slate-800 uppercase">Lugar</p>
                  <p className="text-xs text-slate-500 font-bold">Lima, PE</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}