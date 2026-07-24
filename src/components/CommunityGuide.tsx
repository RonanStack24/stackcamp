import { motion } from "motion/react";
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
} from "lucide-react";

const steps = [
  {
    icon: BadgeCheck,
    number: "01",
    title: "Claim your cabin key",
    description:
      "Join the camp, choose your builder type, and create a passport that shows what you make and what you are learning.",
  },
  {
    icon: Hammer,
    number: "02",
    title: "Share the work",
    description:
      "Post projects and small build logs. Progress, experiments, and lessons learned are all welcome around the fire.",
  },
  {
    icon: Users,
    number: "03",
    title: "Find your crew",
    description:
      "Enter a specialist cabin, ask for feedback, or team up with another camper without the pressure of a noisy feed.",
  },
];

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
  return (
    <>
      <section className="relative z-10 border-t-4 border-black bg-cocoa-900/80 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-14 max-w-2xl space-y-4 text-center">
            <span className="font-pixel text-[10px] uppercase tracking-widest text-amber-orange">
              Camper field guide
            </span>
            <h2 className="font-display text-5xl font-bold text-warm-beige md:text-6xl">
              How Stackcamp works
            </h2>
            <p className="text-sm leading-relaxed text-sage-text md:text-base">
              Bring what you are building, meet people who care about the craft, and make steady progress at your own pace.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.1 }}
                  className="relative border-4 border-black bg-cocoa-950 p-6 retro-shadow"
                >
                  <span className="absolute right-4 top-4 font-display text-4xl text-cocoa-700">
                    {step.number}
                  </span>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center border-2 border-black bg-logo-brown text-amber-orange">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 font-display text-3xl font-bold text-warm-beige">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-sage-text">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
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
