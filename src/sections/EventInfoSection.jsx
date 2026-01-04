import { useEffect, useMemo, useState } from "react";
import { eventConfig } from "../config/eventConfig";
import { Clock, MapPin, Shirt, Sparkles } from "lucide-react";
import fondoagua from "../assets/event/agua.png"; 

function TimeBox({ label, value, delay }) {
  return (
    <div 
      style={{ animationDelay: `${delay}ms` }}
      className="flex flex-col items-center justify-center rounded-[2.5rem] bg-white/80 backdrop-blur-md border border-white p-5 min-w-[85px] lg:min-w-[120px] shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-cyan-200/50 animate-reveal relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:animate-shimmer" />
      <div className="text-3xl lg:text-5xl font-black text-cyan-600 tracking-tighter tabular-nums relative z-10">
        {value}
      </div>
      <div className="mt-1 text-[9px] lg:text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 relative z-10">
        {label}
      </div>
    </div>
  );
}

export default function EventInfoSection() {
  const [now, setNow] = useState(new Date());
  const targetDate = useMemo(() => new Date(2026, 1, 7, 18, 0, 0), []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const bubbles = useMemo(() => {
    const n = 35; 
    const rand01 = (i) => {
      const x = Math.sin(i * 543.21) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: n }).map((_, i) => {
      const r = rand01(i + 5);
      return {
        left: r * 100,
        size: 10 + r * 30,
        delay: r * 15, // Más delay para que no salgan todas juntas
        dur: 8 + r * 10,  // Velocidad de subida
        op: 0.1 + r * 0.2,
      };
    });
  }, []);

  const diffMs = Math.max(0, targetDate.getTime() - now.getTime());
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return (
    <section className="relative w-full py-24 px-6 overflow-hidden flex items-center justify-center min-h-[700px] bg-cyan-50">
      <style>{`
        @keyframes bubbleRise {
          0% { transform: translateY(100%) scale(0.5); opacity: 0; }
          10% { opacity: var(--op); }
          50% { transform: translateY(-50vh) translateX(20px) scale(1); }
          90% { opacity: var(--op); }
          100% { transform: translateY(-120vh) translateX(-20px) scale(1.2); opacity: 0; }
        }
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-reveal { animation: revealUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards; }
        .animate-shimmer { animation: shimmer 1.5s infinite; }
        .bubble-info {
          position: absolute;
          bottom: -50px; /* Empiezan fuera de la pantalla abajo */
          pointer-events: none;
          z-index: 20;
          border-radius: 50%;
          animation: bubbleRise linear infinite;
        }
      `}</style>

      {/* BURBUJAS FRONTALES (SUBIENDO) */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="bubble-info"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, ${b.op + 0.3}), rgba(255, 255, 255, ${b.op}))`,
            boxShadow: 'inset -2px -2px 5px rgba(255,255,255,0.4)',
            "--op": b.op,
          }}
        />
      ))}

      {/* FONDO */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={fondoagua} 
          className="w-full h-full object-cover " 
          alt="Piscina" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/40 via-transparent to-cyan-900/60" />
      </div>

      <div className="relative mx-auto max-w-5xl z-10 w-full">
        <div className="flex flex-col items-center space-y-16">
          
          <div className="flex flex-col items-center space-y-8 w-full">
            <div className="inline-flex items-center gap-3 bg-white/90 px-8 py-3 rounded-full border border-white shadow-lg animate-reveal hover:scale-105 transition-transform duration-500">
              <Sparkles className="text-yellow-500 animate-bounce" size={20} />
              <h2 className="font-black uppercase tracking-[0.4em] text-cyan-900 text-[10px] lg:text-xs">
                ¡Cuenta regresiva para el splash!
              </h2>
            </div>
            
            <div className="grid grid-cols-4 gap-3 lg:gap-8">
              <TimeBox label="Días" value={String(days)} delay={100} />
              <TimeBox label="Hrs" value={String(hours).padStart(2, "0")} delay={200} />
              <TimeBox label="Min" value={String(minutes).padStart(2, "0")} delay={300} />
              <TimeBox label="Seg" value={String(seconds).padStart(2, "0")} delay={400} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 w-full px-4">
            {[
              { icon: MapPin, text: eventConfig.placeName, color: "text-rose-500", bg: "bg-rose-100" },
              { icon: Clock, text: `${eventConfig.timeText}`, color: "text-amber-600", bg: "bg-amber-100" },
              { icon: Shirt, text: eventConfig.dressCode, color: "text-cyan-600", bg: "bg-cyan-100" }
            ].map((item, index) => (
              <div 
                key={index}
                style={{ animationDelay: `${600 + (index * 150)}ms` }}
                className="animate-reveal group flex items-center gap-5 bg-white/95 px-10 py-5 rounded-[2.5rem] border border-white shadow-2xl transition-all duration-500 hover:shadow-cyan-400/20 hover:-translate-y-2 active:scale-95 cursor-default"
              >
                <div className={`p-3 rounded-2xl ${item.bg} group-hover:rotate-[360deg] transition-transform duration-700`}>
                  <item.icon size={24} className={item.color} />
                </div>
                <span className="text-sm lg:text-lg font-black text-slate-800 tracking-tight">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}