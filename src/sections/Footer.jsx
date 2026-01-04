import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a192f] text-slate-400 py-8 border-t border-cyan-900/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
          
          {/* Lado Izquierdo: Marca */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-xs font-black uppercase tracking-[0.3em]">
              Gabo Fest <span className="text-cyan-500">2026</span>
            </h3>
            <p className="text-[10px] mt-1 font-medium tracking-wide">
              Celebración Privada • Lima, Perú
            </p>
          </div>

          {/* Centro: Mensaje formal */}
          <div className="text-center border-y md:border-y-0 md:border-x border-slate-800 py-4 md:py-0">
            <p className="text-[11px] uppercase tracking-[0.1em] font-semibold text-slate-300">
              "La hospitalidad consiste en hacer que tus invitados se sientan en casa"
            </p>
          </div>

          {/* Lado Derecho: Copyright y créditos */}
          <div className="text-center md:text-right space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-tight">
              © {currentYear} Todos los derechos reservados.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}