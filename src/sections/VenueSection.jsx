import { useMemo } from "react";
import { eventConfig } from "../config/eventConfig";
import { MapPin, Camera, Image as ImageIcon } from "lucide-react";
import fondoLugar from "../assets/venue/fondovenue.png";
import piscina from "../assets/venue/piscina1.jpg";
import entrada from "../assets/venue/entrada.jpg";
import piscina2 from "../assets/venue/piscina2.jpg";
import decoracion from "../assets/venue/decoracion.png";
import interior from "../assets/venue/interior.jpg";
import sala from "../assets/venue/sala.jpg";

function PhotoCard({ label, imageSrc, heightClass = "h-40 md:h-48" }) {
  return (
    <div className="group relative overflow-hidden rounded-[1.2rem] bg-white/80 p-2 border border-cyan-100 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:border-cyan-300 w-full">
      <div className={`relative ${heightClass} w-full overflow-hidden rounded-[0.8rem] bg-slate-50 p-1.5`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={label}
            className="h-full w-full object-cover rounded-[0.6rem] transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-cyan-200">
            <Camera size={20} />
            <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full border border-cyan-100 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
          <span className="text-[8px] font-black text-cyan-700 uppercase tracking-widest">{label}</span>
        </div>
      </div>
    </div>
  );
}

export default function VenueSection() {
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
        size: 10 + r2 * 35,
        delay: -(r3 * 25),
        dur: 8 + r2 * 12,
        op: 0.3 + r1 * 0.4,
      };
    });
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24 px-4 overflow-hidden isolate bg-[#e0f7fa]">
      <style>{`
        @keyframes bubbleFallVenue {
          0% { transform: translate3d(0, -10vh, 0) scale(0.8); opacity: 0; }
          10% { opacity: var(--op); }
          90% { opacity: var(--op); }
          100% { transform: translate3d(0, 110vh, 0) scale(1.1); opacity: 0; }
        }
        @keyframes textPulseVenue {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .venue-bubble {
          position: absolute;
          top: -50px;
          z-index: 1; /* Detrás del contenido pero delante del fondo */
          pointer-events: none;
          border-radius: 50%;
          animation: bubbleFallVenue linear infinite;
          will-change: transform;
        }
        .fundo-pulse-venue {
          animation: textPulseVenue 4s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      {/* FONDO */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <img
          src={fondoLugar}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
          style={{ transform: "scale(1.02)" }}
          draggable="false"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/10" />
      </div>

      {/* BURBUJAS DETRÁS DEL CUADRO */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="venue-bubble"
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
            background: `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(180, 240, 255, 0.2))`,
            boxShadow: "inset -1px -1px 4px rgba(255,255,255,0.3)",
            "--op": b.op,
          }}
        />
      ))}

      {/* CONTENIDO PRINCIPAL - Cuadro ahora Celeste Azul Clarito */}
      <div className="relative mx-auto max-w-5xl z-10 w-full">
        <div className="rounded-[2.5rem] bg-cyan-50/90 backdrop-blur-2xl border border-white/60 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-5 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="text-center md:text-left space-y-1">
              <div className="inline-flex items-center gap-2 text-cyan-600 mb-1">
                <ImageIcon size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Detalles del evento</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-800 italic leading-tight">
                El Lugar:{" "}
                <span className="text-cyan-500 uppercase fundo-pulse-venue">
                  {eventConfig.placeName}
                </span>
              </h2>
            </div>

            <a
              href={eventConfig.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-4 rounded-full font-black text-xs transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan-200/50 hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Cómo llegar <MapPin size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            <div className="md:col-span-4 md:row-span-2">
              <PhotoCard label="Vista Principal" imageSrc={piscina} heightClass="h-64 md:h-[420px]" />
            </div>
            <div className="md:col-span-2">
              <PhotoCard label="Entrada" imageSrc={entrada} heightClass="h-48 md:h-[202px]" />
            </div>
            <div className="md:col-span-2">
              <PhotoCard label="Piscina" imageSrc={piscina2} heightClass="h-48 md:h-[202px]" />
            </div>

            <div className="md:col-span-2">
              <PhotoCard label="Decoración" imageSrc={decoracion} heightClass="h-40 md:h-36" />
            </div>
            <div className="md:col-span-2">
              <PhotoCard label="Interiores" imageSrc={interior} heightClass="h-40 md:h-36" />
            </div>
            <div className="md:col-span-2">
              <PhotoCard label="Estancia" imageSrc={sala} heightClass="h-40 md:h-36" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}