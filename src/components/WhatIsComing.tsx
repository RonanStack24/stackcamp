import { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Contact, 
  Rocket, 
  Users, 
  BookOpen, 
  Flame,
  Sparkles,
  Heart,
  Plus,
  Compass,
  ArrowRight
} from "lucide-react";
import { DeveloperBadge, GuestbookEntry } from "../types";

export default function WhatIsComing() {
  const [activeTab, setActiveTab] = useState<string>("profiles");

  // Word rotator state
  const roles = [
    "developers.",
    "engineers.",
    "architects.",
    "builders.",
    "creators.",
    "students.",
    "innovators."
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Local states for interactive simulators
  // 1. Badge Generator State
  const [badgeName, setBadgeName] = useState("RonanStack24");
  const [badgeRole, setBadgeRole] = useState("developers");
  const [badgeSkills, setBadgeSkills] = useState(["ASP.NET Core", "C#", "UI Design"]);
  const [newSkill, setNewSkill] = useState("");
  const [badgeCharacter, setBadgeCharacter] = useState("🦊"); // default to our logo fox!

  // 2. Project Showcases State
  const [projects, setProjects] = useState([
    { id: "1", title: "Sustainable Living Mod", developer: "ElderPine", fuelCount: 42, tag: "Architect" },
    { id: "2", title: "Woodland UI Engine", developer: "HazelSprout", fuelCount: 29, tag: "Engineer" },
    { id: "3", title: "Student Capstone App", developer: "RangerDan", fuelCount: 56, tag: "Student" },
  ]);

  // 3. Collaboration board status
  const [collabMatches, setCollabMatches] = useState([
    { id: "c1", title: "Looking for structural feedback on 3D housing model", sender: "MossGazer", role: "Architect" },
    { id: "c2", title: "Need student beta-testers for a new study tool", sender: "FiraCoder", role: "Innovator" },
  ]);
  const [newCollabRequest, setNewCollabRequest] = useState("");
  const [newCollabSender, setNewCollabSender] = useState("");

  // 4. Build Logs timeline status
  const [buildLogs, setBuildLogs] = useState([
    { id: "b1", camper: "RonanStack24", mood: "🔥 Fired up", text: "Successfully finished the Stackcamp layout. The community features are coming together.", time: "Just now" },
    { id: "b2", camper: "PixelPioneer", mood: "☕ Cozy Code", text: "Working on customizable pixel profile cards for all creators.", time: "10 mins ago" },
  ]);
  const [newLogText, setNewLogText] = useState("");
  const [newLogMood, setNewLogMood] = useState("🔥 Fired up");

  // 5. Community cabins joined
  const [joinedCabins, setJoinedCabins] = useState<string[]>(["Creators Studio"]);

  const handleAddSkill = (e: FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && badgeSkills.length < 5) {
      setBadgeSkills([...badgeSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setBadgeSkills(badgeSkills.filter((s) => s !== skill));
  };

  const handleFeedProject = (id: string) => {
    setProjects(projects.map(p => p.id === id ? { ...p, fuelCount: p.fuelCount + 1 } : p));
  };

  const handlePostCollab = (e: FormEvent) => {
    e.preventDefault();
    if (newCollabRequest.trim() && newCollabSender.trim()) {
      setCollabMatches([
        {
          id: `c_${Date.now()}`,
          title: newCollabRequest.trim(),
          sender: newCollabSender.trim(),
          role: "Camper"
        },
        ...collabMatches
      ]);
      setNewCollabRequest("");
      setNewCollabSender("");
    }
  };

  const handlePostLog = (e: FormEvent) => {
    e.preventDefault();
    if (newLogText.trim()) {
      setBuildLogs([
        {
          id: `b_${Date.now()}`,
          camper: "Guest Camper",
          mood: newLogMood,
          text: newLogText.trim(),
          time: "Just now"
        },
        ...buildLogs
      ]);
      setNewLogText("");
    }
  };

  const toggleCabin = (cabin: string) => {
    if (joinedCabins.includes(cabin)) {
      setJoinedCabins(joinedCabins.filter(c => c !== cabin));
    } else {
      setJoinedCabins([...joinedCabins, cabin]);
    }
  };

  const regions = [
    {
      id: "profiles",
      title: "Campsite Licenses",
      description: "Showcase your builder stats with pixel-inspired profile passports that represent your specialized toolkit.",
      icon: "Contact",
      badge: "LVL 1"
    },
    {
      id: "projects",
      title: "Shared Fireplaces",
      description: "Display your builds in retro campfire galleries. Throw logs onto builders' fires to support their craft.",
      icon: "Rocket",
      badge: "LVL 2"
    },
    {
      id: "collab",
      title: "Cabin Matchmaker",
      description: "Find co-pilots, swap beta-version feedback, and team up with other woodland explorers.",
      icon: "Users",
      badge: "LVL 1"
    },
    {
      id: "logs",
      title: "Build Logs Diary",
      description: "Write simple notes detailing daily code-craft updates, major bugs squashed, and slow progress wins.",
      icon: "BookOpen",
      badge: "COZY"
    },
    {
      id: "comm",
      title: "Niche Outposts",
      description: "Stay in language-specific cabins (C#, Rust, React) with dedicated chat boards and custom shared flags.",
      icon: "Flame",
      badge: "GATHER"
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Contact": return <Contact className="w-5 h-5 text-amber-orange" />;
      case "Rocket": return <Rocket className="w-5 h-5 text-amber-orange" />;
      case "Users": return <Users className="w-5 h-5 text-amber-orange" />;
      case "BookOpen": return <BookOpen className="w-5 h-5 text-amber-orange" />;
      case "Flame": return <Flame className="w-5 h-5 text-amber-orange" />;
      default: return <Contact className="w-5 h-5 text-amber-orange" />;
    }
  };

  return (
    <section id="vision" className="py-24 bg-cocoa-900/75 border-t-4 border-black relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block with retro game font subtitle */}
        <div id="vision-header" className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="font-pixel text-[11px] tracking-wider uppercase text-amber-orange block">
            🎮 INTRODUCING THE OUTPOST DISTRICTS
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-warm-beige leading-tight min-h-[140px] md:min-h-[110px]">
            Stackcamp is a cozy digital camp for
            <span className="block text-amber-orange mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
          <p className="text-sage-text leading-relaxed font-mono">
            Our cozy virtual map is constantly expanding. Click one of the campfire districts below to try its interactive client-side simulator sandbox.
          </p>
        </div>

        {/* Feature Grid & Split Sandbox View */}
        <div id="vision-layout-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left list of cards stylized as pixel inventory panels (6 cols) */}
          <div id="vision-features-col" className="lg:col-span-6 flex flex-col gap-4">
            {regions.map((region) => {
              const isSelected = activeTab === region.id;
              return (
                <motion.button
                  id={`region-btn-${region.id}`}
                  key={region.id}
                  onClick={() => setActiveTab(region.id)}
                  whileHover={{ x: 6 }}
                  className={`text-left p-5 transition-all duration-300 relative flex items-start gap-4 cursor-pointer focus:outline-none ${
                    isSelected 
                      ? "bg-logo-brown pixel-border-orange retro-shadow-orange" 
                      : "bg-cocoa-950 pixel-border hover:pixel-border-orange retro-shadow"
                  }`}
                >
                  <div className={`p-3 border-2 border-black ${
                    isSelected ? "bg-amber-orange text-cocoa-950" : "bg-cocoa-900 text-amber-orange"
                  } transition-colors duration-300`}>
                    {getIcon(region.icon)}
                  </div>
                  <div className="space-y-1 pr-12 font-mono">
                    <h3 className="font-sans font-extrabold text-lg text-warm-beige">
                      {region.title}
                    </h3>
                    <p className="text-sage-text text-sm leading-relaxed font-normal font-mono">
                      {region.description}
                    </p>
                  </div>
                  
                  {/* Absolute Badge */}
                  <span className={`absolute top-4 right-4 font-pixel text-[8px] px-2 py-0.5 border border-black ${
                    isSelected ? "bg-amber-orange text-cocoa-950" : "bg-cocoa-800 text-sage-text"
                  }`}>
                    {region.badge}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right interactive gameboy console simulator (6 cols) */}
          <div id="vision-sandbox-col" className="lg:col-span-6 flex items-stretch px-1 sm:px-0">
            <div className="w-full bg-logo-brown border-4 border-black p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm self-stretch min-h-[550px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              
              {/* Retro console venting slots decorative */}
              <div className="absolute top-3 right-6 flex gap-1 pointer-events-none opacity-40">
                <div className="w-1.5 h-6 bg-black rounded" />
                <div className="w-1.5 h-6 bg-black rounded" />
                <div className="w-1.5 h-6 bg-black rounded" />
              </div>

              <div id="sandbox-content" className="relative z-10 w-full">
                
                {/* Sandbox Title Screen Panel Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b-2 border-black/60">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-red-500 border border-black animate-pulse rounded-full" />
                    <h4 className="text-[11px] font-pixel tracking-widest uppercase text-amber-orange">
                      SIMULATOR v1.02
                    </h4>
                  </div>
                  <span className="font-pixel text-[8px] text-warm-beige/60 bg-black/50 px-2 py-1">
                    SYS ENABLED
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {/* TAB 1: Developer Profiles Passport Maker */}
                  {activeTab === "profiles" && (
                    <motion.div
                      id="sandbox-profiles"
                      key="profiles"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <p className="text-xs text-sage-text leading-relaxed font-mono">
                        Build your custom RPG-style Camp Passport below to preview how builders showcase credentials to other residents inside the woods.
                      </p>

                      {/* Inputs in retro grid form */}
                      <div className="grid grid-cols-2 gap-4 font-mono">
                        <div className="space-y-1">
                          <label className="text-[10px] font-pixel text-amber-orange uppercase">CAMPER ALIAS</label>
                          <input
                            type="text"
                            value={badgeName}
                            onChange={(e) => setBadgeName(e.target.value.slice(0, 16))}
                            className="w-full bg-cocoa-950 border-2 border-black focus:border-amber-orange text-sm p-2 text-warm-beige outline-none"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-pixel text-amber-orange uppercase">JOB SPECIALTY</label>
                          <select
                            value={badgeRole}
                            onChange={(e) => setBadgeRole(e.target.value)}
                            className="w-full bg-cocoa-950 border-2 border-black focus:border-amber-orange text-sm p-2 text-warm-beige outline-none cursor-pointer"
                          >
                            <option value="developers">developers</option>
                            <option value="engineers">engineers</option>
                            <option value="architects">architects</option>
                            <option value="builders">builders</option>
                            <option value="creators">creators</option>
                            <option value="students">students</option>
                            <option value="innovators">innovators</option>
                          </select>
                        </div>
                      </div>

                      {/* Character selection */}
                      <div className="space-y-2 font-mono">
                        <label className="text-[10px] font-pixel text-amber-orange uppercase block">SELECT WOODLAND TOTEM</label>
                        <div className="flex gap-2">
                          {["🦊", "🐻", "🦌", "🐿️", "🦉", "🦦"].map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => setBadgeCharacter(emoji)}
                              className={`w-10 h-10 border-2 flex items-center justify-center text-lg transition-colors focus:outline-none ${
                                badgeCharacter === emoji ? "border-amber-orange bg-amber-orange/15" : "border-black bg-cocoa-950/60 hover:border-amber-orange"
                              }`}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Passport Preview card styled uniquely */}
                      <div className="border-4 border-dashed border-black/40 p-2 sm:p-4 flex justify-center bg-black/30">
                        <div className="relative w-full max-w-[288px] bg-cocoa-950 border-4 border-amber-orange p-3 sm:p-4 overflow-hidden shadow-2xl font-mono text-xs">
                          {/* Top heading strip inside passport */}
                          <div className="absolute top-0 right-0 bg-amber-orange text-cocoa-950 text-[8px] px-2.5 py-1 font-pixel font-bold uppercase">
                            STCamp-PASS
                          </div>
                          
                          <div className="flex gap-4 items-center">
                            {/* Sprite frame */}
                            <div className="w-16 h-16 bg-logo-brown border-2 border-black flex items-center justify-center text-3xl shadow-inner relative">
                              {badgeCharacter}
                            </div>
                            
                            <div className="space-y-1 flex-1 select-none font-mono">
                              <p className="text-[8px] text-amber-orange font-pixel">PASSPORT VERIFIED</p>
                              <h5 className="font-extrabold text-warm-beige text-base truncate uppercase">{badgeName || "CAMPER"}</h5>
                              <p className="text-sage-text text-xs italic">{badgeRole}</p>
                              <p className="text-[9px] text-amber-orange/60 font-mono">ID: REG-2026-STK</p>
                            </div>
                          </div>
                          
                          {/* Skills strip */}
                          <div className="mt-4 pt-3 border-t-2 border-black/60">
                            <p className="text-[9px] font-pixel text-amber-orange mb-1.5 uppercase">CAMPSITE ABILITIES</p>
                            <div className="flex flex-wrap gap-1.5">
                              {badgeSkills.map((s) => (
                                <span key={s} className="bg-cocoa-900 border border-black/80 px-2 py-0.5 text-[9px] text-warm-beige flex items-center gap-1 font-mono">
                                  {s}
                                  <button onClick={() => handleRemoveSkill(s)} className="text-red-400 hover:text-red-300 font-sans cursor-pointer">×</button>
                                </span>
                              ))}
                              {badgeSkills.length === 0 && (
                                <span className="text-[10px] text-red-300 font-mono italic">No actions registered</span>
                              )}
                            </div>
                          </div>

                          {/* Skill item add box */}
                          <form onSubmit={handleAddSkill} className="mt-4 flex gap-1.5 pt-2">
                            <input
                              type="text"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value.slice(0, 16))}
                              placeholder="Add stat tag (e.g., Unity)"
                              className="bg-black border border-black/80 text-[10px] rounded p-1 outline-none text-warm-beige flex-grow font-mono"
                            />
                            <button
                              type="submit"
                              className="px-3 py-1 bg-amber-orange hover:bg-[#ffa16c] text-cocoa-950 font-pixel text-[8px]"
                            >
                              ADD
                            </button>
                          </form>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: Shared Fireplaces */}
                  {activeTab === "projects" && (
                    <motion.div
                      id="sandbox-projects"
                      key="projects"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <p className="text-xs text-sage-text leading-relaxed font-mono">
                        Campers park builds in shared cabins. Stoke their engines by adding logs to their campfire. Click fire logs below to simulate active stoke cycles!
                      </p>

                      <div className="space-y-3 font-mono">
                        {projects.map((p) => (
                          <div key={p.id} className="p-4 bg-cocoa-950 border-2 border-black flex items-center justify-between hover:border-amber-orange transition-colors">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-pixel text-amber-orange bg-amber-orange/10 px-1.5 py-0.5 border border-amber-orange/30">
                                  {p.tag}
                                </span>
                                <h5 className="font-extrabold text-sm text-warm-beige uppercase">{p.title}</h5>
                              </div>
                              <p className="text-xs text-sage-text font-mono">Host: @{p.developer}</p>
                            </div>
                            
                            <button
                              onClick={() => handleFeedProject(p.id)}
                              className="flex items-center gap-2 px-3 py-2 bg-cocoa-900 border-2 border-black text-warm-beige hover:border-amber-orange hover:text-amber-orange transition-colors cursor-pointer select-none focus:outline-none"
                            >
                              <Flame className="w-4 h-4 text-amber-orange" />
                              <span className="font-pixel text-[11px] leading-none">{p.fuelCount}</span>
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="p-3 bg-black/40 border border-black text-[11px] text-sage-text font-mono text-center">
                        🔥 High stakes campfire fueling: each log stokes their thermal output ranking on the camp outposts page!
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: Cabin Matchmaker */}
                  {activeTab === "collab" && (
                    <motion.div
                      id="sandbox-collab"
                      key="collab"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <p className="text-xs text-sage-text leading-relaxed font-mono">
                        Post requests for code help, asset trades, or feedback sessions on the Cabin matchmaker bulletin card.
                      </p>

                      {/* Board poster box */}
                      <form onSubmit={handlePostCollab} className="p-4 bg-black/40 border-2 border-black space-y-3 font-mono">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            required
                            placeholder="Your Handle"
                            value={newCollabSender}
                            onChange={(e) => setNewCollabSender(e.target.value.slice(0, 14))}
                            className="bg-cocoa-950 border border-black focus:border-amber-orange p-2 text-xs text-warm-beige outline-none"
                          />
                          <p className="text-[10px] text-amber-orange font-pixel self-center text-right uppercase">POST BOARD</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            required
                            placeholder="I need help building..."
                            value={newCollabRequest}
                            onChange={(e) => setNewCollabRequest(e.target.value.slice(0, 50))}
                            className="bg-cocoa-950 border border-black focus:border-amber-orange p-2 text-xs text-warm-beige outline-none flex-grow"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-amber-orange text-cocoa-950 font-bold border border-black text-xs hover:bg-[#ffa16c] transition-colors"
                          >
                            POST
                          </button>
                        </div>
                      </form>

                      {/* Active cards */}
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {collabMatches.map((c) => (
                          <div key={c.id} className="p-3 bg-cocoa-950 border border-black text-xs space-y-1 font-mono">
                            <p className="text-warm-beige font-semibold uppercase">{c.title}</p>
                            <div className="flex justify-between text-[10px] text-[#ffa16c]">
                              <span>@{c.sender}</span>
                              <span className="font-pixel text-[8px] uppercase">{c.role}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: Build Logs */}
                  {activeTab === "logs" && (
                    <motion.div
                      id="sandbox-logs"
                      key="logs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <p className="text-xs text-sage-text leading-relaxed font-mono">
                        Document tiny wins and bugs squashed in your logs. Share authentic building processes.
                      </p>

                      <form onSubmit={handlePostLog} className="flex flex-col sm:flex-row gap-2 sm:items-center font-mono">
                        <select
                          value={newLogMood}
                          onChange={(e) => setNewLogMood(e.target.value)}
                          className="bg-cocoa-950 border border-black rounded p-2 text-xs text-warm-beige outline-none cursor-pointer"
                        >
                          <option value="🔥 Fired up">🔥 Fired up</option>
                          <option value="☕ Cozy Code">☕ Cozy Code</option>
                          <option value="🌲 Moss Gazing">🌲 Moss Gazing</option>
                          <option value="🎉 Level Up">🎉 Level Up</option>
                        </select>
                        <input
                          type="text"
                          required
                          value={newLogText}
                          onChange={(e) => setNewLogText(e.target.value.slice(0, 60))}
                          placeholder="What did you build today?"
                          className="bg-cocoa-950 border border-black focus:border-amber-orange p-2 text-xs text-warm-beige outline-none flex-grow"
                        />
                        <button
                          type="submit"
                          className="p-2.5 bg-amber-orange text-cocoa-950 font-bold border border-black hover:bg-[#ffa16c] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </form>

                      {/* Log timeline entries */}
                      <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                        {buildLogs.map((b) => (
                          <div key={b.id} className="relative pl-4 border-l-2 border-black text-xs font-mono">
                            <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded bg-amber-orange border border-black" />
                            <div className="flex justify-between text-[10px] text-sage-text mb-0.5">
                              <span className="text-[#ffa16c] font-semibold">@{b.camper} ({b.mood})</span>
                              <span>{b.time}</span>
                            </div>
                            <p className="text-warm-beige leading-relaxed">{b.text}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 5: Community Cabins */}
                  {activeTab === "comm" && (
                    <motion.div
                      id="sandbox-comm"
                      key="comm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-4"
                    >
                      <p className="text-xs text-sage-text leading-relaxed font-mono">
                        Establish residency in cozy dedicated cabins! Connect with players who share your language choice.
                      </p>

                      <div className="grid grid-cols-2 gap-2.5 font-mono">
                        {[
                          { name: "Creators Studio", icon: "🎨", campers: 124 },
                          { name: "Builders Workshop", icon: "🔨", campers: 198 },
                          { name: "Innovators Den", icon: "💡", campers: 88 },
                          { name: "Student Lounge", icon: "📚", campers: 145 },
                        ].map((cabin) => {
                          const isJoined = joinedCabins.includes(cabin.name);
                          return (
                            <button
                              key={cabin.name}
                              onClick={() => toggleCabin(cabin.name)}
                              className={`p-3 rounded border-2 text-left flex flex-col justify-between h-24 transition-all duration-300 focus:outline-none cursor-pointer ${
                                isJoined 
                                  ? "bg-amber-orange/15 border-amber-orange text-amber-orange" 
                                  : "bg-cocoa-950 border-black hover:border-amber-orange hover:bg-cocoa-900 text-warm-beige"
                              }`}
                            >
                              <div className="flex justify-between items-start w-full">
                                <span className="text-xl leading-none">{cabin.icon}</span>
                                <span className="text-[9px] font-pixel bg-black/60 px-1 py-0.5 text-sage-text leading-none">{cabin.campers}</span>
                              </div>
                              <div className="space-y-0.5">
                                <h6 className="font-bold text-xs truncate uppercase">{cabin.name}</h6>
                                <p className="text-[10px] opacity-70 font-pixel text-[8px] tracking-tight">{isJoined ? "LEAVE RESIDENCY" : "ENROLL NOW"}</p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {joinedCabins.length > 0 && (
                        <div className="p-3 bg-black/40 border border-[#ea7f43]/40 rounded text-xs leading-relaxed text-[#ffa16c] flex items-center gap-2 font-mono">
                          <Sparkles className="w-4 h-4 flex-shrink-0 text-amber-orange fill-amber-orange animate-pulse" />
                          <span>Active Keys Issued: <strong>{joinedCabins.join(", ")}</strong></span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Console handhold indicators */}
              <div id="sandbox-footer" className="mt-8 pt-4 border-t-2 border-black/50 flex justify-between items-center text-xs text-sage-text font-mono">
                <span className="text-[10px] uppercase font-pixel tracking-tighter text-[#ffa16c]">StackOS Engine</span>
                <span className="flex items-center gap-1 font-pixel text-[8px] text-amber-orange/80">
                  SECURE OUTPOST <Heart className="w-3 h-3 fill-amber-orange stroke-none animate-pulse" />
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
