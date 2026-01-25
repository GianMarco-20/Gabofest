import { useMemo } from "react";
import { Sparkles, MessageCircle, ArrowRight, Calendar, MapPin } from "lucide-react";
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
    "¡Hola Gabo! Confirmo mi asistencia en Gabo Fest 2026"
  )}`;

  return (
    <section id="registro" className="relative w-full py-24 md:py-40 px-4 flex items-center justify-center bg-white overflow-hidden">
      
      <style>{`
        @keyframes bubbleFall {
          0% { transform: translate3d(0, -10vh, 0) scale(0.8); opacity: 0; }
          10% { opacity: var(--op); }
          90% { opacity: var(--op); }
          100% { transform: translate3d(0, 110vh, 0) scale(1.1); opacity: 0; }
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
      `}</style>

      {/* Fondo de Imagen con Overlay Dinámico */}
      <div className="absolute inset-0 z-0">
        <img src={fondoAgua} className="w-full h-full object-cover scale-110" alt="Fondo" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40" />
        <div className="absolute inset-0 bg-cyan-900/10 backdrop-blur-[1px]" />
      </div>

      {/* Sistema de Burbujas (Original) */}
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
        {/* Contenedor Principal Mejorado */}
        <div className="relative rounded-[3.5rem] bg-white/70 backdrop-blur-2xl border border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] p-8 md:p-20 text-center overflow-hidden transition-all duration-700">
          
          {/* Adornos visuales internos */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-200/40 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-200/40 rounded-full blur-[80px]" />

          <div className="relative flex flex-col items-center">
            {/* Badge superior más estilizado */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.25em] mb-10 shadow-lg shadow-cyan-900/20">
              <Sparkles size={14} className="text-cyan-400" />
              Soporte Gabo Fest
            </div>

            <h2 className="text-5xl md:text-7xl font-black text-slate-950 tracking-tight leading-[0.9] mb-8">
              Confirmar <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600">
                Asistencia
              </span>
            </h2>

            <p className="text-slate-600 font-medium text-lg md:text-xl leading-relaxed max-w-md mx-auto">
              Estamos a un mensaje de distancia para asegurar que tu experiencia sea perfecta.
            </p>

            {/* Botón WhatsApp - Rediseño tipo "Glassmorphism" oscuro */}
            <div className="mt-12 w-full group">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center justify-between bg-slate-950 p-3 md:p-4 rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.4)] active:scale-95 overflow-hidden"
              >
                {/* Brillo al pasar el mouse */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="flex items-center gap-5 ml-4 md:ml-6">
                  <div className="relative flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-2xl text-white shadow-inner transform group-hover:rotate-6 transition-transform">
                    <MessageCircle size={30} fill="currentColor" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-white/20"></span>
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-extrabold text-xl md:text-2xl leading-none">Chatear con Gabo</p>
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mt-1.5">Respuesta inmediata</p>
                  </div>
                </div>

                <div className="mr-2 md:mr-4 bg-white/10 p-5 rounded-[1.8rem] text-white transition-colors group-hover:bg-emerald-500 group-hover:text-white">
                  <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>

            {/* Footer con info rápida (Fecha/Lugar) */}
            <div className="mt-16 w-full flex items-center justify-center gap-4 md:gap-12 py-6 border-t border-slate-200/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600">
                    <Calendar size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Fecha</p>
                    <p className="text-sm font-bold text-slate-800">07 Feb 2026</p>
                  </div>
                </div>
                
                <div className="w-[1px] h-10 bg-slate-200" />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <MapPin size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Lugar</p>
                    <p className="text-sm font-bold text-slate-800">Lima, Perú</p>
                  </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}