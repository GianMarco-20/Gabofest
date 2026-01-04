import { useMemo } from "react";
import PrimaryButton from "../ui/PrimaryButton";
import { eventConfig } from "../config/eventConfig";
import { 
  ClipboardCheck, 
  Sparkles, 
  UserPlus, 
  Clock, 
  BedDouble, 
  QrCode, 
  MessageCircle 
} from "lucide-react";
import fondoAgua from "../assets/register/fondoregister.png";

export default function RegisterSection() {
  const formSteps = [
    { icon: <UserPlus size={18} />, text: "Nombre y Apellido" },
    { icon: <Clock size={18} />, text: "Hora de llegada" },
    { icon: <BedDouble size={18} />, text: "¿Te quedas a dormir?" },
    { icon: <QrCode size={18} />, text: "Aporte" },
  ];

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

  const whatsappUrl = `https://wa.me/51969871263?text=${encodeURIComponent("¡Hola Gabo! Tengo una duda sobre la Gabo Fest 2026")}`;

  return (
    <section id="registro" className="relative w-full py-16 md:py-24 px-4 flex items-center justify-center bg-white overflow-hidden">
      
      <style>{`
        @keyframes bubbleFall {
          0% { transform: translate3d(0, -10vh, 0) scale(0.8); opacity: 0; }
          10% { opacity: var(--op); }
          90% { opacity: var(--op); }
          100% { transform: translate3d(0, 110vh, 0) scale(1.1); opacity: 0; }
        }
        @keyframes titlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes stepPop {
          from { opacity: 0; transform: scale(0.8) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .register-bubble {
          position: absolute;
          top: -50px;
          z-index: 1; /* Detrás del contenido z-10 */
          pointer-events: none;
          border-radius: 50%;
          animation: bubbleFall linear infinite;
          will-change: transform;
        }
        .animate-title-pulse {
          animation: titlePulse 4s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <img src={fondoAgua} className="w-full h-full object-cover" alt="Fondo" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 via-white/40 to-cyan-900/20" />
      </div>

      {/* Burbujas (Detrás del cuadro) */}
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
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.7), rgba(180, 240, 255, 0.2))`,
            boxShadow: "inset -1px -1px 4px rgba(255,255,255,0.3)",
            "--op": b.op,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-4xl z-10 w-full">
        {/* Cuadro principal */}
        <div className="relative rounded-[2.5rem] bg-white/90 backdrop-blur-md border border-cyan-100 shadow-2xl p-8 md:p-12 text-center">
          
          <Sparkles className="absolute top-8 right-8 text-cyan-300 opacity-50" size={40} />

          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-4 py-1.5 text-[10px] font-bold text-cyan-600 uppercase tracking-widest border border-cyan-100">
              <ClipboardCheck size={14} />
              Confirmación de Asistencia
            </div>

            {/* Animación en el título */}
            <h2 className="mt-6 text-4xl md:text-5xl font-black text-slate-800 tracking-tight animate-title-pulse">
              ¡ASEGURA TU <span className="text-cyan-500">LUGAR!</span>
            </h2>
            
            <p className="mt-4 max-w-lg text-slate-600 font-medium">
              Antes del chapuzón, regístrate para tener todo listo cuando llegues.
            </p>

            {/* Animación en las tarjetas */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl text-left">
              {formSteps.map((step, index) => (
                <div 
                  key={index} 
                  style={{ 
                    animation: `stepPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.2 + index * 0.1}s backwards` 
                  }}
                  className="flex items-center gap-3 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md hover:border-cyan-200 transition-all group"
                >
                  <div className="bg-cyan-50 p-2 rounded-xl text-cyan-600 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">
                    {step.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 w-full max-w-sm space-y-6">
              <a 
                href={eventConfig.googleFormUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="block transform transition-all hover:scale-105 active:scale-95"
              >
                <PrimaryButton className="w-full py-5 text-lg font-black bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl shadow-xl shadow-cyan-200 border-b-4 border-cyan-700 uppercase tracking-wider">
                  REGISTRARME AHORA
                </PrimaryButton>
              </a>

              <div className="pt-4 border-t border-slate-100">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 transition-colors"
                >
                  <MessageCircle size={18} className="text-emerald-500 group-hover:animate-bounce" />
                  <span className="text-xs font-bold uppercase tracking-widest">¿Tienes dudas? Habla con Gabo</span>
                </a>
              </div>

              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em]">
                07 de Febrero • Lima, Perú
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}