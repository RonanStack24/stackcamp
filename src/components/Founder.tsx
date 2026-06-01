import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, Code, Hammer, MessageSquare, Terminal, Coffee, Sparkles, Map } from "lucide-react";

export default function Founder() {
  const foundersData = [
    {
      id: "ronan",
      name: "Ronan Antoque",
      role: "Founder / Guild Leader",
      image: "/ronan.jpg",
      quote: "We didn't just want to build another social network. We wanted to build a home for developers to escape the noise and just build.",
      bio: "I am an aspiring full-stack developer dedicated to diving deep into C#, .NET, and responsive user experiences.",
      skills: [
        { name: "ASP.NET Core", icon: <Terminal className="w-4 h-4" /> },
        { name: "C# / .NET Ninja", icon: <Code className="w-4 h-4" /> },
        { name: "Aspiring Front-End Dev", icon: <Hammer className="w-4 h-4" /> },
        { name: "Learning PHP / Laravel", icon: <Terminal className="w-4 h-4" /> },
        { name: "IoT Agritech", icon: <Sparkles className="w-4 h-4" /> },
      ],
      badge: "GUILD LEADER / DEV"
    },
    {
      id: "jumbo",
      name: "Cris Jumbo Caras",
      role: "Co-Founder / Architect",
      image: "/jumbo.jpg",
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
      image: "https://ui-avatars.com/api/?name=BE&background=ea7f43&color=201311&size=200",
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedIdx((prev) => (prev + 1) % foundersData.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [selectedIdx, foundersData.length]);

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
                    <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
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

        {/* ACTIVE CHARACTER CARD */}
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

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFounder.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
            >
              
              {/* Left Column: RPG Character Portrait Frame */}
              <div id="founder-portrait-col" className="md:col-span-4 flex justify-center">
                <div className="relative group w-48 h-48 md:w-full md:aspect-square">
                  {/* Visual Glow framing the picture */}
                  <div className="absolute inset-0 bg-amber-orange border-4 border-dashed border-black opacity-30 group-hover:opacity-60 transition-opacity duration-300" />
                  
                  <div className="relative w-full h-full border-4 border-black bg-black rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <img
                      src={activeFounder.image}
                      alt={activeFounder.name}
                      className="w-full h-full object-cover object-top filter brightness-[0.9] contrast-[1.05] grayscale-[15%] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                    />
                    {/* Small gold token banner in picture corner */}
                    <div className="absolute top-2 left-2 bg-yellow-500 border border-black p-1 text-[8px] font-pixel text-black leading-none">
                      {activeFounder.badge}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Character Attributes & Bio Description */}
              <div id="founder-bio-col" className="md:col-span-8 space-y-6">
                <div className="space-y-2">
                  <span className="font-pixel text-[10px] tracking-widest uppercase text-amber-orange flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-orange" /> {activeFounder.role}
                  </span>
                  <h3 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-warm-beige">
                    {activeFounder.name}
                  </h3>
                </div>

                <div className="space-y-4 font-mono text-sm md:text-base">
                  <p className="text-sage-text leading-relaxed">
                    {activeFounder.bio}
                  </p>

                  {/* RPG Dialogue Style Quote Container */}
                  <blockquote className="relative p-4 border-4 border-black bg-cocoa-950 text-warm-beige leading-relaxed font-mono text-xs md:text-sm shadow-inner rounded">
                    <MessageSquare className="absolute -top-3.5 left-4 w-7 h-7 text-amber-orange fill-cocoa-950 stroke-black stroke-2" />
                    <span className="text-amber-orange font-bold uppercase block text-[9px] font-pixel mb-1.5">[QUOTE]</span>
                    "{activeFounder.quote}"
                  </blockquote>
                </div>

                {/* Skills inventory layout row */}
                <div id="founder-skills-row" className="flex flex-wrap gap-3 pt-2">
                  {activeFounder.skills.map((skill) => (
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
            </motion.div>
          </AnimatePresence>

        </motion.div>
      </div>
    </section>
  );
}
