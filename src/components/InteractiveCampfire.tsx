import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Flame, MessageSquare, Edit3, Send, Sparkles, Footprints, Heart } from "lucide-react";
import { GuestbookEntry } from "../types";

// Animated Retro Pixel Campfire SVG
interface PixelFireProps {
  intensity: number;
}
export function PixelCampfireSVG({ intensity }: PixelFireProps) {
  // We can write an SVG representing an adorable 16x16 pixel-grid campfire
  // It changes size and colors dynamically based on the intensity state
  return (
    <svg 
      className="w-40 h-40 crisp-pixel shadow-2xl transition-all duration-500 hover:scale-[1.05]" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dynamic Animated Spark Particles surrounding the campfire */}
      {intensity >= 3 && (
        <g>
          {/* Spark Left */}
          <motion.rect
            animate={{ y: [0, -6, 0], x: [0, -2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            x="3" y="4" width="1" height="1" fill="#ffa16c" 
          />
          {/* Spark Right */}
          <motion.rect
            animate={{ y: [0, -8, 0], x: [0, 3, 0], opacity: [0, 0.9, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.5, ease: "easeOut" }}
            x="12" y="3" width="1" height="1" fill="#fca859" 
          />
          {/* Spark Center Top */}
          <motion.rect
            animate={{ y: [0, -10, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2, ease: "easeOut" }}
            x="8" y="2" width="1" height="1" fill="#fff2dd" 
          />
        </g>
      )}

      {/* Burning Wood Logs (Always rendered at base) */}
      {/* Logs shadow */}
      <rect x="3" y="14" width="10" height="2" fill="#1b1210" />
      {/* Main Wood log */}
      <rect x="4" y="13" width="8" height="1" fill="#5c3826" />
      <rect x="5" y="12" width="6" height="1" fill="#754c38" />
      {/* Diagonal twig accent */}
      <rect x="3" y="13" width="2" height="1" fill="#3f2317" />
      <rect x="11" y="13" width="2" height="1" fill="#3f2317" />
      
      {/* FLAME CORE (Grows and alters colors based on heat level 1 to 5) */}
      <AnimatePresence mode="popLayout">
        <motion.g
          key={intensity}
          initial={{ scaleY: 0.7, opacity: 0.5 }}
          animate={{ scaleY: [1.0, 1.08, 0.98, 1.04, 1.0], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 0.8 / (intensity * 0.4), ease: "easeInOut" }}
          className="origin-bottom"
        >
          {/* Level 1: Weak Amber Core */}
          {intensity >= 1 && (
            <g>
              {/* Red-Orange Boundary */}
              <rect x="6" y="10" width="4" height="2" fill="#b1341c" />
              <rect x="7" y="9" width="2" height="1" fill="#b1341c" />
              {/* Orange Core */}
              <rect x="7" y="10" width="2" height="2" fill="#ea7f43" />
            </g>
          )}

          {/* Level 2: Medium Hearth */}
          {intensity >= 2 && (
            <g>
              {/* Red Outer */}
              <rect x="5" y="10" width="6" height="2" fill="#b1341c" />
              <rect x="6" y="8" width="4" height="2" fill="#b1341c" />
              <rect x="7" y="7" width="2" height="1" fill="#b1341c" />
              {/* Orange Mid */}
              <rect x="6" y="10" width="4" height="2" fill="#ea7f43" />
              <rect x="7" y="8" width="2" height="2" fill="#ea7f43" />
              {/* Yellow Core */}
              <rect x="7" y="9" width="2" height="1" fill="#fca859" />
            </g>
          )}

          {/* Level 3: Cozy standard campfire (Mochi's campfire) */}
          {intensity >= 3 && (
            <g>
              {/* Red Outer */}
              <rect x="4" y="9" width="8" height="3" fill="#b1341c" />
              <rect x="5" y="7" width="6" height="2" fill="#b1341c" />
              <rect x="6" y="5" width="4" height="2" fill="#b1341c" />
              <rect x="7" y="4" width="2" height="1" fill="#b1341c" />
              
              {/* Orange Mid */}
              <rect x="5" y="9" width="6" height="3" fill="#ea7f43" />
              <rect x="6" y="7" width="4" height="2" fill="#ea7f43" />
              <rect x="7" y="5" width="2" height="2" fill="#ea7f43" />
              
              {/* Yellow inner */}
              <rect x="6" y="9" width="4" height="2" fill="#fca859" />
              <rect x="7" y="7" width="2" height="2" fill="#fca859" />
              
              {/* White Core highlight */}
              <rect x="7" y="8" width="2" height="1" fill="#fffcf7" />
            </g>
          )}

          {/* Level 4: Roaring Fireplace */}
          {intensity >= 4 && (
            <g>
              {/* Red Outer */}
              <rect x="3" y="8" width="10" height="4" fill="#b1341c" />
              <rect x="4" y="6" width="8" height="2" fill="#b1341c" />
              <rect x="5" y="4" width="6" height="2" fill="#b1341c" />
              <rect x="7" y="3" width="2" height="1" fill="#b1341c" />

              {/* Orange Mid */}
              <rect x="4" y="8" width="8" height="4" fill="#ea7f43" />
              <rect x="5" y="6" width="6" height="2" fill="#ea7f43" />
              <rect x="6" y="4" width="4" height="2" fill="#ea7f43" />

              {/* Yellow inner */}
              <rect x="5" y="8" width="6" height="3" fill="#fca859" />
              <rect x="6" y="6" width="4" height="2" fill="#fca859" />
              <rect x="7" y="5" width="2" height="1" fill="#fca859" />

              {/* White Core highlight */}
              <rect x="6" y="8" width="4" height="1" fill="#fffcf7" />
              <rect x="7" y="7" width="2" height="1" fill="#fffcf7" />
            </g>
          )}

          {/* Level 5: High Blaze Bonfire */}
          {intensity >= 5 && (
            <g>
              {/* Red Outer */}
              <rect x="2" y="7" width="12" height="5" fill="#b1341c" />
              <rect x="3" y="5" width="10" height="2" fill="#b1341c" />
              <rect x="4" y="3" width="8" height="2" fill="#b1341c" />
              <rect x="6" y="1" width="4" height="2" fill="#b1341c" />

              {/* Orange Mid */}
              <rect x="3" y="7" width="10" height="5" fill="#ea7f43" />
              <rect x="4" y="5" width="8" height="2" fill="#ea7f43" />
              <rect x="5" y="3" width="6" height="2" fill="#ea7f43" />
              <rect x="7" y="2" width="2" height="1" fill="#ea7f43" />

              {/* Yellow inner */}
              <rect x="4" y="7" width="8" height="4" fill="#fca859" />
              <rect x="5" y="5" width="6" height="2" fill="#fca859" />
              <rect x="6" y="3" width="4" height="2" fill="#fca859" />

              {/* White Core highlight */}
              <rect x="5" y="7" width="6" height="2" fill="#fffcf7" />
              <rect x="6" y="5" width="4" height="2" fill="#fffcf7" />
            </g>
          )}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}

export default function InteractiveCampfire() {
  const [fireIntensity, setFireIntensity] = useState<number>(3); // scale 1-5
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  
  // Guestbook inputs
  const [name, setName] = useState("");
  const [role, setRole] = useState("Software Craftsman");
  const [message, setMessage] = useState("");
  const [selectedAvatarId, setSelectedAvatarId] = useState("🦊");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Load guestbook from localStorage or seed initial data
    const saved = localStorage.getItem("stackcamp_guestbook");
    if (saved) {
      try {
        setGuestbook(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse guestbook", err);
      }
    } else {
      const initial: GuestbookEntry[] = [
        {
          id: "g1",
          name: "ElderPine",
          role: "C# Legend",
          message: "Welcome to Stackcamp! Love how clean and quiet it is here. Throwing a solid pine log onto the fire! 🪵🔥",
          timestamp: "Today at 12:45 PM",
          avatarId: "🐻"
        },
        {
          id: "g2",
          name: "HazelSprout",
          role: "UI Artisan",
          message: "The spacing and typography are wonderful. It's so refreshing to see projects designed with patience and craft. Grab a marshmallow!",
          timestamp: "Today at 2:15 PM",
          avatarId: "🦊"
        }
      ];
      setGuestbook(initial);
      localStorage.setItem("stackcamp_guestbook", JSON.stringify(initial));
    }

    // Slowly reduce fire intensity over time to simulate a burning campfire
    const interval = setInterval(() => {
      setFireIntensity((prev) => (prev > 1 ? prev - 1 : 1));
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const handleFeedFire = () => {
    setFireIntensity((prev) => (prev < 5 ? prev + 1 : 5));
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleLeaveMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `g_${Date.now()}`,
      name: name.trim(),
      role: role.trim() || "Camper",
      message: message.trim(),
      timestamp: "Just now",
      avatarId: selectedAvatarId
    };

    const updated = [newEntry, ...guestbook];
    setGuestbook(updated);
    localStorage.setItem("stackcamp_guestbook", JSON.stringify(updated));

    // Reset fields
    setName("");
    setMessage("");

    // Light up the fire as they leave a log message!
    setFireIntensity((prev) => (prev < 5 ? prev + 1 : 5));
  };

  const avatars = ["🦊", "🐻", "🦌", "🐿️", "🦉", "🦦", "🦫"];

  // Mapping fire intensity to text description
  const getDescription = () => {
    switch (fireIntensity) {
      case 1: return "Weak embers (stoke ASAP!)";
      case 2: return "A calm, gentle wood crackle";
      case 3: return "Cosy bonfire gathering heat";
      case 4: return "A blazing camper furnace!";
      case 5: return "ROARING SOLAR HEARTH!";
      default: return "Campfire online";
    }
  };

  return (
    <section id="campfire-logs" className="py-24 bg-cocoa-900 border-t-4 border-black overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa-950 via-transparent to-[#0e1510] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div id="campfire-interactive-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Interactive virtual campfire widget (5 columns) */}
          <div id="campfire-visual-col" className="lg:col-span-5 space-y-8 flex flex-col items-center text-center">
            
            <div className="space-y-3 w-full">
              <span className="font-pixel text-[10px] tracking-widest uppercase text-amber-orange flex items-center justify-center gap-2">
                <Flame className="w-4 h-4 animate-bounce" /> Camping ground center
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-warm-beige">
                The Cozy Campfire
              </h2>
              <p className="text-sage-text text-sm max-w-sm mx-auto leading-relaxed font-mono">
                Add timber logs below to stoke our shared campsite flame in real time. Higher fires glow brighter and flicker with intensified retro particles!
              </p>
            </div>

            {/* Campfire Stage Container in Pixel Frame */}
            <div className="h-80 w-full bg-cocoa-950 border-4 border-black flex flex-col justify-center items-center relative overflow-hidden p-6 shadow-inner retro-shadow">
              
              {/* Forest Silhouette overlay behind the fire */}
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              
              {/* Active heat light backing */}
              <div 
                className="absolute rounded-full transition-all duration-1000 bg-amber-orange/20 filter blur-3xl"
                style={{ 
                  width: `${60 + fireIntensity * 30}px`, 
                  height: `${60 + fireIntensity * 30}px`,
                  opacity: fireIntensity * 0.2
                }}
              />

              {/* Dynamic Campfire Stage */}
              <div className="relative flex justify-center items-end h-52 w-52 pb-6">
                
                {/* Floating "+1 log" text popup */}
                <AnimatePresence>
                  {showNotification && (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [1, 1, 0], y: -80 }}
                      exit={{ opacity: 0 }}
                      className="absolute font-pixel text-[8px] text-amber-orange bg-black border border-amber-orange rounded px-2 py-1 z-10"
                    >
                      🪵 STOKED! +1 Log
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Animated Pixel Flame render */}
                <div className="cursor-pointer" onClick={handleFeedFire}>
                  <PixelCampfireSVG intensity={fireIntensity} />
                </div>
              </div>

              {/* Intensity text statistics */}
              <div className="mt-2 text-xs font-mono text-sage-text leading-none flex items-center gap-2">
                <span className="font-pixel text-[8px] text-amber-orange text-left uppercase">STRENGTH:</span>
                <span className="text-warm-beige font-extrabold uppercase">{getDescription()}</span>
              </div>
            </div>

            {/* Interaction button styled as big wooden button */}
            <button
              onClick={handleFeedFire}
              className="font-pixel text-[10px] w-full max-w-sm px-6 py-4 bg-amber-orange hover:bg-[#ffa16c] text-cocoa-950 font-extrabold pixel-border retro-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 uppercase tracking-wide cursor-pointer focus:outline-none"
            >
              <Sparkles className="w-4 h-4 animate-spin text-cocoa-950" /> Add Pine Logs 🪵
            </button>
          </div>

          {/* Campground Guestbook form and lists (7 columns) */}
          <div id="campfire-logs-col" className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="font-pixel text-[10px] tracking-widest uppercase text-sage-text flex items-center gap-2">
                <Footprints className="w-4 h-4 text-emerald-400" /> Section IV • Camp Log Registration
              </span>
              <h3 className="font-display text-4xl font-bold text-warm-beige">
                Campground Guestbook
              </h3>
              <p className="text-sage-text text-sm font-mono leading-relaxed">
                Check in to the guest logs. Register your builder handle, choose your Woodland Avatar totem, and carve your friendly comment into the campsite log scroll!
              </p>
            </div>

            {/* Entry RPG Register form */}
            <form onSubmit={handleLeaveMessage} className="p-6 bg-cocoa-950 border-4 border-black space-y-5 shadow-inner rounded relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-pixel text-[9px] text-amber-orange uppercase font-bold block">CAMPER HANDLE</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value.slice(0, 16))}
                    placeholder="e.g. PixelPioneer"
                    className="w-full bg-cocoa-900 border-2 border-black focus:border-amber-orange p-2.5 text-sm font-mono text-[#EADEC9] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-pixel text-[9px] text-amber-orange uppercase font-bold block">PRIMARY CRAFT</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value.slice(0, 24))}
                    placeholder="e.g. C# Sentry, UI Artisan"
                    className="w-full bg-cocoa-900 border-2 border-black focus:border-amber-orange p-2.5 text-sm font-mono text-[#EADEC9] outline-none"
                  />
                </div>
              </div>

              {/* Avatar Selector blocks */}
              <div className="space-y-2">
                <label className="font-pixel text-[9px] text-amber-orange uppercase font-bold block">CHOOSE WOODLAND SPRITE AVATAR</label>
                <div className="flex flex-wrap gap-2">
                  {avatars.map((av) => (
                    <button
                      type="button"
                      key={av}
                      onClick={() => setSelectedAvatarId(av)}
                      className={`w-10 h-10 border-2 flex items-center justify-center text-xl transition-colors focus:outline-none cursor-pointer ${
                        selectedAvatarId === av ? "border-amber-orange bg-amber-orange/15" : "border-black bg-cocoa-900 hover:border-amber-orange"
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Scroll */}
              <div className="space-y-1">
                <label className="font-pixel text-[9px] text-amber-orange uppercase font-bold block">COZY REVELATION / GREETING</label>
                <textarea
                  required
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 180))}
                  placeholder="Leave a friendly greeting, wishing others well, or joke..."
                  className="w-full bg-cocoa-900 border-2 border-black focus:border-amber-orange p-2.5 text-sm font-mono text-[#EADEC9] outline-none resize-none"
                />
              </div>

              {/* Submit button */}
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-2">
                <span className="font-pixel text-[8px] text-sage-text text-center sm:text-left">
                  🪵 Note: Stokes fire core level on submission!
                </span>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-orange hover:bg-[#ffa16c] text-cocoa-950 font-pixel text-[9px] font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000000] cursor-pointer"
                >
                  STITCH TO LOGS
                </button>
              </div>
            </form>

            {/* List entries layout resembling bulletin messages */}
            <div id="guestbook-entries-list" className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              <AnimatePresence>
                {guestbook.map((entry) => (
                  <motion.div id={`guest-entry-${entry.id}`}
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-4 bg-cocoa-950/80 border-2 border-black flex gap-4 hover:border-amber-orange transition-colors"
                  >
                    {/* Retro Profile Box */}
                    <div className="w-12 h-12 bg-cocoa-900 border-2 border-black flex items-center justify-center text-3xl flex-shrink-0 relative">
                      {entry.avatarId}
                    </div>
                    
                    <div className="space-y-1.5 flex-grow font-mono">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-sans font-extrabold text-sm text-warm-beige truncate max-w-[150px]">{entry.name}</h4>
                          <span className="text-[9px] bg-black px-1.5 py-0.5 text-amber-orange border border-black/50 tracking-wide font-pixel leading-none truncate max-w-[130px]">
                            {entry.role}
                          </span>
                        </div>
                        <span className="text-[10px] text-sage-text opacity-70">
                          {entry.timestamp}
                        </span>
                      </div>
                      <p className="text-warm-beige text-xs leading-relaxed font-mono whitespace-pre-wrap">{entry.message}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
