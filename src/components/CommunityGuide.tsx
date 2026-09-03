import { 
  motion, 
  useReducedMotion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "motion/react";
import {
  BadgeCheck,
  BookOpen,
  ChevronDown,
  Code2,
  Hammer,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface StepItem {
  icon: typeof BadgeCheck;
  number: string;
  title: string;
  description: string;
  badge: string;
  emoji: string;
}

const steps: StepItem[] = [
  {
    icon: BadgeCheck,
    number: "01",
    title: "Claim your cabin key",
    description:
      "Join the camp, choose your builder type, and create a passport that shows what you make and what you are learning.",
    badge: "STAGE 01 • ENTRY",
    emoji: "🔑",
  },
  {
    icon: Hammer,
    number: "02",
    title: "Share the work",
    description:
      "Post projects and small build logs. Progress, experiments, and lessons learned are all welcome around the fire.",
    badge: "STAGE 02 • BUILD",
    emoji: "🪵",
  },
  {
    icon: Users,
    number: "03",
    title: "Find your crew",
    description:
      "Enter a specialist cabin, ask for feedback, or team up with another camper without the pressure of a noisy feed.",
    badge: "STAGE 03 • GUILD",
    emoji: "⛺",
  },
];

// Interactive 3D Isometric Parallax Step Card
function Step3DCard({ step, index }: { step: StepItem; index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 240, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 240, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = step.icon;

  return (
    <div
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full"
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ delay: index * 0.12, duration: 0.5 }}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
        className="relative border-4 border-black bg-cocoa-950 p-6 sm:p-7 retro-shadow overflow-hidden h-full flex flex-col justify-between group transition-colors hover:border-amber-orange cursor-default"
      >
        {/* Ambient radial glow on hover (Z-10px) */}
        <div 
          className="absolute -top-10 -right-10 w-32 h-32 bg-amber-orange/10 rounded-full blur-xl pointer-events-none group-hover:bg-amber-orange/25 transition-colors"
          style={{ transform: "translateZ(-10px)" }}
        />

        {/* Massive Giant Background Step Number (Z-5px) */}
        <span 
          className="absolute right-3 top-2 font-display text-6xl sm:text-7xl font-bold text-cocoa-800/40 select-none group-hover:text-amber-orange/20 transition-colors pointer-events-none"
          style={{ transform: "translateZ(-5px)" }}
        >
          {step.number}
        </span>

        {/* Top meta strip with Stage pill & emoji (Z-22px) */}
        <div className="flex items-center justify-between mb-6 relative z-10" style={{ transform: "translateZ(22px)" }}>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-amber-orange rounded-full animate-pulse" />
            <span className="font-pixel text-[9px] text-amber-orange tracking-wider uppercase">
              {step.badge}
            </span>
          </div>
          <span className="text-xl transform group-hover:scale-125 transition-transform duration-300">
            {step.emoji}
          </span>
        </div>

        {/* Icon & Title block (Z-30px) */}
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          <div className="mb-5 flex h-14 w-14 items-center justify-center border-3 border-black bg-logo-brown text-amber-orange group-hover:bg-amber-orange group-hover:text-cocoa-950 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-0.5 group-hover:translate-y-0.5">
            <Icon className="h-7 w-7 transform group-hover:rotate-6 transition-transform" />
          </div>

          <h3 className="mb-3 font-display text-3xl sm:text-4xl font-bold text-warm-beige group-hover:text-amber-orange transition-colors">
            {step.title}
          </h3>
        </div>

        {/* Description & Trail footer (Z-16px) */}
        <div className="mt-4 pt-4 border-t-2 border-black/40" style={{ transform: "translateZ(16px)" }}>
          <p className="text-xs sm:text-sm leading-relaxed text-sage-text font-mono">
            {step.description}
          </p>
        </div>
      </motion.article>
    </div>
  );
}

const roadmap = [
  {
    status: "LIVE",
    title: "Base Camp",
    description: "Waitlist, live camper roster, visitor counter, build logs, themes, and interactive feature previews.",
    icon: Code2,
    active: true,
  },
  {
    status: "NEXT",
    title: "Camper Passports",
    description: "Secure accounts, editable profiles, skills, roles, avatars, and a permanent identity across the camp.",
    icon: ShieldCheck,
    active: false,
  },
  {
    status: "PLANNED",
    title: "Shared Fireplaces",
    description: "Persistent project showcases, reactions, collaboration requests, and community cabin discussions.",
    icon: Rocket,
    active: false,
  },
];

const questions = [
  {
    question: "Who is Stackcamp for?",
    answer:
      "Anyone who enjoys building: developers, engineers, architects, designers, students, creators, and curious beginners.",
  },
  {
    question: "Is Stackcamp already open?",
    answer:
      "The public campsite and its interactive previews are live. Joining the camp currently reserves your cabin key while full member accounts are being built.",
  },
  {
    question: "Does my work need to be finished?",
    answer:
      "No. Stackcamp is designed for work in progress. Small experiments, learning notes, difficult bugs, and unfinished ideas belong here.",
  },
  {
    question: "What makes it different from a social feed?",
    answer:
      "Stackcamp is centered on craft and cooperation rather than reach, trends, or constant posting. The goal is a slower, more useful community.",
  },
];

export default function CommunityGuide() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section id="how-it-works" className="relative z-10 border-t-4 border-black bg-cocoa-900/80 py-24">
        <div className="mx-auto max-w-7xl px-6">
          
          {/* Header Block with 3D Kinetic Typography */}
          <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-cocoa-950 border-2 border-black retro-shadow-sm mb-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="font-pixel text-[9px] uppercase tracking-widest text-amber-orange flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-orange" />
                CAMPER FIELD GUIDE • 3 SIMPLE STAGES
              </span>
            </div>

            {/* 3D Kinetic Typography Heading */}
            <h2 
              id="how-it-works-title"
              aria-label="How Stackcamp works"
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-warm-beige flex flex-wrap justify-center items-center gap-x-3.5 gap-y-1 select-none overflow-visible leading-none"
            >
              <span className="inline-flex">
                {"How".split("").map((char, i) => (
                  <motion.span
                    key={`how-${i}`}
                    aria-hidden="true"
                    whileHover={shouldReduceMotion ? undefined : {
                      y: -10,
                      scale: 1.2,
                      rotate: -4,
                      color: "#fca859",
                      transition: { type: "spring", stiffness: 450, damping: 14 }
                    }}
                    className="inline-block cursor-pointer transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="inline-flex text-amber-orange pixel-text-shadow">
                {"Stackcamp".split("").map((char, i) => (
                  <motion.span
                    key={`sc-${i}`}
                    aria-hidden="true"
                    whileHover={shouldReduceMotion ? undefined : {
                      y: -12,
                      scale: 1.25,
                      rotate: i % 2 === 0 ? 5 : -5,
                      color: "#fff59d",
                      transition: { type: "spring", stiffness: 450, damping: 14 }
                    }}
                    className="inline-block cursor-pointer transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <span className="inline-flex">
                {"works".split("").map((char, i) => (
                  <motion.span
                    key={`works-${i}`}
                    aria-hidden="true"
                    whileHover={shouldReduceMotion ? undefined : {
                      y: -10,
                      scale: 1.2,
                      rotate: 4,
                      color: "#fca859",
                      transition: { type: "spring", stiffness: 450, damping: 14 }
                    }}
                    className="inline-block cursor-pointer transition-colors"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h2>

            <p className="text-sm leading-relaxed text-sage-text md:text-base font-mono max-w-xl mx-auto">
              Bring what you are building, meet creators who respect the craft, and make steady progress without the noise of algorithms.
            </p>
          </div>

          {/* 3D Isometric Step Cards Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <Step3DCard key={step.number} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="roadmap" className="relative z-10 border-t-4 border-black bg-cocoa-950/85 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="font-pixel text-[10px] uppercase tracking-widest text-amber-orange">
              Development trail
            </span>
            <h2 className="mt-4 font-display text-5xl font-bold text-warm-beige md:text-6xl">
              Camp roadmap
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-sage-text">
              Stackcamp is being built in public. This trail map separates what works today from what the team is preparing next.
            </p>
          </div>

          <div className="space-y-4 lg:col-span-8">
            {roadmap.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`flex gap-5 border-4 border-black p-5 ${
                    item.active ? "bg-cocoa-800 retro-shadow-orange" : "bg-cocoa-900 retro-shadow"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-black bg-cocoa-950 text-amber-orange">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-3xl font-bold text-warm-beige">{item.title}</h3>
                      <span className={`border border-black px-2 py-1 font-pixel text-[8px] ${
                        item.active ? "bg-amber-orange text-cocoa-950" : "bg-cocoa-950 text-sage-text"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-sage-text">{item.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="faq" className="relative z-10 border-t-4 border-black bg-cocoa-900/80 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12 text-center">
            <MessageSquare className="mx-auto mb-4 h-7 w-7 text-amber-orange" />
            <h2 className="font-display text-5xl font-bold text-warm-beige md:text-6xl">
              Camp questions
            </h2>
          </div>

          <div className="space-y-4">
            {questions.map((item) => (
              <details key={item.question} className="group border-4 border-black bg-cocoa-950 retro-shadow">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-warm-beige">
                  <span className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4 shrink-0 text-amber-orange" />
                    {item.question}
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-amber-orange transition-transform group-open:rotate-180" />
                </summary>
                <p className="border-t-2 border-black px-5 py-4 text-sm leading-relaxed text-sage-text">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
