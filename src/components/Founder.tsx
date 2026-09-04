import { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useReducedMotion 
} from "motion/react";
import { Award, Code, Hammer, MessageSquare, Terminal, Coffee, Sparkles, Map, Figma, Palette, Layers, Flame } from "lucide-react";

// Interactive Animated Mascot Fox Companion (Mochi) on Ronan's Card
function FounderMochiCompanion({ speechIndex, onPoke }: { speechIndex: number; onPoke: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  const mochiFounderQuotes = [
    "Yip! That's Ronan! 🦊✨",
    "Frontend Motion & 3D Crafter! 💻",
    "Hover Ronan's name for 3D bounce! 🎨",
    "Stackcamp Guild Leader! 🌲",
    "Poked! Mochi sends warm cocoa ☕",
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ duration: 0.3 }}
      className="absolute top-3 right-4 sm:top-5 sm:right-6 z-40 flex flex-col items-end cursor-pointer select-none group"
      onClick={onPoke}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onPoke(); }}
      aria-label="Click to interact with Mochi on Ronan's card"
      style={{ transform: "translateZ(55px)", transformStyle: "preserve-3d" }}
    >
      {/* Speech Balloon */}
      <AnimatePresence mode="wait">
        <motion.div
          key={speechIndex}
          initial={{ opacity: 0, y: 6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="relative mb-1.5 mr-1 px-3 py-1 bg-cocoa-950 border-2 border-black retro-shadow-sm font-mono text-[10px] text-warm-beige whitespace-nowrap flex items-center gap-1.5 rounded"
        >
          <span className="text-amber-orange font-pixel text-[8px] flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-orange animate-spin" /> MOCHI:
          </span>
          <span className="font-bold">{mochiFounderQuotes[speechIndex % mochiFounderQuotes.length]}</span>
          {/* Balloon pointer downward */}
          <div className="absolute -bottom-1 right-5 w-2 h-2 bg-cocoa-950 border-r-2 border-b-2 border-black rotate-45 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Mochi Frame */}
      <motion.div
        whileHover={shouldReduceMotion ? undefined : { scale: 1.12, rotate: -3 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.92, rotate: 6 }}
        className="relative w-14 h-14 sm:w-16 sm:h-16 bg-logo-brown border-3 border-black retro-shadow p-1 rounded-md flex items-center justify-center overflow-visible group-hover:border-amber-orange transition-colors"
      >
        {/* Hearth Glow */}
        <div className="absolute inset-0 bg-amber-orange/30 rounded-md filter blur-[2px] group-hover:bg-amber-orange/60 transition-colors" />

        <svg 
          className="w-full h-full crisp-pixel relative z-10 select-none overflow-visible" 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="2" y="2" width="28" height="28" fill="#201311" rx="2" />
          
          {/* Twinkling Fireflies */}
          {!shouldReduceMotion && (
            <>
              <motion.rect
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                x="6" y="6" width="1" height="1" fill="#fff59d"
              />
              <motion.rect
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 2.1, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                x="25" y="8" width="1" height="1" fill="#fff59d"
              />
            </>
          )}

          {/* Tiny Campfire Left */}
          <rect x="5" y="23" width="5" height="1" fill="#5c3826" />
          <rect x="6" y="22" width="3" height="1" fill="#754c38" />
          {!shouldReduceMotion ? (
            <motion.g
              animate={{ scaleY: [1, 1.3, 0.9, 1.2, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
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

          {/* Animated Fox Tail */}
          <motion.g
            animate={shouldReduceMotion ? undefined : { rotate: [-8, 18, -8] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "21px 22px" }}
          >
            <rect x="23" y="17" width="4" height="4" fill="#ea7f43" />
            <rect x="24" y="15" width="3" height="3" fill="#ea7f43" />
            <rect x="25" y="14" width="2" height="2" fill="#ffffff" />
          </motion.g>

          {/* Fox Body & Head */}
          <motion.g
            animate={shouldReduceMotion ? undefined : { y: [0, -1.2, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Ears Twitch */}
            <motion.g
              animate={shouldReduceMotion ? undefined : { rotate: [0, -6, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
              style={{ transformOrigin: "17px 9px" }}
            >
              <rect x="14" y="7" width="2" height="3" fill="#ea7f43" />
              <rect x="19" y="7" width="2" height="3" fill="#ea7f43" />
              <rect x="15" y="8" width="1" height="2" fill="#ffffff" />
              <rect x="19" y="8" width="1" height="2" fill="#ffffff" />
            </motion.g>

            <rect x="13" y="10" width="9" height="3" fill="#ea7f43" />
            <rect x="12" y="12" width="3" height="2" fill="#eadec9" />
            <rect x="20" y="12" width="3" height="2" fill="#eadec9" />
            <rect x="14" y="13" width="7" height="1" fill="#eadec9" />

            <rect x="15" y="11" width="1" height="1" fill="#1b1210" />
            <rect x="19" y="11" width="1" height="1" fill="#1b1210" />
            <rect x="17" y="13" width="1" height="1" fill="#1b1210" />

            {/* Cozy Sweater */}
            <rect x="14" y="14" width="7" height="6" fill="#d8923a" />
            <rect x="15" y="14" width="5" height="1" fill="#fffbcf" />
            <rect x="16" y="16" width="3" height="3" fill="#3f2317" />

            {/* Tiny glowing laptop */}
            <rect x="12" y="17" width="4" height="2" fill="#9e9e9e" />
            <rect x="13" y="19" width="3" height="1" fill="#757575" />
            <motion.rect
              animate={shouldReduceMotion ? undefined : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              x="13" y="17" width="2" height="1" fill="#fff176"
            />
          </motion.g>

          {/* Tiny Guild Badge */}
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
            RONAN★
          </text>
        </svg>
      </motion.div>
    </motion.div>
  );
}

// 3D Kinetic Typography Component for Founder Name
function KineticFounderName({ name, isRonan }: { name: string; isRonan: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  if (!isRonan) {
    return (
      <h3 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-warm-beige">
        {name}
      </h3>
    );
  }

  const words = name.split(" ");

  return (
    <h3 
      aria-label={name}
      className="font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-warm-beige flex flex-wrap items-center gap-x-4 gap-y-1 select-none py-1"
      style={{ transform: "translateZ(35px)", transformStyle: "preserve-3d" }}
    >
      {words.map((word, wordIdx) => (
        <span key={`word-${wordIdx}`} className="inline-flex">
          {word.split("").map((char, charIdx) => {
            const index = wordIdx * 10 + charIdx;
            return (
              <motion.span
                key={`char-${charIdx}`}
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : {
                  y: [0, -3, 0],
                  rotate: [0, (index % 2 === 0 ? 1.5 : -1.5), 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: index * 0.08,
                  ease: "easeInOut",
                }}
                whileHover={shouldReduceMotion ? undefined : {
                  y: -12,
                  scale: 1.3,
                  rotate: (index % 2 === 0 ? 7 : -7),
                  color: "#ffb74d",
                  transition: { type: "spring", stiffness: 450, damping: 12 },
                }}
                className="inline-block cursor-pointer transition-colors pixel-text-shadow hover:text-amber-orange"
                style={{ transformStyle: "preserve-3d" }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
      <motion.span
        animate={shouldReduceMotion ? undefined : { 
          scale: [1, 1.25, 1], 
          rotate: [0, 15, -15, 0],
          color: ["#ea7f43", "#ffb74d", "#ea7f43"]
        }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block text-amber-orange text-2xl sm:text-3xl ml-1 select-none"
        title="Guild Leader Star"
      >
        ✦
      </motion.span>
    </h3>
  );
}

export default function Founder() {
  const foundersData = [
    {
      id: "ronan",
      name: "Ronan Antoque",
      role: "Founder / Guild Leader",
      image: "/ronan.jpg",
      objectPosition: "50% 15%",
      quote: "Stackcamp is our quiet corner of the internet—a place where builders can gather, share ideas, and create meaningful things together at their own pace.",
      bio: "I am an aspiring software engineer specialized in frontend motion, Figma, and Framer.",
      skills: [
        { name: "Frontend Motion", icon: <Sparkles className="w-4 h-4" /> },
        { name: "Figma UI/UX", icon: <Figma className="w-4 h-4" /> },
        { name: "Framer & Motion", icon: <Layers className="w-4 h-4" /> },
        { name: "React & TypeScript", icon: <Code className="w-4 h-4" /> },
        { name: "Design Systems", icon: <Palette className="w-4 h-4" /> },
        { name: "Creative Prototyping", icon: <Terminal className="w-4 h-4" /> },
      ],
      badge: "GUILD LEADER"
    },
    {
      id: "jumbo",
      name: "Cris Jumbo Caras",
      role: "Co-Founder / Architect",
      image: "/jumbo.jpg",
      objectPosition: "top center",
      quote: "Every great camp needs a solid foundation. I design the real-world spaces where our community can gather.",
      bio: "A real-world architect focused on spatial design, blueprints, and bringing physical structures to life.",
      skills: [
        { name: "Building Architecture", icon: <Hammer className="w-4 h-4" /> },
        { name: "Spatial Design", icon: <Map className="w-4 h-4" /> },
      ],
      badge: "ARCHITECT"
    },
    {
      id: "aldrin",
      name: "Aldrin Miller Basalo",
      role: "Co-Founder / Software Devs Backend Expert",
      image: "/aldrin.jpg",
      objectPosition: "center center",
      quote: "A beautiful campsite relies on the unseen machinery beneath. I write the backend logic and databases that keep Stackcamp running seamlessly.",
      bio: "Obsessed with creating robust databases, secure API endpoints, and making sure the camp's backend runs smoothly.",
      skills: [
        { name: "Server Architecture", icon: <Sparkles className="w-4 h-4" /> },
        { name: "Database Wizardry", icon: <Coffee className="w-4 h-4" /> },
      ],
      badge: "DEV"
    },
    {
      id: "cofounder3",
      name: "Veejay Sumabong",
      role: "Co-Founder / Electronics Engineer",
      image: "/veejay.jpg",
      objectPosition: "center center",
      quote: "I designed Stackcamp and wired the grid. They asked who made it possible God did.",
      bio: "Bridging the gap between the digital world and the physical world, bringing low-level engineering to our campsite.",
      skills: [
        { name: "Circuit Design", icon: <Terminal className="w-4 h-4" /> },
        { name: "Embedded Systems", icon: <Map className="w-4 h-4" /> },
      ],
      badge: "ENGINEER"
    }
  ];

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [mochiQuoteIdx, setMochiQuoteIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // 3D Parallax Tilt for Founder Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 220, damping: 22 });

  // Dynamic 3D Holographic Glare for Ronan's card
  const holographicBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(circle at ${((x as number) + 0.5) * 100}% ${((y as number) + 0.5) * 100}%, rgba(234, 127, 67, 0.22) 0%, rgba(255, 245, 157, 0.08) 35%, transparent 65%)`
  );

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleCardMouseEnter = () => {
    setIsCardHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsCardHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    if (isCardHovered || shouldReduceMotion) return;
    const timer = setTimeout(() => {
      setSelectedIdx((prev) => (prev + 1) % foundersData.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [selectedIdx, foundersData.length, isCardHovered, shouldReduceMotion]);

  const activeFounder = foundersData[selectedIdx];

  return (
    <section id="founder" className="py-24 bg-cocoa-950/80 relative overflow-hidden border-t-4 border-black z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa-900/40 via-transparent to-cocoa-950 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* CHARACTER SELECT ROW */}
        <div className="mb-14 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-warm-beige select-none">
              Choose Character
            </h2>
            <p className="text-sage-text font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-4">
              Stackcamp was founded by a group of friends from IT, Computer Science, Electronics Engineer, and Architecture in the Philippines.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {foundersData.map((founder, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <button
                  key={founder.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`group relative p-1.5 border-4 transition-all duration-300 focus:outline-none cursor-pointer ${
                    isSelected 
                      ? "border-amber-orange bg-amber-orange/20 scale-110 z-20 shadow-[0_0_15px_rgba(234,127,67,0.5)]" 
                      : "border-black bg-cocoa-900 hover:border-amber-orange/50 grayscale hover:grayscale-0"
                  }`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-black overflow-hidden relative border-2 border-black">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: founder.objectPosition || "center" }}
                    />
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-2 h-2 bg-amber-orange animate-pulse border-b border-l border-black" />
                    )}
                  </div>
                  <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 font-pixel text-[8px] whitespace-nowrap bg-black px-1.5 py-0.5 border border-black transition-opacity ${
                    isSelected ? "text-amber-orange opacity-100" : "text-sage-text opacity-0 group-hover:opacity-100"
                  }`}>
                    {founder.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE CHARACTER CARD (3D Isometric Parallax Holographic Card) */}
        <div style={{ perspective: 1200 }}>
          <motion.div
            id="founder-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            style={{
              rotateX: shouldReduceMotion ? 0 : rotateX,
              rotateY: shouldReduceMotion ? 0 : rotateY,
              transformStyle: "preserve-3d",
            }}
            onMouseMove={handleCardMouseMove}
            onMouseEnter={handleCardMouseEnter}
            onMouseLeave={handleCardMouseLeave}
            className="relative bg-cocoa-900 border-4 border-black p-8 md:p-12 rounded shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden transition-colors hover:border-amber-orange/80 cursor-default"
          >
            {/* Subtle amber lighting behind the profile card */}
            <div 
              className="absolute top-0 right-0 w-80 h-80 bg-amber-orange/5 rounded-full filter blur-3xl pointer-events-none -translate-y-10 translate-x-10" 
              style={{ transform: "translateZ(-15px)" }}
            />

            {/* Dynamic 3D Holographic Glare for Ronan's card */}
            {activeFounder.id === "ronan" && !shouldReduceMotion && (
              <motion.div
                className="absolute inset-0 pointer-events-none z-10 mix-blend-screen"
                style={{ background: holographicBackground }}
              />
            )}

            {/* Top corner pixel notches */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-black" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-black" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 bg-black" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-black" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFounder.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                
                {/* Left Column: RPG Character Portrait Frame (3D Z-Layer 30px) */}
                <div id="founder-portrait-col" className="md:col-span-4 flex justify-center relative" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                  {/* Mochi Fox Mascot Companion perched on Ronan's card */}
                  {activeFounder.id === "ronan" && (
                    <FounderMochiCompanion 
                      speechIndex={mochiQuoteIdx} 
                      onPoke={() => setMochiQuoteIdx((prev) => prev + 1)} 
                    />
                  )}
                  <div className="relative group w-48 h-48 md:w-full md:aspect-square">
                    {/* Visual Glow framing the picture */}
                    <div className="absolute inset-0 bg-amber-orange border-4 border-dashed border-black opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
                    
                    <div className="relative w-full h-full border-4 border-black bg-black rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                      <img
                        src={activeFounder.image}
                        alt={activeFounder.name}
                        className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05] grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                        style={{ objectPosition: activeFounder.objectPosition || "center" }}
                      />
                      {/* Small gold token banner in picture corner */}
                      <div 
                        className="absolute top-2 left-2 bg-yellow-500 border border-black p-1 text-[8px] font-pixel text-black leading-none"
                        style={{ transform: "translateZ(42px)" }}
                      >
                        {activeFounder.badge}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Character Attributes & Bio Description (3D Z-Layer 20px) */}
                <div id="founder-bio-col" className="md:col-span-8 space-y-6" style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-pixel text-[10px] tracking-widest uppercase text-amber-orange flex items-center gap-1.5 bg-cocoa-950 px-2.5 py-1 border border-amber-orange/40 rounded shadow-sm">
                        <Award className="w-4 h-4 text-amber-orange animate-pulse" /> {activeFounder.role}
                      </span>
                      {activeFounder.id === "ronan" && (
                        <motion.span 
                          animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                          className="font-pixel text-[8px] bg-amber-orange text-cocoa-950 px-2 py-0.5 border border-black font-bold uppercase flex items-center gap-1 shadow-sm"
                        >
                          <Sparkles className="w-2.5 h-2.5" /> MOCHI COMPANION
                        </motion.span>
                      )}
                    </div>
                    <KineticFounderName name={activeFounder.name} isRonan={activeFounder.id === "ronan"} />
                  </div>

                  <div className="space-y-4 font-mono text-sm md:text-base">
                    <p className="text-sage-text leading-relaxed">
                      {activeFounder.bio}
                    </p>

                    {/* RPG Dialogue Style Quote Container */}
                    <blockquote 
                      className="relative p-4 border-4 border-black bg-cocoa-950 text-warm-beige leading-relaxed font-mono text-xs md:text-sm shadow-inner rounded"
                      style={{ transform: "translateZ(15px)" }}
                    >
                      <MessageSquare className="absolute -top-3.5 left-4 w-7 h-7 text-amber-orange fill-cocoa-950 stroke-black stroke-2" />
                      <span className="text-amber-orange font-bold uppercase block text-[9px] font-pixel mb-1.5">[QUOTE]</span>
                      "{activeFounder.quote}"
                    </blockquote>
                  </div>

                  {/* Skills inventory layout row */}
                  <div id="founder-skills-row" className="flex flex-wrap gap-3 pt-2" style={{ transform: "translateZ(18px)" }}>
                    {activeFounder.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -3, transition: { duration: 0.18 } }}
                        className={`flex items-center gap-2 px-4 py-2 bg-cocoa-950 border-2 border-black transition-all duration-300 text-xs font-mono font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                          activeFounder.id === "ronan"
                            ? "text-warm-beige hover:border-amber-orange hover:text-amber-orange hover:shadow-[3px_3px_0px_0px_rgba(234,127,67,0.5)] cursor-pointer"
                            : "text-sage-text hover:border-amber-orange hover:text-amber-orange"
                        }`}
                      >
                        <span className="text-amber-orange">{skill.icon}</span>
                        <span>{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
