import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, Menu, X, Flame, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";


interface NavbarProps {
  onJoinClick: () => void;
}

// Crisp Pixel Fox SVG Logo Component
export function PixelFoxLogo() {
  return (
    <svg 
      className="w-10 h-10 crisp-pixel shadow-md select-none rounded-md" 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Dark Green Shield Badge Border */}
      <path d="M10,1 h12 M7,2 h18 M5,3 h22 M4,4 h24 M3,5 h26 M2,6 h28 M1,7 h30 M1,8 h30 M1,9 h30 M1,10 h30 M1,11 h30 M1,12 h30 M1,13 h30 M1,14 h30 M1,15 h30 M1,16 h30 M1,17 h30 M1,18 h30 M1,19 h30 M1,20 h30 M1,21 h30 M1,22 h30 M1,23 h30 M1,24 h30 M1,25 h30 M1,26 h30 M2,27 h28 M3,28 h26 M5,29 h22 M9,30 h14" fill="#365D39" />
      
      {/* Inner Deep Espresso Chocolate Background */}
      <path d="M10,2 h12 M8,3 h16 M6,4 h20 M5,5 h22 M4,6 h24 M3,7 h26 M2,8 h28 M2,9 h28 M2,10 h28 M2,11 h28 M2,12 h28 M2,13 h28 M2,14 h28 M2,15 h28 M2,16 h28 M2,17 h28 M2,18 h28 M2,19 h28 M2,20 h28 M2,21 h28 M2,22 h28 M2,23 h28 M2,24 h28 M2,25 h28 M3,26 h26 M5,27 h22 M7,28 h18 M11,29 h10" fill="#201311" />

      {/* Tiny Yellow Twinkles/Fireflies around */}
      <rect x="9" y="8" width="1" height="1" fill="#fff59d" />
      <rect x="23" y="10" width="1" height="1" fill="#fff59d" />
      <rect x="12" y="11" width="1" height="1" fill="#fff59d" />
      <rect x="11" y="14" width="1" height="1" fill="#fff59d" />

      {/* Campfire Left */}
      <rect x="7" y="21" width="3" height="1" fill="#754c38" />
      <rect x="5" y="20" width="1" height="2" fill="#5c3826" />
      <rect x="9" y="20" width="1" height="2" fill="#5c3826" />
      <rect x="6" y="17" width="3" height="3" fill="#ea7f43" />
      <rect x="7" y="15" width="1" height="4" fill="#ffb74d" />
      <rect x="6" y="16" width="1" height="2" fill="#e53935" />
      <rect x="8" y="16" width="1" height="2" fill="#e53935" />
      <rect x="7" y="18" width="1" height="1" fill="#ffffff" />

      {/* Camper Fox sitting Right */}
      <rect x="23" y="17" width="3" height="3" fill="#ea7f43" />
      <rect x="22" y="16" width="3" height="2" fill="#ea7f43" />
      <rect x="24" y="15" width="2" height="2" fill="#ffffff" />
      
      <rect x="15" y="7" width="1" height="2" fill="#ea7f43" />
      <rect x="19" y="7" width="1" height="2" fill="#ea7f43" />
      <rect x="16" y="8" width="1" height="1" fill="#ffffff" />
      <rect x="18" y="8" width="1" height="1" fill="#ffffff" />

      <rect x="14" y="9" width="7" height="3" fill="#ea7f43" />
      <rect x="13" y="11" width="2" height="2" fill="#eadec9" />
      <rect x="20" y="11" width="2" height="2" fill="#eadec9" />
      <rect x="15" y="12" width="5" height="1" fill="#eadec9" />
      <rect x="15" y="10" width="1" height="1" fill="#1b1210" />
      <rect x="19" y="10" width="1" height="1" fill="#1b1210" />
      <rect x="17" y="12" width="1" height="1" fill="#1b1210" />

      <rect x="14" y="13" width="7" height="6" fill="#d8923a" />
      <rect x="15" y="13" width="5" height="1" fill="#fffbcf" stroke="#d8923a" strokeWidth="0.5" />
      <rect x="16" y="15" width="3" height="3" fill="#3f2317" />

      {/* Grey Mini Laptop */}
      <rect x="12" y="16" width="4" height="2" fill="#9e9e9e" />
      <rect x="13" y="18" width="3" height="1" fill="#757575" />
      <rect x="14" y="17" width="1" height="1" fill="#fff176" />

      {/* STACKCAMP banner background block at the bottom */}
      <rect x="6" y="24" width="20" height="4" fill="#365D39" rx="1" />
      <text 
        x="16" 
        y="27.2" 
        fill="#fcfda1" 
        fontSize="3.1" 
        fontWeight="bold" 
        fontFamily="'Courier New', Courier, monospace"
        textAnchor="middle"
        letterSpacing="0.1"
      >
        STACKCAMP
      </text>
    </svg>
  );
}

export default function Navbar({ onJoinClick }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const sections = ["home", "about", "vision", "founder"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-30% 0px -30% 0px" }
      );
      observer.observe(el);
      return { el, observer };
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    // Add a slight delay to allow the mobile menu close animation to finish
    // so the browser's smooth scroll doesn't get interrupted or miscalculated.
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "vision", label: "Vision" },
    { id: "founder", label: "Founder" },
  ];

  return (
    <header
      id="navbar-root"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cocoa-900 border-b-4 border-black py-2 shadow-2xl"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          id="nav-logo"
          onClick={() => scrollToSection("home")}
          className="flex items-center gap-3 group cursor-pointer focus:outline-none"
        >
          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <PixelFoxLogo />
          </div>
          <span className="font-pixel text-[13px] md:text-[15px] font-bold tracking-tight text-warm-beige group-hover:text-amber-orange transition-colors">
            Stackcamp
          </span>
        </button>

        {/* Desktop Menu */}
        <nav id="nav-desktop" className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <button
              id={`nav-btn-${item.id}`}
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="relative px-3 py-1.5 font-display text-xl tracking-wide transition-all hover:text-amber-orange hover:bg-cocoa-950/50 rounded-md focus:outline-none cursor-pointer"
              style={{
                color: activeSection === item.id ? "#ea7f43" : "#eadec9",
              }}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.span
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 w-full h-[3px] bg-amber-orange"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Theme Toggle and CTA Button Desktop */}
        <div id="nav-actions-desktop" className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 border-2 border-black bg-cocoa-900 text-amber-orange hover:bg-cocoa-800 retro-shadow-sm transition-all focus:outline-none cursor-pointer"
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'dark' ? 'Sakura Morning' : 'Night Forest'} Camp`}
          >
            {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            id="join-btn-desktop"
            onClick={onJoinClick}
            className="font-pixel text-[11px] px-4 py-2 bg-amber-orange hover:bg-[#ffa16c] text-cocoa-950 font-extrabold pixel-border retro-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer focus:outline-none"
          >
            Claim Spot!
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          id="nav-toggle-mobile"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 bg-cocoa-800 border-2 border-black rounded text-warm-beige hover:border-amber-orange focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="nav-drawer-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-cocoa-900 border-b-4 border-black"
          >
            <div className="px-6 py-4 flex flex-col gap-2 font-display text-2xl">
              {navItems.map((item) => (
                <button
                  id={`nav-mobile-btn-${item.id}`}
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left py-2 border-b-2 border-cocoa-800 flex items-center gap-3 transition-colors focus:outline-none ${
                    activeSection === item.id ? "text-amber-orange" : "text-warm-beige"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={toggleTheme}
                  className="flex-1 py-3 font-pixel text-[10px] bg-cocoa-800 text-amber-orange border-2 border-black retro-shadow text-center active:translate-x-1 active:translate-y-1 active:shadow-none flex justify-center items-center gap-2"
                >
                  {theme === "dark" ? (
                    <><Moon className="w-4 h-4" /> Light Mode</>
                  ) : (
                    <><Sun className="w-4 h-4" /> Dark Mode</>
                  )}
                </button>
                <button
                  id="join-btn-mobile"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onJoinClick();
                  }}
                  className="flex-1 py-3 font-pixel text-[10px] bg-amber-orange text-cocoa-950 font-bold pixel-border retro-shadow text-center active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  Join the Camp
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
