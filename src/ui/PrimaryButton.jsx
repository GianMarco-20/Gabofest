import { useEffect } from "react";
import PrimaryButton from "../ui/PrimaryButton";

export default function HeroSection() {
  const handleScroll = (e) => {
    // Prevenir que el comportamiento predeterminado (recarga o desplazamiento) se ejecute en móviles
    if (e && e.cancelable) e.preventDefault();

    const target = document.getElementById("registro");
    if (target) {
      // Intentamos scrollIntoView para los navegadores que lo soportan
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Fallback para móviles que no manejan scrollIntoView correctamente
      const offset = target.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-screen overflow-hidden bg-[#e0f7fa] isolate">
      <div className="absolute z-0 bg-cover bg-center bg-no-repeat pointer-events-none">
        {/* Fondo */}
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 lg:p-12">
        <div className="relative z-20 w-full max-w-3xl">
          <div className="relative z-30 backdrop-blur-md bg-white/40 p-6 lg:p-12 rounded-[40px] lg:rounded-[60px] shadow-2xl border border-white/60 text-center">
            <div className="space-y-6">
              <div className="flex justify-center items-center gap-3">
                <span className="h-[1px] w-6 bg-cyan-800/30"></span>
                <p className="text-cyan-900 font-bold uppercase tracking-[0.3em] text-[10px]">Sábado 7 de febrero</p>
                <span className="h-[1px] w-6 bg-cyan-800/30"></span>
              </div>

              <h2 className="text-4xl lg:text-7xl font-black tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600">
                  Fundo Linda Pau
                </span>
              </h2>

              <p className="text-slate-700 font-medium italic text-sm lg:text-lg">
                Confirma tu asistencia para que no falte nada. ✨
              </p>

              <div className="pt-4">
                {/* Botón que maneja tanto click como touch */}
                <PrimaryButton
                  onClick={handleScroll}
                  onTouchStart={(e) => {
                    e.preventDefault(); // Evitamos el comportamiento predeterminado
                    handleScroll(e); // Ejecutamos la función de desplazamiento
                  }}
                  className="relative z-[100] bg-cyan-600 active:bg-cyan-700 text-white font-black py-5 px-10 rounded-full shadow-xl transition-transform active:scale-95 tracking-widest text-[12px] border-b-4 border-cyan-800 touch-manipulation cursor-pointer pointer-events-auto"
                >
                  CONFIRMAR ASISTENCIA
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
