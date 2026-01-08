export default function PrimaryButton({
  className = "",
  children,
  href,
  type = "button",
  ...props
}) {
  const Comp = href ? "a" : "button";

  return (
    <Comp
      {...props}
      href={href}
      type={href ? undefined : type}
      className={[
        "group relative inline-flex items-center justify-center",
        "rounded-full font-black uppercase tracking-[0.15em]",
        "px-10 py-4 md:px-12 md:py-5 text-sm md:text-base lg:text-lg", // Padding adaptativo y tamaño de texto
        "text-white overflow-visible",
        "transition-all duration-200",
        // ✅ Solo aplica hover en dispositivos con puntero
        "@media(hover:hover):hover:scale-[1.06]",
        "active:scale-[0.94] active:brightness-110",
        "focus:outline-none focus:ring-4 focus:ring-cyan-300/50",
        "touch-manipulation select-none", 
        "cursor-pointer appearance-none", // Consistencia en Safari/Chrome
        className,
      ].join(" ")}
      style={{
        WebkitTapHighlightColor: "transparent",
        WebkitAppearance: "none", // Reset para iOS
        ...props.style,
      }}
      aria-label={children} // Agregar accesibilidad
    >
      <style>{`
        @keyframes shimmerInfinite {
          0% { transform: translateX(-200%) rotate(25deg); }
          100% { transform: translateX(300%) rotate(25deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.70; transform: scale(1.02); }
        }
      `}</style>

      {/* 1. Glow exterior */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-full
          bg-gradient-to-r from-cyan-400 via-sky-500 to-teal-400
          blur-xl opacity-40
          animate-[pulseGlow_4s_infinite]
          will-change-transform"
      />

      {/* 2. Cuerpo del botón */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full
          bg-gradient-to-br from-cyan-500 via-sky-500 to-teal-600
          shadow-[0_8px_20px_rgba(14,165,233,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)]
          border-b-[3px] border-cyan-800/60"
      />

      {/* 3. Shimmer infinito */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span
          className="absolute inset-0 w-[60%] h-[200%] -top-1/2
            bg-gradient-to-r from-transparent via-white/30 to-transparent
            animate-[shimmerInfinite_5s_infinite_linear]
            will-change-transform"
        />
      </span>

      {/* 4. Efecto de brillo al presionar */}
      <span className="absolute inset-0 rounded-full bg-white opacity-0 
        transition-opacity duration-200 active:opacity-10 pointer-events-none" />

      {/* Contenido */}
      <span className="relative z-10 drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)] flex items-center gap-2">
        {children}
      </span>
    </Comp>
  );
}
