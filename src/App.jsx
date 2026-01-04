import { useEffect, useRef } from "react"; // 1. Importamos useRef
import HeroSection from "./sections/HeroSection";
import EventInfoSection from "./sections/EventInfoSection";
import VenueSection from "./sections/VenueSection";
import RegisterSection from "./sections/RegisterSection";
import Footer from "./sections/Footer";

// ... (Tus funciones JoinOverlay y Block se mantienen igual)

export default function App() {
  // 2. Creamos la referencia para la sección de registro
  const registerRef = useRef(null);

  // 3. Función de scroll ultra-compatible
  const scrollToRegister = (e) => {
    if (e) e.preventDefault();
    if (registerRef.current) {
      registerRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
  };

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-100 via-cyan-100 to-sky-200" />
      
      <Block>
        {/* 4. Pasamos la función al HeroSection */}
        <HeroSection onScrollClick={scrollToRegister} />
      </Block>

      <Block joinTone="white">
        <EventInfoSection />
      </Block>

      <Block joinTone="cyan">
        <VenueSection />
      </Block>

      {/* 5. Asignamos la referencia al bloque de registro */}
      <div ref={registerRef}>
        <Block joinTone="white">
          <RegisterSection />
        </Block>
      </div>

      <Block>
        <Footer />
      </Block>
    </main>
  );
}