import { motion } from "motion/react";
import { Trees, Network, Spade, Footprints } from "lucide-react";

export default function Clearing() {
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
          </div>

          {/* Photo stacked card presentation side */}
          <div id="clearing-image-col" className="lg:col-span-6 flex justify-center px-2 sm:px-0">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mr-4 mb-4 md:mr-6 md:mb-6">
              {/* Back offset shadow card */}
              <div 
                id="image-stack-shadow-card" 
                className="absolute inset-0 bg-logo-brown border-4 border-black rounded translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 pointer-events-none" 
              />
              
              {/* Main content photograph card in pixel style frame */}
              <motion.div
                id="image-stack-main-card"
                whileHover={{ rotate: -1, scale: 1.01 }}
                className="relative bg-cocoa-900 border-4 border-black p-2 sm:p-4 rounded overflow-hidden cursor-pointer z-10"
              >
                <div className="aspect-square w-full rounded border-2 border-black overflow-hidden relative group">
                  <img
                    src="/campfire.png"
                    alt="Pixel art campfire in a dark forest clearing"
                    className="w-full h-full object-cover crisp-pixel group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Banner overlay styled as retro UI caption */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/90 p-2 sm:p-3 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between font-pixel text-[8px] sm:text-[9px] text-[#eadec9] gap-1.5 sm:gap-0 text-center sm:text-left">
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
