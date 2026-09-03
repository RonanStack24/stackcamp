/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar, { PixelFoxLogo } from "./components/Navbar";
import Hero from "./components/Hero";
import Clearing from "./components/Clearing";
import WhatIsComing from "./components/WhatIsComing";
import Founder from "./components/Founder";
import PixelForestBackground from "./components/PixelForestBackground";
import JoinCampModal from "./components/JoinCampModal";
import CommunityGuide from "./components/CommunityGuide";

function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cocoa-950 font-mono"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="transform scale-150 mb-4">
          <PixelFoxLogo />
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="font-pixel text-[11px] text-amber-orange tracking-widest uppercase animate-pulse">
            Booting StackOS...
          </span>
          <div className="w-48 h-3 border-2 border-black bg-cocoa-900 p-0.5 retro-shadow-sm">
            <div 
              className="h-full bg-amber-orange transition-all duration-150 ease-out" 
              style={{ width: `${Math.min(progress, 100)}%` }} 
            />
          </div>
          <span className="text-[10px] text-sage-text">
            {Math.min(progress, 100)}% LOADED
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

    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    
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
        {isLoading && <LoadingScreen key="loading-screen" />}
      </AnimatePresence>

      <AnimatePresence>
        {isOffline && <OfflineScreen key="offline-screen" />}
      </AnimatePresence>

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
