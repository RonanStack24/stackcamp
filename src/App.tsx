/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import Navbar, { PixelFoxLogo } from "./components/Navbar";
import Hero from "./components/Hero";
import Clearing from "./components/Clearing";
import WhatIsComing from "./components/WhatIsComing";
import Founder from "./components/Founder";
import PixelForestBackground from "./components/PixelForestBackground";
import JoinCampModal from "./components/JoinCampModal";

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const handleOpenJoin = () => setIsJoinModalOpen(true);
  const handleCloseJoin = () => setIsJoinModalOpen(false);

  const scrollHandler = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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

      {/* 4. Section II: What's Coming Soon & Sandbox playgrounds */}
      <WhatIsComing />

      {/* 5. Section III: Meet the Founder */}
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
  );
}
