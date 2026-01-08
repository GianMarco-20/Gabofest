import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./sections/HeroSection";
import EventInfoSection from "./sections/EventInfoSection";
import VenueSection from "./sections/VenueSection";
import RegisterSection from "./sections/RegisterSection";
import Footer from "./sections/Footer";

function JoinOverlay({ tone = "cyan" }) {
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
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 40%, black 60%, transparent 100%)",
          opacity: 0.85,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(10px)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 42%, black 58%, transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 42%, black 58%, transparent 100%)",
          opacity: 0.18,
        }}
      />
    </div>
  );
}

function Block({ children, joinTone }) {
  return (
    <div className="relative">
      {/* ✅ join SIN espacio */}
      {joinTone ? <JoinOverlay tone={joinTone} /> : null}
      {children}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const prevMargin = document.body.style.margin;
    const prevOverflowX = document.body.style.overflowX;
    const prevScroll = document.documentElement.style.scrollBehavior;

    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.body.style.margin = prevMargin;
      document.body.style.overflowX = prevOverflowX;
      document.documentElement.style.scrollBehavior = prevScroll;
    };
  }, []);

  return (
    <Router>
      <main className="relative w-full min-h-screen overflow-x-hidden">
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

        {/* ✅ SIN espacios: solo render uno debajo del otro */}
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
    </Router>
  );
}
