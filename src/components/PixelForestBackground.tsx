import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: "firefly" | "sakura";
}

export default function PixelForestBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    // Generate particles with different properties based on theme
    const list = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: theme === "dark" ? (Math.random() * 3 + 2) : (Math.random() * 4 + 3), // Sakura slightly larger
      duration: Math.random() * 12 + 12, 
      delay: Math.random() * 6,
      type: theme as "firefly" | "sakura",
    }));
    setParticles(list);
  }, [theme]);

  // Theme-specific colors
  const skyGradient = theme === "dark" 
    ? "from-[#020503] via-[#040c07] to-[#010302]"
    : "from-[#fff0f5] via-[#ffe4e1] to-[#ffd1dc]";
    
  const layer1Fill = theme === "dark" ? "#030805" : "#ffb7c5";
  const layer2Fill = theme === "dark" ? "#050e09" : "#ff9eaf";
  const layer3Fill = theme === "dark" ? "#08140c" : "#ff8da1";

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none transition-colors duration-1000">
      {/* Base sky color gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${skyGradient} transition-colors duration-1000`} />

      {/* Retro Pixel Forest Grid Background overlay layered at the viewport bottom */}
      <div className="absolute bottom-0 inset-x-0 h-96 opacity-45 mix-blend-screen select-none pointer-events-none transition-opacity duration-1000">
        <svg
          className="w-full h-full transition-all duration-1000"
          preserveAspectRatio="none"
          viewBox="0 0 1000 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1: Distant mountains / tree silhouettes */}
          <path
            d="M0,300 L0,220 L40,180 L80,220 L120,180 L160,220 L200,160 L240,220 L280,180 L320,220 L360,170 L400,220 L440,190 L480,220 L520,180 L560,220 L600,160 L640,220 L680,180 L720,220 L760,170 L800,220 L840,190 L880,220 L920,180 L960,220 L1000,195 L1000,300 Z"
            fill={layer1Fill}
            style={{ imageRendering: "pixelated", transition: "fill 1s ease-in-out" }}
          />

          {/* Layer 2: Intermediate silhouettes */}
          <path
            d="M0,300 L0,240 L30,210 L60,245 L90,205 L120,245 L150,200 L180,245 L210,210 L240,245 L270,195 L300,245 L330,210 L360,245 L390,205 L420,245 L450,200 L480,245 L510,210 L540,245 L570,195 L600,245 L630,210 L660,245 L690,205 L720,245 L750,200 L780,245 L810,210 L840,245 L870,195 L900,245 L930,210 L960,245 L1000,225 L1000,300 Z"
            fill={layer2Fill}
            style={{ imageRendering: "pixelated", transition: "fill 1s ease-in-out" }}
          />

          {/* Layer 3: Foreground Trees with stylized blocky geometric pixel branches */}
          <g fill={layer3Fill} style={{ transition: "fill 1s ease-in-out" }}>
            {/* Leftmost big tree */}
            <rect x="45" y="210" width="10" height="90" />
            <polygon points="50,140 20,230 80,230" />
            <polygon points="50,110 25,190 75,190" />
            <polygon points="50,80 30,150 70,150" />

            {/* Tree 2 */}
            <rect x="175" y="230" width="8" height="70" />
            <polygon points="179,160 155,245 203,245" />
            <polygon points="179,130 160,205 198,205" />
            <polygon points="179,105 165,170 193,170" />

            {/* Tree 3 */}
            <rect x="345" y="200" width="12" height="100" />
            <polygon points="351,120 315,220 387,220" />
            <polygon points="351,90 320,180 382,180" />
            <polygon points="351,60 325,140 377,140" />

            {/* Tree 4 */}
            <rect x="545" y="220" width="10" height="80" />
            <polygon points="550,150 525,240 575,240" />
            <polygon points="550,120 530,200 570,200" />
            <polygon points="550,90 535,160 565,160" />

            {/* Tree 5 */}
            <rect x="715" y="225" width="10" height="75" />
            <polygon points="720,155 695,245 745,245" />
            <polygon points="720,125 700,205 740,205" />
            <polygon points="720,95 705,165 735,165" />

            {/* Tree 6 */}
            <rect x="875" y="210" width="12" height="90" />
            <polygon points="881,130 845,230 917,230" />
            <polygon points="881,100 850,190 912,190" />
            <polygon points="881,70 855,150 907,150" />
          </g>
        </svg>
      </div>

      {/* Particles Layer (Fireflies or Sakura Petals) */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={`${theme}-${p.id}`} // Force re-render of particles on theme change
            initial={{
              x: `${p.x}vw`,
              y: p.type === "sakura" ? "-10vh" : `${p.y}vh`, // Sakura starts at top, fireflies random
              opacity: 0,
              scale: 0.5,
              rotate: p.type === "sakura" ? 0 : undefined,
            }}
            animate={
              p.type === "firefly" 
                ? {
                    x: [
                      `${p.x}vw`,
                      `${p.x + Math.sin(p.id) * 6}vw`,
                      `${p.x - Math.cos(p.id) * 6}vw`,
                      `${p.x}vw`,
                    ],
                    y: [
                      `${p.y}vh`,
                      `${p.y - 10}vh`,
                      `${p.y - 5}vh`,
                      `${p.y}vh`,
                    ],
                    opacity: [0, 0.3, 0.85, 0.3, 0],
                    scale: [0.5, 1, 1.15, 0.75, 0.5],
                  }
                : {
                    // Sakura drift down slowly
                    x: [
                      `${p.x}vw`,
                      `${p.x + Math.sin(p.id) * 10}vw`,
                      `${p.x - Math.cos(p.id) * 10}vw`,
                    ],
                    y: ["-10vh", "50vh", "110vh"], // Fall past the bottom
                    opacity: [0, 0.8, 1, 0.8, 0],
                    scale: [0.8, 1.2, 1, 0.8, 0.5],
                    rotate: [0, 180, 360], // Sakura petal spin
                  }
            }
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: p.type === "firefly" ? "easeInOut" : "linear",
            }}
            className={`absolute rounded-none border border-black ${
              p.type === "firefly" ? "bg-[#adff2f]" : "bg-[#ffb7c5]"
            }`}
            style={{
              width: `${p.size}px`,
              height: p.type === "sakura" ? `${p.size * 1.5}px` : `${p.size}px`, // Petals are slightly rectangular
              boxShadow: p.type === "firefly" 
                ? "0 0 10px 2px rgba(173, 255, 47, 0.75)" 
                : "0 0 8px 2px rgba(255, 183, 197, 0.4)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
