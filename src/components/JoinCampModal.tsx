import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Sparkles, Flame, CheckCircle, ShieldCheck } from "lucide-react";
import { PixelFoxLogo } from "./Navbar";

interface JoinCampModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinCampModal({ isOpen, onClose }: JoinCampModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [camperType, setCamperType] = useState("C# Craftsman");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setEmail("");
    setName("");
    setIsSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="join-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop screen filter designed like an 8-bit curtain */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleReset}
            className="absolute inset-0 bg-black/85 backdrop-blur-xs"
          />

          {/* Modal Container in double-pixel border casing */}
          <motion.div id="join-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md bg-cocoa-900 border-4 border-black font-mono shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8 overflow-hidden z-20"
          >
            
            {/* Top Close Button styled as retro X button */}
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 p-1 bg-cocoa-950 border-2 border-black text-sage-text hover:text-amber-orange hover:border-amber-orange transition-colors focus:outline-none cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div id="modal-form-gate"
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-logo-brown border-2 border-black flex items-center justify-center rounded">
                        <PixelFoxLogo />
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-pixel tracking-widest uppercase text-amber-orange leading-none block">
                          CAMPSITE GATEWAY
                        </span>
                        <h3 className="font-display text-4xl font-bold text-warm-beige leading-none">
                          Register Entry
                        </h3>
                      </div>
                    </div>
                    <p className="text-sage-text text-xs leading-relaxed font-mono">
                      Stitch your name and email correspondence address to claim cabin keys. Registered users unlock private updates from general developer RonanStack24 inside the clearing.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="font-pixel text-[9px] text-[#9FB1A4] uppercase font-bold block">CAMPER HANDLE</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value.slice(0, 20))}
                        placeholder="e.g. RangerFox"
                        className="w-full bg-cocoa-950 border-2 border-black focus:border-amber-orange p-2.5 text-sm font-mono text-[#EADEC9] outline-none"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="font-pixel text-[9px] text-[#9FB1A4] uppercase font-bold block">CORRESPONDENCE EMAIL</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your-alias@camp.com"
                        className="w-full bg-cocoa-950 border-2 border-black focus:border-amber-orange p-2.5 text-sm font-mono text-[#EADEC9] outline-none"
                      />
                    </div>

                    {/* Cabin preference */}
                    <div className="space-y-1">
                      <label className="font-pixel text-[9px] text-[#9FB1A4] uppercase font-bold block">CABIN RESIDENCY THEME</label>
                      <select
                        value={camperType}
                        onChange={(e) => setCamperType(e.target.value)}
                        className="w-full bg-cocoa-950 border-2 border-black focus:border-amber-orange p-2.5 text-sm font-mono text-[#EADEC9] outline-none cursor-pointer"
                      >
                        <option value="C# Craftsman">C# / .NET Outpost</option>
                        <option value="React Wilderness Ranger">React Wilderness clearing</option>
                        <option value="Low-Hustle Dev">Low-Hustle Indie Cabin</option>
                        <option value="Enthusiastically Curious">General Woodland Camper</option>
                      </select>
                    </div>

                    {/* Terms / Info */}
                    <div className="flex items-start gap-2 pt-2 text-[11px] text-sage-text leading-snug font-mono">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Zero trackers. Instant manual newsletter keys. Unsubscribe in an individual click anytime.</span>
                    </div>

                    {/* Register button */}
                    <button
                      type="submit"
                      className="font-pixel text-[10px] w-full mt-4 py-4 bg-amber-orange hover:bg-[#ffa16c] text-cocoa-950 font-bold pixel-border retro-shadow transition-all active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer focus:outline-none"
                    >
                      <Mail className="w-4 h-4 text-cocoa-950" /> Register Camp ID
                    </button>

                  </form>
                </motion.div>
              ) : (
                <motion.div id="modal-success-gate"
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-4 font-mono"
                >
                  <div className="flex justify-center">
                    <div className="w-16 h-16 bg-cocoa-950 border-4 border-black flex items-center justify-center text-emerald-400">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-display text-4xl font-bold text-warm-beige">
                      Passport Valid!
                    </h4>
                    <p className="text-sm text-sage-text leading-relaxed max-w-xs mx-auto">
                      Thank you, <strong className="text-amber-orange font-semibold">{name}</strong>. Your cabin key to the <strong className="text-warm-beige">{camperType}</strong> has been stamped and filed.
                    </p>
                  </div>

                  {/* Stamp Card */}
                  <div className="p-4 bg-cocoa-950 border-2 border-black text-xs text-sage-text leading-relaxed text-left">
                    <div className="flex items-center gap-1.5 text-amber-orange font-bold text-[10px] font-pixel mb-1.5 uppercase">
                      <Sparkles className="w-3.5 h-3.5" /> REGISTRY SEALED
                    </div>
                    <span>Campsite Dispatch coordinates:</span>
                    <p className="text-warm-beige font-sans font-extrabold mt-0.5 truncate">{email}</p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-cocoa-800 hover:bg-cocoa-700 border-2 border-black text-warm-beige text-xs font-mono"
                  >
                    Return to Campsite
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
