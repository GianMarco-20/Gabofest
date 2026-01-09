import { Heart, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-slate-400 py-10 border-t border-white/10 relative overflow-hidden">
      {/* Decoración sutil de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-4">
          
          {/* Lado Izquierdo: Marca del Evento */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h3 className="text-white text-sm font-black uppercase tracking-[0.4em]">
              Gabo Fest <span className="text-cyan-400">2026</span>
            </h3>
            <p className="text-[10px] mt-1 font-bold text-slate-500 uppercase tracking-widest">
              Fundo Linda Pau • Lima, Perú
            </p>
          </div>

          {/* Centro: Mensaje de Invitación */}
          <div className="text-center order-1 md:order-2">
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-slate-200">
                "Nos vemos en el agua"
              </p>
            </div>
          </div>

          {/* Lado Derecho: Créditos y GitHub */}
          <div className="text-center md:text-right space-y-3 order-3">
            <div className="flex flex-col md:items-end items-center gap-2">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                Desarrollado por
              </p>
              <a 
                href="https://github.com/GianMarco-20" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-slate-900 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 px-3 py-1.5 rounded-lg"
              >
                <span className="text-[11px] font-bold text-slate-300 group-hover:text-cyan-400 transition-colors">
                  GianMarco-20
                </span>
                <Github size={14} className="text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
              </a>
            </div>
            
            <p className="text-[9px] font-medium opacity-40 uppercase tracking-tighter">
              © {currentYear} • Todos los derechos reservados
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}