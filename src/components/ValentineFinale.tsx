import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Stars, Sparkles } from "lucide-react";
import chimeSfx from "@/assets/chime.mp3";

export default function ValentineFinale() {
  const [showText, setShowText] = useState(false);
  
  const playChime = () => {
    const audio = new Audio(chimeSfx);
    audio.volume = 0.6;
    audio.play().catch(e => console.error("Audio play failed", e));
  };

  // Trigger sound on mount
  useEffect(() => {
    const timer = setTimeout(() => {
        playChime();
        setShowText(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Confetti-like Hearts animation setup
  const particles = Array.from({ length: 80 });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 z-50 bg-[#2C1818] overflow-y-auto overflow-x-hidden text-center"
    >
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1818] via-[#5C2B2B] to-[#1A0F0F] z-0 animate-gradient-slow fixed"></div>

      {/* Floating Particles/Hearts */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-[#FFB6C1]"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: window.innerHeight + 100, 
            opacity: 0,
            scale: 0.5
          }}
          animate={{ 
            y: -150, 
            opacity: [0, 1, 0],
            rotate: Math.random() * 360,
            scale: Math.random() * 1.5 + 0.5
          }}
          transition={{ 
            duration: Math.random() * 6 + 6, 
            repeat: Infinity, 
            delay: Math.random() * 8,
            ease: "linear"
          }}
        >
          {i % 3 === 0 ? (
              <Heart fill="currentColor" size={Math.random() * 20 + 10} />
          ) : (
              <div className="w-2 h-2 rounded-full bg-white blur-[1px]" />
          )}
        </motion.div>
      ))}

      {/* Fireworks Effect (CSS-based or simplified motion divs) */}
      <div className="absolute inset-0 pointer-events-none fixed">
          {[...Array(5)].map((_, i) => (
              <motion.div
                 key={`firework-${i}`}
                 className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-transparent"
                 initial={{ x: 0, y: 0, scale: 0 }}
                 animate={{ 
                     x: (Math.random() - 0.5) * window.innerWidth, 
                     y: (Math.random() - 0.5) * window.innerHeight,
                     scale: [0, 20, 0],
                     opacity: [1, 0] 
                 }}
                 transition={{ duration: 2, repeat: Infinity, delay: i * 0.8 }}
              >
                  <div className="absolute inset-0 bg-gradient-radial from-[#FF69B4] to-transparent blur-xl"></div>
              </motion.div>
          ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8 py-12">
        <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="mb-12 perspective-1000"
        >
            <div className="inline-block relative">
                 <Stars className="absolute -top-12 -right-12 w-16 h-16 text-[#FFD700] animate-pulse drop-shadow-[0_0_10px_#FFD700]" />
                 <Sparkles className="absolute -bottom-6 -left-12 w-10 h-10 text-[#FFD700] animate-pulse delay-75 drop-shadow-[0_0_10px_#FFD700]" />
                 
                 <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#FFE4E1] drop-shadow-[0_0_25px_rgba(255,105,180,0.6)] tracking-tight leading-none">
                    Happy Valentine's Day
                 </h1>
            </div>
        </motion.div>

        <AnimatePresence>
            {showText && (
                <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-lg md:text-2xl font-hand text-[#FFB6C1] max-w-3xl mx-auto leading-relaxed drop-shadow-md whitespace-pre-wrap"
                >
                    "Well we might not be together as of now l guess as much as l really wish we could have been and maybe we could have talked things out properly but well that doesnt change that{"\n"}
You are my favorite notification, my reason to smile, and the best part thats ever been in my life I'm sure you know how l feel for you as well as the magnitude so l wont say it ----yours traetrae your bubbzy "
                </motion.p>
            )}
        </AnimatePresence>

        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
            className="mt-20"
        >
            <div className="bg-white/10 backdrop-blur-md border border-[#FFB6C1]/30 p-10 rounded-full inline-block shadow-[0_0_60px_rgba(255,20,147,0.4)] relative group cursor-pointer hover:scale-110 transition-transform duration-500">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF1493] to-[#FF69B4] opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
                <Heart className="w-28 h-28 text-[#FF1493] fill-[#FF1493] animate-heartbeat drop-shadow-2xl" />
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 4, duration: 2 }}
            className="mt-16 text-[#D4A5A5] text-sm tracking-[0.4em] uppercase font-bold pb-8"
        >
            T ❤️ L • Forever & Always
        </motion.div>
      </div>
    </motion.div>
  );
}
