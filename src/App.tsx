/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Navbar, { PixelFoxLogo } from "./components/Navbar";
import Hero from "./components/Hero";
import Clearing from "./components/Clearing";
import WhatIsComing from "./components/WhatIsComing";
import Founder from "./components/Founder";
import PixelForestBackground from "./components/PixelForestBackground";
import JoinCampModal from "./components/JoinCampModal";
import CommunityGuide from "./components/CommunityGuide";
import CampfireCursor from "./components/CampfireCursor";

interface SparkClick {
  id: number;
  x: number;
  y: number;
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [clicks, setClicks] = useState<SparkClick[]>([]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setProgress(100);
      const timer = setTimeout(onComplete, 200);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 350);
          return 100;
        }
        return Math.min(100, p + Math.floor(Math.random() * 8) + 6);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, onComplete]);

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const newSpark: SparkClick = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
    };
    setClicks((prev) => [...prev.slice(-6), newSpark]);
    setProgress((p) => {
      const next = Math.min(100, p + 7);
      if (next >= 100) {
        setTimeout(onComplete, 350);
      }
      return next;
    });
  };

  const getStatusText = (p: number) => {
    if (p < 25) return "🌲 Walking along the pine trail...";
    if (p < 50) return "🪵 Gathering dry woodland kindling...";
    if (p < 75) return "🔥 Striking flint to ignite the campfire...";
    if (p < 95) return "☕ Brewing fresh cocoa for the clearing...";
    return "✨ Clearing unlocked! Welcome camper.";
  };

  const filledBlocks = Math.round((progress / 100) * 10);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={handleScreenClick}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#120a09] font-mono select-none overflow-hidden cursor-pointer"
    >
      {/* Warm Ambient Hearth Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(234,127,67,0.18)_0%,_transparent_70%)] pointer-events-none" />

      {/* Floating Ambient Firefly Sparks */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={`firefly-${i}`}
              initial={{
                x: `${(i * 7 + 4) % 100}vw`,
                y: "110vh",
                opacity: 0,
                scale: Math.random() * 0.5 + 0.6,
              }}
              animate={{
                y: "-10vh",
                opacity: [0, 0.9, 0],
                x: [`${(i * 7 + 4) % 100}vw`, `${((i * 7 + 4) % 100) + (i % 2 === 0 ? 3 : -3)}vw`],
              }}
              transition={{
                duration: 6 + (i % 4) * 2,
                repeat: Infinity,
                delay: (i * 0.4) % 5,
                ease: "linear",
              }}
              className="absolute w-1.5 h-1.5 bg-[#fff59d] rounded-full filter blur-[0.5px]"
            />
          ))}
        </div>
      )}

      {/* Interactive Click Sparks */}
      <AnimatePresence>
        {clicks.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 1, scale: 0.5, x: c.x, y: c.y }}
            animate={{ opacity: 0, scale: 1.6, y: c.y - 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed pointer-events-none z-50 text-amber-orange font-pixel text-xs font-bold -translate-x-1/2 -translate-y-1/2 flex items-center gap-1"
          >
            <span>✨</span>
            <span className="text-[9px] bg-black/80 px-1 border border-amber-orange">+7% STOKE!</span>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Central Retro Loading Terminal Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-4 p-6 sm:p-8 bg-cocoa-950 border-4 border-black retro-shadow text-center flex flex-col items-center gap-6">
        
        {/* Top retro badge header */}
        <div className="flex items-center justify-between w-full border-b-2 border-black/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-amber-orange animate-ping rounded-full" />
            <span className="font-pixel text-[9px] text-amber-orange tracking-wider uppercase">
              STACKCAMP • BOOT SEQUENCE
            </span>
          </div>
          <span className="font-pixel text-[9px] text-sage-text opacity-70">
            v1.0.4
          </span>
        </div>

        {/* Centerpiece: Animated Pixel Campfire & Mochi Fox Vignette */}
        <div className="relative my-2 w-32 h-24 flex items-center justify-center">
          {/* Pulsing hearth glow */}
          <motion.div
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-amber-orange/30 rounded-full filter blur-md"
          />

          <svg 
            className="w-28 h-28 crisp-pixel relative z-10 select-none overflow-visible" 
            viewBox="0 0 32 32" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Campfire Base Logs */}
            <rect x="5" y="24" width="9" height="2" fill="#201311" />
            <rect x="6" y="23" width="7" height="1" fill="#5c3826" />
            <rect x="7" y="22" width="5" height="1" fill="#754c38" />

            {/* Rising Animated Flame (Grows with progress!) */}
            <motion.g
              animate={shouldReduceMotion ? undefined : {
                scaleY: [1, 1.2, 0.94, 1.15, 1],
                scaleX: [1, 0.96, 1.04, 0.98, 1],
              }}
              transition={{ duration: 0.75, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "9px 24px" }}
            >
              <rect x="7" y="17" width="5" height="5" fill="#ea7f43" />
              <rect x="8" y="14" width="3" height="4" fill="#ea7f43" />
              <rect x="8" y="17" width="3" height="3" fill="#ffb74d" />
              <rect x="9" y="15" width="1" height="4" fill="#fff59d" />
              <rect x="9" y="18" width="1" height="2" fill="#ffffff" />
            </motion.g>

            {/* Rising Sparks */}
            {!shouldReduceMotion && (
              <g>
                <motion.rect
                  animate={{ y: [0, -8, -14], opacity: [0, 1, 0], x: [0, -1, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                  x="8" y="14" width="1" height="1" fill="#fca859"
                />
                <motion.rect
                  animate={{ y: [0, -10, -16], opacity: [0, 1, 0], x: [0, 1, -1] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: 0.3, ease: "easeOut" }}
                  x="10" y="13" width="1" height="1" fill="#ffa16c"
                />
              </g>
            )}

            {/* Mochi the Fox Sitting Right, warming paws */}
            {/* Animated Tail */}
            <motion.g
              animate={shouldReduceMotion ? undefined : { rotate: [-6, 16, -6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "24px 22px" }}
            >
              <rect x="23" y="18" width="4" height="4" fill="#ea7f43" />
              <rect x="24" y="16" width="3" height="3" fill="#ea7f43" />
              <rect x="25" y="15" width="2" height="2" fill="#ffffff" />
            </motion.g>

            {/* Body & Head */}
            <motion.g
              animate={shouldReduceMotion ? undefined : { y: [0, -1.2, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Ears */}
              <rect x="16" y="9" width="2" height="3" fill="#ea7f43" />
              <rect x="21" y="9" width="2" height="3" fill="#ea7f43" />
              <rect x="17" y="10" width="1" height="2" fill="#ffffff" />
              <rect x="21" y="10" width="1" height="2" fill="#ffffff" />

              {/* Head */}
              <rect x="15" y="12" width="9" height="3" fill="#ea7f43" />
              <rect x="14" y="14" width="3" height="2" fill="#eadec9" />
              <rect x="22" y="14" width="3" height="2" fill="#eadec9" />
              <rect x="16" y="15" width="7" height="1" fill="#eadec9" />
              <rect x="17" y="13" width="1" height="1" fill="#1b1210" />
              <rect x="21" y="13" width="1" height="1" fill="#1b1210" />
              <rect x="19" y="15" width="1" height="1" fill="#1b1210" />

              {/* Sweater */}
              <rect x="16" y="16" width="7" height="6" fill="#d8923a" />
              <rect x="17" y="16" width="5" height="1" fill="#fffbcf" />
              <rect x="18" y="18" width="3" height="3" fill="#3f2317" />

              {/* Steaming Cocoa Mug */}
              <rect x="13" y="19" width="2" height="3" fill="#ffffff" />
              <rect x="12" y="20" width="1" height="1" fill="#ffffff" />
              <motion.rect
                animate={shouldReduceMotion ? undefined : { y: [0, -3, -6], opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                x="13" y="18" width="1" height="1" fill="#eadec9"
              />
            </motion.g>
          </svg>
        </div>

        {/* Progressive Campsite Story Message */}
        <div className="w-full bg-cocoa-900 border-2 border-black p-3 retro-shadow-sm min-h-[48px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={getStatusText(progress)}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-xs sm:text-sm text-warm-beige font-mono font-medium"
            >
              {getStatusText(progress)}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* 10-Block Segmented 8-Bit Progress Bar */}
        <div className="w-full space-y-2">
          <div className="flex gap-1.5 w-full bg-cocoa-900 border-2 border-black p-1.5 retro-shadow-sm">
            {Array.from({ length: 10 }).map((_, idx) => {
              const isFilled = idx < filledBlocks;
              return (
                <div
                  key={idx}
                  className={`flex-1 h-3.5 border border-black transition-colors duration-200 ${
                    isFilled 
                      ? "bg-amber-orange shadow-[inset_0_2px_0_rgba(255,255,255,0.4)]" 
                      : "bg-cocoa-950/70"
                  }`}
                />
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-sage-text">CAMP FIRE LEVEL</span>
            <span className="font-pixel text-amber-orange tracking-wider text-xs">
              {progress}%
            </span>
          </div>
        </div>

        {/* Interactive Stoke Hint */}
        <div className="pt-1">
          <span className="inline-flex items-center gap-1 text-[9px] font-pixel text-sage-text/80 tracking-tight animate-pulse bg-cocoa-900/60 px-2 py-1 border border-black/60 rounded">
            <span>🪵</span> CLICK ANYWHERE TO STOKE THE FIRE (+7%) <span>🔥</span>
          </span>
        </div>

      </div>
    </motion.div>
  );
}

function OfflineScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-cocoa-950/95 backdrop-blur-sm font-mono border-8 border-red-500/20"
    >
      <div className="flex flex-col items-center gap-6 max-w-lg text-center px-6">
        <div className="w-24 h-24 bg-red-950/50 border-4 border-red-500 flex items-center justify-center rounded-full animate-pulse">
          <span className="text-4xl">🔌</span>
        </div>
        
        <div className="space-y-4">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-red-400 pixel-text-shadow">
            CONNECTION LOST
          </h2>
          <p className="text-warm-beige text-sm md:text-base leading-relaxed">
            Your campfire went out! The connection to the outpost has been interrupted. Please check your network to rejoin the camp.
          </p>
        </div>

        <div className="px-4 py-2 border-2 border-red-500 bg-red-950/30 text-red-400 font-pixel text-[10px] uppercase flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Waiting for signal...
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Network listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Fallback safety timeout
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleOpenJoin = () => setIsJoinModalOpen(true);
  const handleCloseJoin = () => setIsJoinModalOpen(false);

  const scrollHandler = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen 
            key="loading-screen" 
            onComplete={() => setIsLoading(false)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOffline && <OfflineScreen key="offline-screen" />}
      </AnimatePresence>

      {/* Cozy Pixel Torch & Ember Cursor */}
      <CampfireCursor />

      <div className="relative min-h-screen bg-cocoa-950/75 text-warm-beige selection:bg-amber-orange/30 selection:text-amber-orange font-mono antialiased overflow-x-hidden">
      
      {/* Dynamic Animated Pixel Woods Forest Background with Fireflies */}
      <PixelForestBackground />

      {/* 1. Dynamic Fixed Sticky Navbar */}
      <Navbar onJoinClick={handleOpenJoin} />

      {/* 2. Interactive Campfire Hero Section */}
      <Hero 
        onExploreClick={() => scrollHandler("about")} 
        onComingSoonClick={() => scrollHandler("vision")} 
      />

      {/* 3. Section I: Step Into The Clearing */}
      <Clearing />

      {/* 4. A simple onboarding guide and public product roadmap */}
      <CommunityGuide />

      {/* 5. Section II: What's Coming Soon & Sandbox playgrounds */}
      <WhatIsComing />

      {/* 6. Section III: Meet the Founder */}
      <Founder />

      {/* 6. Footer matches exactly: Stackcamp Left, Links Right with 8-bit theme */}
      <footer id="footer-root" className="bg-cocoa-950/80 border-t-4 border-black py-12 text-sage-text relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright description left */}
          <div className="space-y-1 text-center md:text-left select-none">
            <button
              onClick={() => scrollHandler("home")}
              className="font-pixel text-[13px] font-bold text-warm-beige tracking-tight flex items-center justify-center md:justify-start gap-3 hover:text-amber-orange transition-colors cursor-pointer focus:outline-none"
            >
              <PixelFoxLogo /> Stackcamp
            </button>
            <p className="text-xs text-sage-text leading-relaxed font-mono mt-1">
              © 2024-2026 Stackcamp. Built with warmth and patience by <span className="text-amber-orange font-medium">RonanStack24</span>.
            </p>
          </div>

          {/* Core social/GitHub link vectors right */}
          <div id="footer-links-row" className="flex items-center gap-6 text-sm font-medium">
            <a
              href="https://github.com/RonanStack24"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-orange transition-colors flex items-center gap-1 cursor-pointer focus:outline-none font-mono"
            >
              [GITHUB]
            </a>
            <a
              href="https://www.facebook.com/ronan.antoque"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-orange transition-colors flex items-center gap-1 cursor-pointer focus:outline-none font-mono"
            >
              [FACEBOOK]
            </a>
          </div>
        </div>
      </footer>

      {/* 8. Floating Sliding Campaign Modal Dialog */}
      <JoinCampModal isOpen={isJoinModalOpen} onClose={handleCloseJoin} />
      
    </div>
    </>
  );
}
