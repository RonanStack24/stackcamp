import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface EmberParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

interface ClickSpark {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
}

export default function CampfireCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [embers, setEmbers] = useState<EmberParticle[]>([]);
  const [sparks, setSparks] = useState<ClickSpark[]>([]);

  const lastPos = useRef({ x: 0, y: 0 });
  const emberId = useRef(0);

  useEffect(() => {
    // Only enable custom cursor on fine pointer devices (desktop/mouse)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.body.classList.add("has-custom-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest("button, a, input, textarea, select, [role='button'], .cursor-pointer, [data-interactive]");
        setIsHovered(!!interactive);
      }

      // Spawn subtle trailing embers when mouse moves fast enough
      if (!shouldReduceMotion) {
        const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);
        if (dist > 18) {
          lastPos.current = { x: e.clientX, y: e.clientY };
          const colors = ["#ea7f43", "#ffb74d", "#fff59d", "#ff8a65"];
          const newEmber: EmberParticle = {
            id: ++emberId.current,
            x: e.clientX + (Math.random() * 8 - 4),
            y: e.clientY + (Math.random() * 8 - 4),
            size: Math.random() > 0.6 ? 3 : 2,
            color: colors[Math.floor(Math.random() * colors.length)],
          };
          setEmbers((prev) => [...prev.slice(-8), newEmber]);
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      if (!shouldReduceMotion) {
        // Spawn burst of 5 campfire sparks
        const colors = ["#ea7f43", "#ffb74d", "#fff59d", "#ffffff"];
        const newSparks: ClickSpark[] = Array.from({ length: 5 }).map((_, i) => {
          const angle = (i / 5) * Math.PI * 2 + (Math.random() * 0.5);
          const speed = 18 + Math.random() * 16;
          return {
            id: Date.now() + i,
            x: e.clientX,
            y: e.clientY,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            color: colors[i % colors.length],
          };
        });
        setSparks((prev) => [...prev.slice(-10), ...newSparks]);
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [shouldReduceMotion]);

  // Clean up ember trails after they fade
  useEffect(() => {
    if (embers.length === 0) return;
    const timer = setTimeout(() => {
      setEmbers((prev) => prev.slice(1));
    }, 450);
    return () => clearTimeout(timer);
  }, [embers]);

  // Clean up spark bursts
  useEffect(() => {
    if (sparks.length === 0) return;
    const timer = setTimeout(() => {
      setSparks((prev) => prev.slice(5));
    }, 500);
    return () => clearTimeout(timer);
  }, [sparks]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      {/* Trailing Campfire Embers */}
      {!shouldReduceMotion && embers.map((ember) => (
        <motion.div
          key={ember.id}
          initial={{ opacity: 0.9, scale: 1, y: 0 }}
          animate={{ opacity: 0, scale: 0.2, y: -24, x: (Math.random() - 0.5) * 12 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: ember.x,
            top: ember.y,
            width: ember.size,
            height: ember.size,
            backgroundColor: ember.color,
            boxShadow: `0 0 4px ${ember.color}`,
          }}
        />
      ))}

      {/* Click Spark Bursts */}
      {!shouldReduceMotion && sparks.map((spark) => (
        <motion.div
          key={spark.id}
          initial={{ opacity: 1, scale: 1.4, x: spark.x, y: spark.y }}
          animate={{ 
            opacity: 0, 
            scale: 0.2, 
            x: spark.x + spark.dx, 
            y: spark.y + spark.dy - 10 
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: 3,
            height: 3,
            backgroundColor: spark.color,
            boxShadow: `0 0 6px ${spark.color}`,
          }}
        />
      ))}

      {/* Main Cursor Avatar (Pixel Torch / Campfire Flame) */}
      <motion.div
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          transform: isHovered ? "translate(-50%, -50%)" : "translate(-2px, -2px)",
          transformOrigin: isHovered ? "center center" : "2px 2px",
        }}
        animate={{
          scale: isClicking ? 0.85 : isHovered ? 1.15 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {isHovered ? (
          /* Interactive Mode: Cozy Campfire Target Flame [ • ] */
          <div className="relative w-8 h-8 flex items-center justify-center">
            {/* Retro 8-bit Corner Brackets in Amber Orange */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-amber-orange" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-amber-orange" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-amber-orange" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-amber-orange" />

            {/* Glowing Center Campfire Flame */}
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="crisp-pixel filter drop-shadow-[0_0_6px_rgba(234,127,67,0.8)]">
              {/* Flame Outer Core */}
              <path d="M8 2 C9 5, 12 7, 12 10 C12 12.5, 10.2 14, 8 14 C5.8 14, 4 12.5, 4 10 C4 7, 7 5, 8 2 Z" fill="#ea7f43" />
              {/* Inner Bright Flame */}
              <path d="M8 6 C8.6 8, 10 9, 10 11 C10 12.2, 9.1 13, 8 13 C6.9 13, 6 12.2, 6 11 C6 9, 7.4 8, 8 6 Z" fill="#fff59d" />
              {/* Core White Hot Ember */}
              <rect x="7" y="10" width="2" height="2" fill="#ffffff" />
            </svg>
          </div>
        ) : (
          /* Default Mode: Pixel Campfire Torch with Flickering Flame Tip */
          <div className="relative w-7 h-7 filter drop-shadow-[1px_1px_0px_#000000]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="crisp-pixel">
              {/* Flickering Flame on Torch Tip */}
              {!shouldReduceMotion ? (
                <motion.g
                  animate={{ scale: [1, 1.25, 0.9, 1.15, 1] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformOrigin: "4px 4px" }}
                >
                  <rect x="3" y="1" width="3" height="3" fill="#ea7f43" />
                  <rect x="4" y="0" width="2" height="2" fill="#ffb74d" />
                  <rect x="4" y="2" width="1" height="1" fill="#ffffff" />
                  <rect x="1" y="3" width="2" height="2" fill="#ea7f43" />
                </motion.g>
              ) : (
                <g>
                  <rect x="3" y="1" width="3" height="3" fill="#ea7f43" />
                  <rect x="4" y="0" width="2" height="2" fill="#ffb74d" />
                  <rect x="4" y="2" width="1" height="1" fill="#ffffff" />
                </g>
              )}

              {/* Wooden Torch Head (Iron Band & Kindling) */}
              <rect x="3" y="4" width="4" height="2" fill="#3f2317" />
              <rect x="4" y="4" width="2" height="1" fill="#d8923a" />
              <rect x="3" y="5" width="4" height="1" fill="#201311" />

              {/* Wooden Torch Handle (Diagonal Pixel Shaft) */}
              <rect x="5" y="6" width="3" height="3" fill="#754c38" />
              <rect x="6" y="7" width="2" height="2" fill="#9e6446" />
              <rect x="7" y="9" width="3" height="3" fill="#754c38" />
              <rect x="8" y="10" width="2" height="2" fill="#9e6446" />
              <rect x="9" y="12" width="3" height="3" fill="#754c38" />
              <rect x="10" y="13" width="2" height="2" fill="#5c3826" />
              <rect x="11" y="15" width="3" height="3" fill="#5c3826" />
              <rect x="12" y="16" width="2" height="2" fill="#3f2317" />
              <rect x="13" y="18" width="2" height="2" fill="#201311" />

              {/* Pixel Black Outline for Contrast on Any Background */}
              <rect x="2" y="4" width="1" height="2" fill="#000000" />
              <rect x="7" y="4" width="1" height="2" fill="#000000" />
              <rect x="4" y="6" width="1" height="3" fill="#000000" />
              <rect x="8" y="6" width="1" height="3" fill="#000000" />
              <rect x="6" y="9" width="1" height="3" fill="#000000" />
              <rect x="10" y="9" width="1" height="3" fill="#000000" />
              <rect x="8" y="12" width="1" height="3" fill="#000000" />
              <rect x="12" y="12" width="1" height="3" fill="#000000" />
              <rect x="10" y="15" width="1" height="3" fill="#000000" />
              <rect x="14" y="15" width="1" height="3" fill="#000000" />
              <rect x="12" y="18" width="1" height="3" fill="#000000" />
              <rect x="15" y="18" width="1" height="3" fill="#000000" />
              <rect x="13" y="20" width="2" height="1" fill="#000000" />
            </svg>
          </div>
        )}
      </motion.div>
    </div>
  );
}
