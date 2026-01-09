# 🌊 Gabo Fest 2026 - Event Landing Page

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-FF5D01?style=for-the-badge)](https://lucide.dev/)

Una experiencia web inmersiva diseñada para la invitación y registro de la **Gabo Fest 2026**. El proyecto destaca por una interfaz fluida, animaciones personalizadas de burbujas y un sistema de "Scroll Reveal" para una navegación elegante.

## ✨ Características Principales

* **🎬 Loading Screen Temático:** Pantalla de carga con efectos de burbujas ascendentes y barras de progreso neón que preparan al usuario para la experiencia.
* **🎈 Hero Section Interactivo:** Efecto de movimiento Parallax basado en el ratón (Mouse Move) que reacciona a la posición del usuario.
* **📸 Galería de Lugar (Venue):** Grid dinámico con PhotoCards que muestran los detalles del Fundo Linda Pau con efectos de zoom en hover.
* **📱 Diseño Full Responsive:** Optimización crítica para dispositivos móviles, ajustando tamaños de fuente, espaciado y animaciones.
* **📜 Scroll Reveal:** Implementación de *Intersection Observer* para que las secciones aparezcan suavemente mientras el usuario navega.
* **🫧 Motor de Burbujas Dinámico:** Sistema de partículas CSS/JS que genera burbujas con tamaños, velocidades y opacidades aleatorias para simular una piscina.

## 🛠️ Tecnologías Utilizadas

* **React 18** - Estructura de componentes funcional.
* **Tailwind CSS** - Estilizado rápido y diseño responsive.
* **Lucide React** - Set de iconos modernos y consistentes.
* **Hooks (useState, useEffect, useMemo, useRef)** - Gestión de estados complejos y optimización de rendimiento en animaciones.

## 🚀 Instalación y Uso

1.  Clona el repositorio:
    ```bash
    git clone [https://github.com/GianMarco-20/portafolio-dashboard.git](https://github.com/GianMarco-20/portafolio-dashboard.git)
    ```
2.  Instala las dependencias:
    ```bash
    npm install
    ```
3.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

## 📂 Estructura del Proyecto

```text
src/
├── assets/              # Recursos visuales organizados por sección
│   ├── event/           # Imágenes generales del evento
│   ├── hero/            # Logos, frames y anillos decorativos
│   ├── register/        # Fondos de la sección de registro
│   └── venue/           # Fotos de las instalaciones (piscina, entrada, etc.)
├── config/              
│   └── eventConfig.js   # ⚙️ Configuración central (Fechas, URLs de Maps y Forms)
├── sections/            # Componentes de página (Hero, Venue, Register, Footer)
├── ui/                  # Componentes de interfaz reutilizables (PrimaryButton)
├── App.jsx              # Orquestador principal y lógica de Scroll Reveal
└── App.css              # Estilos globales y definiciones de @keyframes

