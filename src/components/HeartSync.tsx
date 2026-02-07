import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Heart } from "lucide-react";
import popSfx from "@/assets/pop.mp3";

interface HeartSyncProps {
  onUnlock: () => void;
}

export default function HeartSync({ onUnlock }: HeartSyncProps) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const controls = useAnimation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Sounds
  const playPop = () => {
    const audio = new Audio(popSfx);
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Audio play failed", e));
  };

  useEffect(() => {
    if (isHolding && !isComplete) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsComplete(true);
            playPop(); // Success sound
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 100;
          }
          return prev + 1.5; // Slightly faster fill
        });
      }, 30);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!isComplete) {
        // Drain logic
        const drainInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(drainInterval);
                    return 0;
                }
                return prev - 3;
            });
        }, 20);
        return () => clearInterval(drainInterval);
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHolding, isComplete]);

  useEffect(() => {
    if (isComplete) {
      controls.start({
        scale: [1, 1.2, 50],
        opacity: [1, 1, 0],
        transition: { duration: 0.8, ease: "circIn" }
      }).then(onUnlock);
    }
  }, [isComplete, controls, onUnlock]);

  return (
    <div className="w-full max-w-lg mx-auto my-32 px-4 text-center relative z-20">
      <motion.div
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.2 }}
      >
        <h3 className="font-serif text-3xl md:text-4xl text-[#5C2B2B] mb-6 drop-shadow-sm">
            One last check... are we synced?
        </h3>
        
        <p className="text-sm md:text-base text-[#8B4513]/70 mb-16 font-bold uppercase tracking-[0.2em]">
            Hold the heart to sync our vibes
        </p>
      </motion.div>

      <div className="relative flex justify-center items-center h-64">
        {/* Simple Ring - Removed glow and heavy particles for performance */}
        <div className="absolute w-48 h-48 rounded-full border-4 border-[#FFF0F5]"></div>

        {/* Progress Ring */}
        <svg className="absolute w-48 h-48 rotate-[-90deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
            stroke="#FFE4E1"
            strokeWidth="6"
            className="opacity-30"
          />
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
            stroke="#FF69B4"
            strokeWidth="6"
            strokeDasharray="289.02" // 2 * pi * 46
            strokeDashoffset={289.02 - (289.02 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-75 ease-linear"
          />
        </svg>

        {/* The Button - Simplified */}
        <motion.button
          className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-tr from-[#FFB6C1] to-[#FF1493] flex items-center justify-center shadow-lg cursor-pointer outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isHolding ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          transition={isHolding ? { repeat: Infinity, duration: 0.4 } : {}}
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onMouseLeave={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
        >
          <motion.div animate={controls}>
             <Heart className={`w-14 h-14 text-white fill-white transition-all duration-300 ${isHolding ? "scale-110" : ""}`} />
          </motion.div>
        </motion.button>
      </div>

      <div className="h-12 mt-8">
        {isComplete ? (
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[#FF1493] font-bold tracking-widest uppercase text-lg">
                Vibe Synced!
            </motion.p>
        ) : (
            <p className="text-sm font-bold text-[#D4A5A5] uppercase tracking-wide">
                {progress > 0 ? `${Math.round(progress)}% Synced` : "Ready to connect"}
            </p>
        )}
      </div>
    </div>
  );
}
