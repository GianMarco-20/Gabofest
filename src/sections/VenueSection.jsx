import { useMemo } from "react";
import { eventConfig } from "../config/eventConfig";
import { MapPin, Camera, Image as ImageIcon } from "lucide-react";
import fondoLugar from "../assets/venue/fondovenue.png";
import patio from "../assets/venue/patio.jpeg";
import entrada from "../assets/venue/entrada.jpg";
import piscina2 from "../assets/venue/piscina2.jpg";
import decoracion from "../assets/venue/patio2.jpeg";
import parrilla from "../assets/venue/parrilla.jpeg";
import sala from "../assets/venue/estancia.jpeg";

function PhotoCard({ label, imageSrc, heightClass = "h-40 md:h-48" }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.5rem] bg-white p-2 border border-cyan-100 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-cyan-300 w-full h-full">
      <div className={`relative ${heightClass} w-full overflow-hidden rounded-[1.1rem] bg-slate-100 h-full`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={label}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-cyan-200">
            <Camera size={24} />
            <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
          </div>
        )}
        
        {/* Overlay de diseño: Gradiente y Etiqueta Interna */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1.5 rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105">
            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.2em] drop-shadow-md">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VenueSection() {
  const bubbles = useMemo(() => {
    const n = 100; 
    const rand01 = (i) => {
      const x = Math.sin(i * 437.123) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: n }).map((_, i) => {
      const r1 = rand01(i + 1);
      const r2 = rand01(i + 2);
      return {
        left: r1 * 100,
        size: 15 + r2 * 30,
        delay: -(rand01(i + 3) * 20),
        dur: 10 + r2 * 10,
        op: 0.2 + r1 * 0.3,
      };
    });
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24 px-4 overflow-hidden isolate">
      <style>{`
        @keyframes bubbleFallVenue {
          0% { transform: translateY(-10vh) scale(0.8); opacity: 0; }
          10% { opacity: var(--op); }
          90% { opacity: var(--op); }
          100% { transform: translateY(110vh) scale(1.2); opacity: 0; }
        }
        .venue-bubble {
          position: absolute;
          top: -50px;
          pointer-events: none;
          border-radius: 50%;
          animation: bubbleFallVenue linear infinite;
          will-change: transform;
        }
      `}</style>

      {/* FONDO PRINCIPAL */}
      <div className="absolute inset-0 -z-20">
        <img
          src={fondoLugar}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-cyan-900/20 backdrop-blur-[2px]" />
      </div>

      {/* BURBUJAS ANIMADAS */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="venue-bubble -z-10"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), rgba(160, 230, 255, 0.1))`,
            "--op": b.op,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-6xl z-10 w-full">
        <div className="rounded-[3rem] bg-white/80 backdrop-blur-xl border border-white shadow-2xl p-6 md:p-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-cyan-600 font-bold uppercase text-[11px] tracking-widest bg-cyan-100/50 px-4 py-1 rounded-full">
                <ImageIcon size={14} /> Galería del Evento
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-none">
                Fundo <span className="text-cyan-500 italic">Linda Pau</span>
              </h2>
            </div>

            <a
              href={eventConfig.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-3 shadow-lg shadow-cyan-200 hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Ubicación <MapPin size={18} />
            </a>
          </div>

          {/* GRID MAESTRO - DISEÑO MEJORADO */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Patio Principal - Gran Formato */}
            <div className="md:col-span-8 md:row-span-2">
              <PhotoCard label="Patio" imageSrc={patio} heightClass="h-72 md:h-[500px]" />
            </div>

            {/* Entrada */}
            <div className="md:col-span-4">
              <PhotoCard label="Entrada" imageSrc={entrada} heightClass="h-52 md:h-[238px]" />
            </div>

            {/* Parrilla - Ahora con más altura vertical */}
            <div className="md:col-span-4">
              <PhotoCard label="Parrilla" imageSrc={parrilla} heightClass="h-64 md:h-[238px]" />
            </div>

            {/* Fila Inferior */}
            <div className="md:col-span-4">
              <PhotoCard label="Piscina" imageSrc={piscina2} heightClass="h-52" />
            </div>
            <div className="md:col-span-4">
              <PhotoCard label="Vista" imageSrc={decoracion} heightClass="h-52" />
            </div>
            <div className="md:col-span-4">
              <PhotoCard label="Estancia / Salón" imageSrc={sala} heightClass="h-52" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}