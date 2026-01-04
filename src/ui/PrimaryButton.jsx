export default function PrimaryButton({
  className = "",
  children,
  href,          // ✅ si pasas href="#registro" funciona como ancla (fallback perfecto)
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
        "px-12 py-5 text-sm md:text-base",
        "text-white overflow-visible",
        "transition-all duration-300",
        "hover:scale-[1.06] active:scale-[0.96]",
        "focus:outline-none focus:ring-4 focus:ring-cyan-300/50",
        "touch-manipulation select-none", // ✅ mejor tap móvil
        className,
      ].join(" ")}
      style={{
        WebkitTapHighlightColor: "transparent", // ✅ quita highlight raro móvil
        ...props.style,
      }}
    >
      <style>{`
        @keyframes shimmerInfinite {
          0% { transform: translateX(-150%) rotate(25deg); }
          100% { transform: translateX(250%) rotate(25deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.45; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.05); }
        }
      `}</style>

      {/* ✅ IMPORTANTE: TODAS LAS CAPAS DECORATIVAS = pointer-events-none */}
      {/* 1. Glow exterior */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-10 rounded-full
          bg-gradient-to-r from-cyan-400 via-sky-500 to-teal-400
          blur-xl opacity-50
          transition-opacity duration-300
          group-hover:opacity-100
          animate-[pulseGlow_3s_infinite]
        "
      />

      {/* 2. Cuerpo */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 rounded-full
          bg-gradient-to-br from-cyan-500 via-sky-500 to-teal-600
          shadow-[0_10px_30px_rgba(14,165,233,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)]
          border-b-4 border-cyan-800/50
          transition-all duration-300
        "
      />

      {/* 3. Shimmer infinito */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      >
        <span
          className="
            absolute top-[-50%] left-[-10%] h-[200%] w-[40%]
            bg-gradient-to-r from-transparent via-white/40 to-transparent
            rotate-[25deg]
            animate-[shimmerInfinite_4s_infinite_ease-in-out]
          "
        />
      </span>

      {/* 4. Shimmer hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      >
        <span
          className="
            absolute -left-[100%] top-0 h-full w-[80%]
            bg-gradient-to-r from-transparent via-white/30 to-transparent
            skew-x-[-25deg]
            transition-all duration-700 ease-out
            group-hover:left-[150%]
          "
        />
      </span>

      {/* 5. Bisel */}
      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 rounded-full
          bg-gradient-to-t from-transparent via-transparent to-white/20
        "
      />

      {/* Texto (único elemento clickeable dentro del botón) */}
      <span className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] flex items-center gap-2">
        {children}
      </span>
    </Comp>
  );
}
