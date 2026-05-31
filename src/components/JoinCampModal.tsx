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
  const [camperType, setCamperType] = useState("Creators Studio");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setIsSubmitting(true);
      setErrorMessage("");

      try {
        // If we are developing locally, use localhost:8000. 
        // If we are on InfinityFree, use the relative path!
        const apiUrl = import.meta.env.DEV 
          ? "http://localhost:8000/backend/api.php" 
          : "/backend/api.php";

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            camperType,
          }),
        });

        const data = await response.json();

        if (data.status === "success") {
          setIsSubmitted(true);
        } else {
          setErrorMessage(data.message || "Failed to register.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrorMessage("Network error. Make sure your PHP server is running!");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setEmail("");
    setName("");
    setIsSubmitted(false);
    setIsSubmitting(false);
    setErrorMessage("");
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
            className="relative w-full max-w-md max-h-[95vh] overflow-y-auto bg-cocoa-900 border-4 border-black font-mono shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-5 md:p-8 z-20"
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
                        <span className="text-[9px] sm:text-[10px] font-pixel tracking-widest uppercase text-amber-orange leading-none block">
                          STACKCAMP REGISTRY
                        </span>
                        <h3 className="font-display text-3xl sm:text-4xl font-bold text-warm-beige leading-none">
                          Claim Your Cabin
                        </h3>
                      </div>
                    </div>
                    <p className="text-sage-text text-xs leading-relaxed font-mono">
                      Join a peaceful digital campsite for developers, engineers, and creators. Secure your keys to leave the social media noise behind, connect with independent builders, and receive private updates from RonanStack24.
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
                        <option value="Creators Studio">Creators Studio</option>
                        <option value="Builders Workshop">Builders Workshop</option>
                        <option value="Innovators Den">Innovators Den</option>
                        <option value="Student Lounge">Student Lounge</option>
                        <option value="General Camper">General Woodland Camper</option>
                      </select>
                      <p className="text-[10px] text-sage-text font-mono mt-1 italic opacity-80">
                        {camperType === "Creators Studio" && "For UI/UX designers, artists, and content creators."}
                        {camperType === "Builders Workshop" && "For software engineers and full-stack coders."}
                        {camperType === "Innovators Den" && "For founders, product managers, and visionaries."}
                        {camperType === "Student Lounge" && "For beginners and students starting their journey."}
                        {camperType === "General Camper" && "For anyone who just wants to hang out by the fire."}
                      </p>
                    </div>

                    {/* Terms / Info */}
                    <div className="flex items-start gap-2 pt-2 text-[11px] text-sage-text leading-snug font-mono">
                      <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>Zero trackers. Instant manual newsletter keys. Unsubscribe in an individual click anytime.</span>
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                      <div className="p-3 bg-red-900/30 border border-red-500 text-red-300 text-[10px] font-pixel leading-relaxed">
                        ⚠️ {errorMessage}
                      </div>
                    )}

                    {/* Register button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`font-pixel text-[10px] w-full mt-4 py-4 bg-amber-orange text-cocoa-950 font-bold pixel-border retro-shadow transition-all flex justify-center items-center gap-2 ${
                        isSubmitting 
                          ? "opacity-70 cursor-not-allowed" 
                          : "hover:bg-[#ffa16c] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer focus:outline-none"
                      }`}
                    >
                      <Mail className="w-4 h-4 text-cocoa-950" /> 
                      {isSubmitting ? "TRANSMITTING..." : "Register Camp ID"}
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
                    <h4 className="font-display text-3xl sm:text-4xl font-bold text-warm-beige">
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
