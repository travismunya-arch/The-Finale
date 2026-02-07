import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import waxSeal from "@/assets/wax_seal.png";
import paperPlaneImg from "@/assets/paper_plane.png";
import butterflyImg from "@/assets/butterfly.png";

interface EnvelopeProps {
  onLightUp?: () => void;
  isDarkRoom?: boolean;
}

export default function Envelope({ onLightUp, isDarkRoom = false }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [planeFlown, setPlaneFlown] = useState(false);
  const [butterflies, setButterflies] = useState<{ id: number; x: number; scale: number; rotate: number }[]>([]);

  useEffect(() => {
    if (isOpen && isDarkRoom && !planeFlown) {
        // Generate random butterflies
        const newButterflies = Array.from({ length: 15 }).map((_, i) => ({
            id: Date.now() + i,
            x: (Math.random() - 0.5) * 300, 
            scale: Math.random() * 0.4 + 0.2, 
            rotate: Math.random() * 60 - 30, 
        }));
        setButterflies(newButterflies);

        // Trigger light up after animation (Plane flies for 2.5s)
        const timer = setTimeout(() => {
            setPlaneFlown(true);
            if (onLightUp) onLightUp();
        }, 2500); 
        return () => clearTimeout(timer);
    } else if (!isOpen) {
        setButterflies([]);
    }
  }, [isOpen, isDarkRoom, planeFlown, onLightUp]);

  return (
    <div className={`flex flex-col items-center justify-center py-10 relative transition-all duration-1000 ${isDarkRoom ? "z-[60]" : ""}`}>
      <h3 className={`text-sm font-bold tracking-[0.2em] mb-8 uppercase transition-colors duration-1000 ${isDarkRoom ? "text-white/80" : "text-[#E5B5A6]"}`}>
        Envelope Reveal
      </h3>

      <div className="relative perspective-1000 w-[300px] h-[200px] cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
        
        {/* 1. Flying Butterflies (Explosion on Open) */}
        <AnimatePresence>
            {isOpen && isDarkRoom && !planeFlown && butterflies.map((b, i) => (
                <motion.img
                    key={b.id}
                    src={butterflyImg}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 50 }}
                    animate={{ 
                        opacity: [0, 1, 1, 0],
                        scale: b.scale,
                        x: b.x,
                        y: -400 - Math.random() * 200, // Fly UP high
                        rotate: b.rotate + (Math.random() > 0.5 ? 45 : -45)
                    }}
                    transition={{ 
                        duration: 3 + Math.random(), 
                        ease: "easeOut",
                        delay: i * 0.05 
                    }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[65] pointer-events-none w-12 h-12 object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                />
            ))}
        </AnimatePresence>

        {/* 2. Enhanced Paper Plane (Acrobatic Flight) */}
        <AnimatePresence>
            {isOpen && isDarkRoom && !planeFlown && (
                <motion.div
                    initial={{ opacity: 0, scale: 0, x: 0, y: 50 }}
                    animate={{ 
                        opacity: [0, 1, 1, 1],
                        scale: [0.1, 0.5, 0.8, 1.2, 0], // Scale up then vanish on impact
                        // Complex Flight Path: Loop-de-loop -> Up to Bulb
                        x: [0, -100, 0, 100, 0, 0], 
                        y: [0, -50, -150, -50, -200, -600], // Final value targets the bulb area
                        rotate: [0, -90, -180, -270, -360, -360] // Spin
                    }}
                    transition={{ 
                        duration: 2.5, 
                        ease: "easeInOut",
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                    }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[70] w-24 h-24 pointer-events-none"
                >
                    <img 
                        src={paperPlaneImg} 
                        className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                        alt="Flying Plane"
                    />
                </motion.div>
            )}
        </AnimatePresence>

        {/* The Letter inside */}
        <motion.div
          initial={{ y: 0, opacity: 0 }}
          animate={isOpen ? { y: -120, zIndex: 5, opacity: 1 } : { y: 0, zIndex: 0, opacity: 0 }}
          transition={{ delay: isOpen ? 0.3 : 0, duration: 0.5 }}
          className="absolute top-2 left-2 right-2 bottom-2 bg-white p-4 shadow-sm flex items-center justify-center text-center font-hand text-xl text-foreground rotate-1 border border-gray-100"
        >
          <p>You make my heart smile! 💖</p>
        </motion.div>

        {/* Envelope Back */}
        <div className="absolute inset-0 bg-[#F8F1F1] rounded-lg shadow-md border-2 border-[#E5DFDF]" />

        {/* Envelope Front (Bottom flap) */}
        <div className="absolute bottom-0 w-full h-1/2 bg-[#FFF8F8] rounded-b-lg z-20 clip-path-polygon-[0_0,50%_40%,100%_0,100%_100%,0_100%]" style={{ clipPath: "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)" }} />

        {/* Envelope Flap (Top) */}
        <motion.div
          className="absolute top-0 w-full h-1/2 bg-[#F2E8E8] rounded-t-lg origin-top z-30 shadow-sm border-t border-[#E5DFDF]"
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 30 }}
          transition={{ duration: 0.6 }}
          style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}
        />
        
        {/* Seal Button */}
        <motion.div 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
        >
            <div className="w-16 h-16">
                <img src={waxSeal} alt="Seal" className="w-full h-full object-contain drop-shadow-md" />
            </div>
        </motion.div>
      </div>

      {/* Control Buttons */}
      <div className="mt-24 flex gap-4 z-10">
        <button 
            onClick={() => setIsOpen(true)}
            disabled={isOpen}
            className={`px-6 py-2 rounded-full border text-xs font-bold tracking-widest transition-colors uppercase ${isOpen ? 'opacity-50 cursor-not-allowed text-gray-400 border-gray-300' : isDarkRoom ? 'bg-white text-[#5C2B2B] hover:bg-white/90 border-transparent shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'bg-white text-[#D4A5A5] border-primary/30 hover:bg-primary/5'}`}
        >
            Open Me
        </button>
        <button 
            onClick={() => setIsOpen(false)}
            disabled={!isOpen}
            className={`px-6 py-2 rounded-full border border-primary/30 text-xs font-bold tracking-widest bg-[#FFB6C1] text-white transition-colors uppercase shadow-sm ${!isOpen ? 'opacity-50 cursor-not-allowed bg-gray-300 border-gray-300' : 'hover:bg-[#ffcfd6]'}`}
        >
            Wax Seal
        </button>
      </div>
    </div>
  );
}
