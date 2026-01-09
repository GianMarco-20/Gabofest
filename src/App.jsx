import { useEffect, useState } from "react";
import HeroSection from "./sections/HeroSection";
import EventInfoSection from "./sections/EventInfoSection";
import VenueSection from "./sections/VenueSection";
import RegisterSection from "./sections/RegisterSection";
import Footer from "./sections/Footer";

// --- COMPONENTE DE CARGA ATRACTIVO (ESTILO FIESTA EN LA PISCINA) ---
function LoadingScreen() {
  const bubbles = Array.from({ length: 15 }); // Menos burbujas para no saturar

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Fondo de resplandor tipo foco de fiesta */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 15%, rgba(139, 92, 246, 0.4) 0%, transparent 40%),
                      radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.4) 0%, transparent 40%),
                      radial-gradient(circle at 20% 60%, rgba(34, 211, 238, 0.4) 0%, transparent 40%)`,
        }}
      />

      {/* Burbujas del Loading Screen */}
      <div className="absolute inset-0 pointer-events-none">
        {bubbles.map((_, i) => (
          <div
            key={i}
            className="bubble-loader"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center p-4">
        {/* Texto de bienvenida "flotante" */}
        <h2 className="text-white font-black text-2xl md:text-3xl tracking-[0.5em] mb-3 animate-float-text uppercase drop-shadow-lg text-center">
          Prepárate para la fiesta
        </h2>
        
        <p className="text-cyan-400/80 font-bold text-sm md:text-base tracking-[0.4em] uppercase mb-8 animate-bubble-text drop-shadow-md text-center">
          Gabo Fest
        </p>

        {/* Barra de progreso estilo neón */}
        <div className="w-56 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent relative overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-loading-neon" />
        </div>
      </div>

      <style>{`
        @keyframes float-text {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-5px) scale(1.02); opacity: 0.9; }
        }
        @keyframes bubble-text {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-3px); }
            75% { transform: translateY(3px); }
        }
        @keyframes loading-neon {
          0% { transform: translateX(-100%) scaleX(0.2); opacity: 0.3; }
          50% { transform: translateX(0%) scaleX(1); opacity: 1; }
          100% { transform: translateX(100%) scaleX(0.2); opacity: 0.3; }
        }
        @keyframes rise-loader {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.5; }
          80% { opacity: 0.5; }
          100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }
        .bubble-loader {
          position: absolute;
          bottom: -50px;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          pointer-events: none;
          animation: rise-loader linear infinite;
        }
      `}</style>
    </div>
  );
}

// --- OVERLAYS Y BLOQUES (sin cambios) ---
function JoinOverlay({ tone = "cyan" }) {
  // ... tu código de JoinOverlay ...
  const glow =
    tone === "cyan"
      ? "rgba(34,211,238,.22)"
      : tone === "pink"
      ? "rgba(244,114,182,.18)"
      : tone === "white"
      ? "rgba(255,255,255,.55)"
      : "rgba(56,189,248,.18)";

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 h-16 -translate-y-1/2">
      <div
        className="absolute inset-0 blur-3xl"
        style={{
          background: `radial-gradient(70% 60% at 50% 50%, ${glow} 0%, rgba(0,0,0,0) 70%)`,
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)",
          opacity: 0.85,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(10px)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 42%, black 58%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 42%, black 58%, transparent 100%)",
          opacity: 0.18,
        }}
      />
    </div>
  );
}

function Block({ children, joinTone }) {
  return (
    <div className="relative">
      {joinTone ? <JoinOverlay tone={joinTone} /> : null}
      {children}
    </div>
  );
}

// --- COMPONENTE PRINCIPAL (con la lógica de carga) ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.scrollBehavior = "smooth";

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Un poco más de tiempo para apreciar la animación de fiesta

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}

      <main
        className={`relative w-full min-h-screen overflow-x-hidden transition-all duration-1000 ease-out ${
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      >
        {/* Background global */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-100 via-cyan-100 to-sky-200" />
        <div
          className="absolute inset-0 -z-10 opacity-[0.55]"
          style={{
            background:
              "radial-gradient(900px 500px at 20% 10%, rgba(255,255,255,.65), transparent 60%)," +
              "radial-gradient(900px 600px at 80% 30%, rgba(56,189,248,.22), transparent 65%)," +
              "radial-gradient(700px 520px at 50% 90%, rgba(34,211,238,.18), transparent 60%)",
          }}
        />

        {/* Secciones del Evento */}
        <Block>
          <HeroSection />
        </Block>

        <Block joinTone="white">
          <EventInfoSection />
        </Block>

        <Block joinTone="cyan">
          <VenueSection />
        </Block>

        <Block joinTone="white">
          <RegisterSection />
        </Block>

        <Block>
          <Footer />
        </Block>
      </main>
    </>
  );
}