import { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence, 
  useReducedMotion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "motion/react";
import { Trees, Network, Spade, Footprints, Users, Sparkles, MessageCircle } from "lucide-react";

interface Camper {
  name: string;
  camper_type: string;
  created_at: string;
}

// Interactive Animated Mascot Fox Component (Mochi)
function AnimatedFoxMascot({ speechIndex, onPoke }: { speechIndex: number; onPoke: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  const mochiQuotes = [
    "Yip! Welcome to the clearing, builder! 🌲",
    "No noisy feeds here. Just the pure craft ✨",
    "Mochi's tip: stretch & grab warm cocoa ☕",
    "The campsite flame burns brighter together! 🔥",
    "Code at your own peaceful pace 🪵",
  ];

  return (
    <div 
      className="absolute -top-14 -right-2 sm:-right-6 z-30 flex flex-col items-end cursor-pointer group"
      onClick={onPoke}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onPoke(); }}
      aria-label="Click to talk to Mochi the Camp Fox"
      style={{ transform: "translateZ(36px)", transformStyle: "preserve-3d" }}
    >
      {/* Interactive Speech Balloon */}
      <AnimatePresence mode="wait">
        <motion.div
          key={speechIndex}
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="relative mb-2 mr-1 px-3 py-1.5 bg-cocoa-900 border-2 border-black retro-shadow-sm font-mono text-[10px] text-warm-beige whitespace-nowrap select-none flex items-center gap-1.5 rounded"
        >
          <span className="text-amber-orange font-pixel text-[8px]">MOCHI:</span>
          <span>{mochiQuotes[speechIndex % mochiQuotes.length]}</span>
          {/* Speech bubble arrow pointer */}
          <div className="absolute -bottom-1.5 right-6 w-2.5 h-2.5 bg-cocoa-900 border-r-2 border-b-2 border-black rotate-45 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Mascot Avatar Frame with Animated SVG */}
      <motion.div 
        whileHover={shouldReduceMotion ? undefined : { scale: 1.08, rotate: -2 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
        className="relative w-20 h-20 sm:w-24 sm:h-24 bg-logo-brown border-4 border-black retro-shadow p-1 rounded-md flex items-center justify-center overflow-visible group-hover:border-amber-orange transition-colors"
      >
        {/* Soft Hearth Glow */}
        <div className="absolute inset-0 bg-amber-orange/25 rounded-md filter blur-sm group-hover:bg-amber-orange/50 transition-colors" />

        <svg 
          className="w-full h-full crisp-pixel relative z-10 select-none overflow-visible" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Deep Forest Chocolate Background */}
          <rect x="2" y="2" width="28" height="28" fill="#201311" rx="2" />

          {/* Twinkling Ambient Fireflies */}
          {!shouldReduceMotion && (
            <>
              <motion.rect
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                x="6" y="6" width="1" height="1" fill="#fff59d"
              />
              <motion.rect
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2.3, repeat: Infinity, delay: 0.6, ease: "easeInOut" }}
                x="25" y="8" width="1" height="1" fill="#fff59d"
              />
              <motion.rect
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.7, repeat: Infinity, delay: 1.1, ease: "easeInOut" }}
                x="8" y="22" width="1" height="1" fill="#fff59d"
              />
            </>
          )}

          {/* Tiny Campfire Left */}
          <rect x="5" y="23" width="5" height="1" fill="#5c3826" />
          <rect x="6" y="22" width="3" height="1" fill="#754c38" />
          {!shouldReduceMotion ? (
            <motion.g
              animate={{ scaleY: [1, 1.25, 0.9, 1.15, 1] }}
              transition={{ duration: 0.85, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "7px 23px" }}
            >
              <rect x="6" y="19" width="3" height="3" fill="#ea7f43" />
              <rect x="7" y="18" width="1" height="3" fill="#ffb74d" />
              <rect x="7" y="20" width="1" height="1" fill="#ffffff" />
            </motion.g>
          ) : (
            <g>
              <rect x="6" y="19" width="3" height="3" fill="#ea7f43" />
              <rect x="7" y="18" width="1" height="3" fill="#ffb74d" />
              <rect x="7" y="20" width="1" height="1" fill="#ffffff" />
            </g>
          )}

          {/* Animated Fluffy Fox Tail (Right) */}
          <motion.g
            animate={shouldReduceMotion ? undefined : { rotate: [-6, 16, -6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "21px 22px" }}
          >
            <rect x="23" y="17" width="4" height="4" fill="#ea7f43" />
            <rect x="24" y="15" width="3" height="3" fill="#ea7f43" />
            <rect x="25" y="14" width="2" height="2" fill="#ffffff" />
          </motion.g>

          {/* Fox Body & Head with Gentle Breathing Bob */}
          <motion.g
            animate={shouldReduceMotion ? undefined : { y: [0, -1.4, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Animated Ears Twitch */}
            <motion.g
              animate={shouldReduceMotion ? undefined : { rotate: [0, -5, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
              style={{ transformOrigin: "17px 9px" }}
            >
              <rect x="14" y="7" width="2" height="3" fill="#ea7f43" />
              <rect x="19" y="7" width="2" height="3" fill="#ea7f43" />
              <rect x="15" y="8" width="1" height="2" fill="#ffffff" />
              <rect x="19" y="8" width="1" height="2" fill="#ffffff" />
            </motion.g>

            {/* Fox Head & Cheeks */}
            <rect x="13" y="10" width="9" height="3" fill="#ea7f43" />
            <rect x="12" y="12" width="3" height="2" fill="#eadec9" />
            <rect x="20" y="12" width="3" height="2" fill="#eadec9" />
            <rect x="14" y="13" width="7" height="1" fill="#eadec9" />

            {/* Eyes */}
            <rect x="15" y="11" width="1" height="1" fill="#1b1210" />
            <rect x="19" y="11" width="1" height="1" fill="#1b1210" />
            {/* Snout */}
            <rect x="17" y="13" width="1" height="1" fill="#1b1210" />

            {/* Cozy Sweater Body */}
            <rect x="14" y="14" width="7" height="6" fill="#d8923a" />
            <rect x="15" y="14" width="5" height="1" fill="#fffbcf" />
            <rect x="16" y="16" width="3" height="3" fill="#3f2317" />

            {/* Glowing Mini Laptop */}
            <rect x="12" y="17" width="4" height="2" fill="#9e9e9e" />
            <rect x="13" y="19" width="3" height="1" fill="#757575" />
            <motion.rect
              animate={shouldReduceMotion ? undefined : { opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
              x="13" y="17" width="2" height="1" fill="#fff176"
            />
          </motion.g>

          {/* Tiny Green Guild Badge */}
          <rect x="8" y="27" width="16" height="3" fill="#365D39" rx="1" />
          <text 
            x="16" 
            y="29.2" 
            fill="#fcfda1" 
            fontSize="2.4" 
            fontWeight="bold" 
            fontFamily="'Courier New', Courier, monospace"
            textAnchor="middle"
          >
            MOCHI FOX
          </text>
        </svg>

        {/* Tiny Poke hint badge */}
        <span className="absolute -bottom-2 bg-black px-1.5 py-0.5 border border-black font-pixel text-[7px] text-amber-orange group-hover:scale-105 transition-transform select-none">
          POKE ME!
        </span>
      </motion.div>
    </div>
  );
}

export default function Clearing() {
  const [campers, setCampers] = useState<Camper[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [foxSpeechIdx, setFoxSpeechIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // 3D Parallax Tilt for Clearing Diorama Card
  const cardMouseX = useMotionValue(0);
  const cardMouseY = useMotionValue(0);

  const cardRotateX = useSpring(useTransform(cardMouseY, [-0.5, 0.5], [10, -10]), { stiffness: 220, damping: 22 });
  const cardRotateY = useSpring(useTransform(cardMouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 220, damping: 22 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardMouseX.set(x);
    cardMouseY.set(y);
  };

  const handleCardMouseLeave = () => {
    cardMouseX.set(0);
    cardMouseY.set(0);
  };

  useEffect(() => {
    const fetchCampers = async () => {
      try {
        const apiUrl = import.meta.env.DEV 
          ? "http://localhost:8000/backend/api.php" 
          : "/backend/api.php";
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data.status === "success" && data.campers) {
          setCampers(data.campers);
        }
      } catch (e) {
        console.error("Failed to fetch campers", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampers();
  }, []);

  return (
    <section id="about" className="py-24 bg-cocoa-950/80 relative border-t-4 border-black">
      {/* Repeating 8-bit grid background blocks */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e1510]/50 via-transparent to-cocoa-950 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div id="clearing-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content side */}
          <div id="clearing-text-col" className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="font-pixel text-[10px] tracking-wider uppercase text-amber-orange flex items-center gap-2">
                <Trees className="w-4 h-4 text-emerald-400" /> Area 01 • The Deep Clearing
              </span>
              <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-warm-beige">
                Step into the Clearing
              </h2>
            </div>
            
            <p className="text-sage-text text-base md:text-lg leading-relaxed font-mono">
              Stackcamp is a stylized quiet corner of the internet designed for the modern creator. Inspired by the peace and slow pace of cozy retro game clearing fields, we focus purely on what matters: the absolute joy of building.
            </p>

            {/* Benefit Card designed with RPG Stats Board styling */}
            <motion.div
              id="benefit-card-collab"
              whileHover={{ y: -4 }}
              className="p-5 bg-cocoa-900 border-4 border-black retro-shadow flex items-start gap-4 group"
            >
              <div className="p-3 bg-logo-brown border-2 border-black text-amber-orange group-hover:bg-amber-orange group-hover:text-cocoa-950 transition-colors duration-300">
                <Network className="w-5 h-5" />
              </div>
              <div className="space-y-1 font-mono">
                <h3 className="font-bold text-warm-beige text-base flex items-center gap-2">
                  <span className="text-amber-orange">[PASSIVE EFFECT]</span> Safe Cooperation
                </h3>
                <p className="text-sage-text text-sm">
                  Finding your campfire tribe shouldn't be exhausting. Work step-by-step alongside builders who live at a leisurely pace.
                </p>
              </div>
            </motion.div>

            {/* Live Roster: Currently at Camp */}
            <div className="pt-6 border-t-2 border-black/20">
              <h3 className="font-pixel text-[11px] text-amber-orange tracking-widest uppercase mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" /> Currently at Camp
              </h3>
              
              {isLoading ? (
                <div className="font-mono text-sm text-sage-text animate-pulse">Scouting the area...</div>
              ) : campers.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {campers.map((camper, idx) => (
                    <motion.div 
                      key={`${camper.name}-${idx}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2 p-1.5 pr-3 bg-cocoa-950 border-2 border-black rounded-full"
                      title={camper.camper_type}
                    >
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(camper.name)}&background=ea7f43&color=201311&size=32&bold=true`}
                        alt={camper.name}
                        className="w-6 h-6 rounded-full crisp-pixel border border-black"
                      />
                      <span className="font-mono text-xs font-medium text-warm-beige truncate max-w-[100px]">
                        {camper.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="font-mono text-sm text-sage-text italic">The clearing is quiet. Claim your spot first!</div>
              )}
            </div>
          </div>

          {/* Photo stacked card presentation side with 3D Parallax & Animated Mochi Mascot */}
          <div id="clearing-image-col" className="lg:col-span-6 flex justify-center px-2 sm:px-0 pt-8 sm:pt-0">
            <div 
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mr-4 mb-4 md:mr-6 md:mb-6"
              style={{ perspective: 1000 }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
            >
              {/* Animated Mochi Fox Companion Mascot sitting atop the clearing frame */}
              <AnimatedFoxMascot 
                speechIndex={foxSpeechIdx}
                onPoke={() => setFoxSpeechIdx((prev) => prev + 1)}
              />

              {/* Back offset shadow card (Z-15px) */}
              <div 
                id="image-stack-shadow-card" 
                className="absolute inset-0 bg-logo-brown border-4 border-black rounded translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 pointer-events-none" 
                style={{ transform: "translateZ(-15px)" }}
              />
              
              {/* Main content photograph card in pixel style frame with 3D tilt */}
              <motion.div
                id="image-stack-main-card"
                style={{
                  rotateX: shouldReduceMotion ? 0 : cardRotateX,
                  rotateY: shouldReduceMotion ? 0 : cardRotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative bg-cocoa-900 border-4 border-black p-2 sm:p-4 rounded overflow-visible cursor-pointer z-10 transition-colors hover:border-amber-orange"
              >
                <div 
                  className="aspect-square w-full rounded border-2 border-black overflow-hidden relative group"
                  style={{ transform: "translateZ(8px)" }}
                >
                  <img
                    src="/campfire.png"
                    alt="Pixel art campfire in a dark forest clearing"
                    className="w-full h-full object-cover crisp-pixel group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Banner overlay styled as retro UI caption */}
                  <div 
                    className="absolute inset-x-0 bottom-0 bg-black/90 p-2 sm:p-3 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between font-pixel text-[8px] sm:text-[9px] text-[#eadec9] gap-1.5 sm:gap-0 text-center sm:text-left"
                    style={{ transform: "translateZ(18px)" }}
                  >
                    <span className="tracking-widest uppercase">THE OUTPOST CLEANSING LIGHT</span>
                    <span className="text-amber-orange">MAP-01</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
