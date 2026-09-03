import { useEffect, useState } from "react";
import { 
  motion, 
  AnimatePresence, 
  useReducedMotion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "motion/react";
import { Flame, Compass, Calendar, ArrowDown, Sparkles } from "lucide-react";
import { PixelFoxLogo } from "./Navbar";

interface HeroProps {
  onExploreClick: () => void;
  onComingSoonClick: () => void;
}

interface Ember {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

export default function Hero({ onExploreClick, onComingSoonClick }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [embers, setEmbers] = useState<Ember[]>([]);
  const DialogText = "Welcome to Stackcamp! 🦊 Leave the social media noise behind and check into a low-stress woodland campsite with other independent builders. Grab some cocoa!";
  const [typedText, setTypedText] = useState(shouldReduceMotion ? DialogText : "");

  // 3D Motion Graphics Parallax & Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 240, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), { stiffness: 240, damping: 20 });

  const handleBadgeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleBadgeMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedText(DialogText);
      return;
    }

    // Generate a set of retro blocky ember particles that drift up
    const newEmbers = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 6 + 4, // 4px to 10px (blocky pixels!)
      delay: Math.random() * 5,
      duration: Math.random() * 7 + 5,
    }));
    setEmbers(newEmbers);

    // Simple retro RPG typewriter animation
    let i = 0;
    const typingInterval = setInterval(() => {
      setTypedText(DialogText.slice(0, i));
      i++;
      if (i > DialogText.length) {
        clearInterval(typingInterval);
      }
    }, 28);

    return () => clearInterval(typingInterval);
  }, [shouldReduceMotion]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 bg-transparent"
    >
      {/* 8-bit Scanline Overlay for retro monitor appearance */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.14] select-none z-10" 
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8) 50%, rgba(255, 255, 255, 0.1) 50%)",
          backgroundSize: "100% 4px",
        }}
      />
      
      {/* Ambient vignetting and blocky edge grid */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1510] via-transparent to-black/40 pointer-events-none z-10" />

      {/* Retro Floating Pixel Embers */}
      <div id="hero-embers" className="absolute inset-x-0 bottom-0 top-1/3 overflow-hidden pointer-events-none z-10">
        {embers.map((ember) => {
          if (shouldReduceMotion) {
            return (
              <div
                id={`ember-${ember.id}`}
                key={ember.id}
                className="absolute bg-amber-orange/40 border border-black"
                style={{
                  left: `${ember.left}%`,
                  bottom: `${15 + (ember.id % 50)}%`,
                  width: `${ember.size}px`,
                  height: `${ember.size}px`,
                }}
              />
            );
          }

          return (
            <motion.div
              id={`ember-${ember.id}`}
              key={ember.id}
              initial={{ y: "100%", x: 0, opacity: 0 }}
              animate={{
                y: "-110%",
                x: [0, Math.sin(ember.id) * 40, Math.sin(ember.id) * -20],
                opacity: [0, 1, 0.8, 0],
              }}
              transition={{
                duration: ember.duration,
                repeat: Infinity,
                delay: ember.delay,
                ease: "linear",
              }}
              className="absolute bg-amber-orange border border-black shadow-[0_0_10px_rgba(234,127,67,0.5)]"
              style={{
                left: `${ember.left}%`,
                width: `${ember.size}px`,
                height: `${ember.size}px`,
              }}
            />
          );
        })}
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center mt-12 md:mt-16">
        
        {/* 3D Motion Graphics Isometric Campsite Diorama */}
        <div
          className="mb-8 inline-block"
          style={{ perspective: 900 }}
          onMouseMove={handleBadgeMouseMove}
          onMouseLeave={handleBadgeMouseLeave}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              rotateX: shouldReduceMotion ? 0 : rotateX,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
            className="relative inline-flex items-center gap-3.5 px-4 py-2 bg-cocoa-900/95 border-2 border-black retro-shadow text-warm-beige select-none group cursor-pointer transition-colors hover:border-amber-orange backdrop-blur-xs"
            onClick={onExploreClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onExploreClick(); }}
            aria-label="Campsite is active. Click to step into the clearing"
          >
            {/* 3D Depth Layer -12px: Ambient Hearth Glow */}
            <div 
              className="absolute inset-0 bg-amber-orange/20 blur-md pointer-events-none group-hover:bg-amber-orange/40 transition-colors"
              style={{ transform: "translateZ(-12px)" }}
            />

            {/* 3D Campfire Vignette (Z-22px) */}
            <div 
              className="relative w-7 h-7 flex items-center justify-center flex-shrink-0"
              style={{ transform: "translateZ(22px)", transformStyle: "preserve-3d" }}
            >
              <svg
                className="w-7 h-7 crisp-pixel relative z-10"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Crossed Wood Logs at Base (Z-8px) */}
                <g style={{ transform: "translateZ(8px)" }}>
                  <rect x="2" y="13" width="12" height="2" fill="#211412" />
                  <rect x="3" y="12" width="10" height="1" fill="#5c3826" />
                  <rect x="4" y="11" width="8" height="1" fill="#754c38" />
                </g>

                {/* Rising Animated 3D Sparks (Z-32px) */}
                {!shouldReduceMotion && (
                  <g style={{ transform: "translateZ(32px)" }}>
                    <motion.rect
                      animate={{ y: [0, -5, -9], opacity: [0, 1, 0], x: [0, -1, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                      x="5" y="6" width="1" height="1" fill="#fca859"
                    />
                    <motion.rect
                      animate={{ y: [0, -6, -10], opacity: [0, 1, 0], x: [0, 1, -1] }}
                      transition={{ duration: 2.1, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
                      x="10" y="5" width="1" height="1" fill="#ffa16c"
                    />
                    <motion.rect
                      animate={{ y: [0, -7, -11], opacity: [0, 1, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 0.8, ease: "easeOut" }}
                      x="8" y="4" width="1" height="1" fill="#fff2dd"
                    />
                  </g>
                )}

                {/* Multi-layered Animated 3D Flickering Flame (Z-24px) */}
                <motion.g
                  style={{ transformOrigin: "bottom center", transform: "translateZ(24px)" }}
                  animate={shouldReduceMotion ? undefined : {
                    scaleY: [1, 1.15, 0.94, 1.1, 1],
                    scaleX: [1, 0.95, 1.05, 0.98, 1],
                  }}
                  transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Outer Flame (Orange) */}
                  <rect x="5" y="8" width="6" height="3" fill="#ea7f43" />
                  <rect x="6" y="6" width="4" height="3" fill="#ea7f43" />
                  <rect x="7" y="4" width="2" height="3" fill="#ea7f43" />

                  {/* Mid Flame (Yellow-Gold) */}
                  <rect x="6" y="8" width="4" height="2" fill="#fca859" />
                  <rect x="7" y="6" width="2" height="3" fill="#fca859" />

                  {/* Core Flame (Warm White) */}
                  <rect x="7" y="7" width="2" height="2" fill="#fff59d" />
                </motion.g>
              </svg>
            </div>

            {/* 3D Foreground Text & Steaming Mug (Z-16px) */}
            <div 
              className="flex items-center gap-2 font-mono"
              style={{ transform: "translateZ(16px)" }}
            >
              <span className="font-pixel text-[9px] text-amber-orange tracking-wider uppercase">
                COZY CAMPSITE
              </span>
              <span className="text-sage-text opacity-40 text-[9px]" aria-hidden="true">•</span>
              <span className="text-xs text-warm-beige tracking-tight font-medium flex items-center gap-1.5">
                The fire is warm, grab some cocoa
                <span className="inline-block transform group-hover:rotate-12 transition-transform duration-300">☕</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Brand Name using VT323 for giant beautiful pixel stamp */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="font-display text-7xl sm:text-9xl md:text-[10rem] font-bold tracking-tight text-amber-orange leading-none select-none pixel-text-shadow mb-4"
        >
          Stackcamp
        </motion.h1>

        {/* Retro Dialog box from our Cute Logo Fox Mascot Speaking */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="pixel-border border-black bg-cocoa-900 retro-shadow p-4 sm:p-5 max-w-2xl mx-auto mb-8 sm:mb-10 text-left relative overflow-hidden flex flex-col sm:flex-row gap-3 sm:gap-4 items-center sm:items-start"
        >
          {/* Avatar frame */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-logo-brown border-2 border-black retro-shadow-sm flex-shrink-0 flex items-center justify-center p-1 sm:p-1.5 rounded relative">
            <PixelFoxLogo />
            {/* Tiny retro name label below avatar */}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-black px-1 text-[8px] text-amber-orange font-pixel tracking-tighter">
              MOCHI
            </span>
          </div>

          {/* dialogue balloon with typed effect */}
          <div className="space-y-2 flex-1 w-full min-w-0 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-1">
              <span className="max-w-full text-[9px] sm:text-[11px] font-pixel text-amber-orange leading-relaxed uppercase break-words">
                System Guide <span aria-hidden="true">•</span> Camper Companion
              </span>
              <span className="text-[10px] text-warm-beige/60 font-mono hidden sm:inline">
                A1-CAMP-BOT
              </span>
            </div>
            
            <p
              aria-live="polite"
              className="text-[13px] sm:text-sm md:text-base leading-relaxed text-warm-beige font-mono whitespace-pre-wrap break-words select-none min-h-[104px] sm:min-h-[82px] md:min-h-[60px]"
            >
              {typedText}
              <span className="inline-block w-2.5 h-4 bg-amber-orange ml-1 animate-pulse" />
            </p>
          </div>
        </motion.div>

        {/* Cozy Slogan details */}
        <motion.p
          id="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-sage-text leading-relaxed max-w-xl mx-auto font-mono mb-10"
        >
          Swap endless sprints and noisy tech debates for a peaceful clearing where developers, engineers, and architects can focus purely on building.
        </motion.p>

        {/* Action Buttons styled like retro RPG buttons */}
        <motion.div
          id="hero-actions"
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6"
        >
          <button
            id="cta-explore"
            onClick={onExploreClick}
            className="group w-full sm:w-auto font-pixel text-[11px] tracking-wider px-6 py-4 bg-cocoa-800 hover:bg-cocoa-700 text-warm-beige font-semibold pixel-border retro-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-3 cursor-pointer focus:outline-none"
          >
            <Compass className="w-4 h-4 text-emerald-400 group-hover:rotate-45 transition-transform duration-300" />
            Inspect clearing
          </button>
          
          <button
            id="cta-soon"
            onClick={onComingSoonClick}
            className="w-full sm:w-auto font-pixel text-[11px] tracking-wider px-6 py-4 bg-amber-orange hover:bg-[#ffa16c] text-cocoa-950 font-bold pixel-border retro-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-3 cursor-pointer focus:outline-none"
          >
            <Flame className="w-4 h-4 text-cocoa-900" />
            Explore sandbox
          </button>
        </motion.div>
      </div>

      {/* Down Indicator */}
      <motion.div
        animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={shouldReduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-sage-text opacity-70 hidden md:flex cursor-pointer z-30"
        onClick={onExploreClick}
      >
        <span className="font-pixel text-[9px] uppercase tracking-wider text-amber-orange">Move Downstairs</span>
        <ArrowDown className="w-4 h-4 text-amber-orange" />
      </motion.div>
    </section>
  );
}
