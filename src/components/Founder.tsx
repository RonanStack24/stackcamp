import { motion } from "motion/react";
import { Award, Code, Hammer, MessageSquare, Terminal } from "lucide-react";

export default function Founder() {
  const skills = [
    { name: "ASP.NET Core", icon: <Terminal className="w-4 h-4" /> },
    { name: "C# / .NET Ninja", icon: <Code className="w-4 h-4" /> },
    { name: "Aspiring Front-End Dev", icon: <Hammer className="w-4 h-4" /> },
    { name: "Learning PHP / Laravel", icon: <Terminal className="w-4 h-4" /> },
  ];

  return (
    <section id="founder" className="py-24 bg-cocoa-950/80 relative overflow-hidden border-t-4 border-black z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-cocoa-900/40 via-transparent to-cocoa-950 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          id="founder-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative bg-cocoa-900 border-4 border-black p-8 md:p-12 rounded shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
        >
          {/* Subtle amber lighting behind the profile card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-orange/5 rounded-full filter blur-3xl pointer-events-none -translate-y-10 translate-x-10" />

          {/* Top corner pixel notches */}
          <div className="absolute top-1 left-1 w-2.5 h-2.5 bg-black" />
          <div className="absolute top-1 right-1 w-2.5 h-2.5 bg-black" />
          <div className="absolute bottom-1 left-1 w-2.5 h-2.5 bg-black" />
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-black" />

          <div id="founder-card-grid" className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Left Column: RPG Character Portrait Frame */}
            <div id="founder-portrait-col" className="md:col-span-4 flex justify-center">
              <div className="relative group w-48 h-48 md:w-full md:aspect-square">
                {/* Visual Glow framing the picture */}
                <div className="absolute inset-0 bg-amber-orange border-4 border-dashed border-black opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
                
                <div className="relative w-full h-full border-4 border-black bg-black rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <img
                    src="/ronan.jpg"
                    alt="Ronan Antoque - Stackcamp Founder"
                    className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05] grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                  />
                  {/* Small gold token banner in picture corner */}
                  <div className="absolute top-2 left-2 bg-yellow-500 border border-black p-1 text-[8px] font-pixel text-black leading-none">
                    GUILD LEADER
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Character Attributes & Bio Description */}
            <div id="founder-bio-col" className="md:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="font-pixel text-[10px] tracking-widest uppercase text-amber-orange flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-orange" /> Main Cabin Anchor • Camper Log #1
                </span>
                <h3 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-warm-beige">
                  Meet the Founder
                </h3>
              </div>

              <div className="space-y-4 font-mono text-sm md:text-base">
                <p className="text-sage-text leading-relaxed">
                  Hi, I'm <strong className="text-[#ffa16c] font-black underline decoration-dashed decoration-amber-orange">Ronan Antoque</strong>. I am an aspiring full-stack developer dedicated to diving deep into C#, .NET, and responsive user experiences.
                </p>

                {/* RPG Dialogue Style Quote Container */}
                <blockquote className="relative p-4 border-4 border-black bg-cocoa-950 text-warm-beige leading-relaxed font-mono text-xs md:text-sm shadow-inner rounded">
                  <MessageSquare className="absolute -top-3.5 left-4 w-7 h-7 text-amber-orange fill-cocoa-950 stroke-black stroke-2" />
                  <span className="text-amber-orange font-bold uppercase block text-[9px] font-pixel mb-1.5">[QUOTE]</span>
                  "Stackcamp was designed to be a digital camp house that feels like a quiet home. No hustle noise, just patient developers refining their craft."
                </blockquote>
              </div>

              {/* Skills inventory layout row */}
              <div id="founder-skills-row" className="flex flex-wrap gap-3 pt-2">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-4 py-2 bg-cocoa-950 border-2 border-black text-sage-text hover:border-amber-orange hover:text-amber-orange transition-all duration-300 text-xs font-mono font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <span className="text-amber-orange">{skill.icon}</span>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
