import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Gift, Music, Heart, ArrowLeft, Download, Loader2, Play, Pause } from "lucide-react";

// Assets
import bouquetImg from "@/assets/bouquet.png";
import petalsImg from "@/assets/falling_petals.png";
import roseHeadImg from "@/assets/falling_roses.png";
import weddingBg from "@/assets/wedding_aisle_refined.jpg";
import audioFile from "@/assets/background_music.mp3"; 
import chimeSfx from "@/assets/chime.mp3";

interface GiftsProps {
  onBack: () => void;
  onGiftSelected: (gift: string) => void;
  onComplete: () => void;
}

export default function Gifts({ onBack, onGiftSelected, onComplete }: GiftsProps) {
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [redirectProgress, setRedirectProgress] = useState(0);
  
  const playChime = () => {
    const audio = new Audio(chimeSfx);
    audio.volume = 0.5;
    audio.play().catch(e => console.error("Audio play failed", e));
  };

  // 3D Tilt Effect State
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const gifts = [
    { id: "flowers", label: "Gift 1", icon: Gift },
    { id: "song", label: "Gift 2", icon: Music },
    { id: "encouragement", label: "Gift 3", icon: Heart },
  ];

  // Handle gift selection
  const handleSelect = (id: string) => {
    playChime();
    setSelectedGift(id);
    onGiftSelected(id);
  };

  // Auto-redirect effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (selectedGift) {
      const duration = 8000;
      const step = 100;
      interval = setInterval(() => {
        setRedirectProgress((prev) => {
          const next = prev + (step / duration) * 100;
          if (next >= 100) {
            clearInterval(interval);
            onComplete(); 
            return 100;
          }
          return next;
        });
      }, step);
    } else {
        setRedirectProgress(0);
    }
    return () => clearInterval(interval);
  }, [selectedGift, onComplete]);

  return (
    <div className="min-h-screen bg-[#FFF0F5] relative overflow-hidden flex flex-col perspective-1000">
      <div className="p-4 z-50 flex justify-between items-center">
        <Button onClick={selectedGift ? () => setSelectedGift(null) : onBack} variant="ghost" className="text-[#5C2B2B] hover:bg-white/50">
           <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        {/* Redirect Progress Indicator */}
        {selectedGift && (
            <div className="flex items-center gap-2 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-white/20">
                <Loader2 className="w-3 h-3 animate-spin text-[#FF69B4]" />
                <span className="text-[10px] uppercase font-bold text-[#5C2B2B]">Redirecting...</span>
                <div className="w-16 h-1 bg-white/50 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-[#FF69B4]"
                        style={{ width: `${redirectProgress}%` }}
                    />
                </div>
            </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!selectedGift ? (
          /* Selection Screen */
          <motion.div 
            key="selection"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center p-4 text-center"
          >
            <h2 className="font-serif text-3xl md:text-5xl text-[#5C2B2B] mb-16 tracking-tight">Choose a Gift</h2>
            <div className="flex flex-wrap gap-8 justify-center">
                {gifts.map((g) => (
                    <motion.div 
                        key={g.id} 
                        whileHover={{ scale: 1.05, y: -10 }} 
                        whileTap={{ scale: 0.95 }}
                        className="relative"
                    >
                        <Button 
                            onClick={() => handleSelect(g.id)}
                            className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] bg-white/80 backdrop-blur-sm shadow-xl border border-white/40 flex flex-col items-center justify-center gap-4 hover:shadow-2xl hover:border-[#FFB6C1] transition-all group"
                        >
                            <div className="p-4 rounded-full bg-[#FFF0F5] group-hover:bg-[#FFE4E1] transition-colors">
                                <g.icon className="h-8 w-8 md:h-10 md:w-10 text-[#D4A5A5] group-hover:text-[#FF69B4] transition-colors" />
                            </div>
                            <span className="text-[#5C2B2B] font-serif text-lg tracking-wide">{g.label}</span>
                        </Button>
                    </motion.div>
                ))}
            </div>
          </motion.div>
        ) : (
          /* Reveal Screens */
          <motion.div 
            key="reveal"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex-1 relative w-full h-full flex flex-col"
          >
            
            {/* Gift 1: Flowers */}
            {selectedGift === "flowers" && (
                <div 
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF0F5] via-[#FFE4E1] to-[#FFD1DC] overflow-hidden"
                    onMouseMove={(e) => {
                        x.set(e.clientX - window.innerWidth / 2);
                        y.set(e.clientY - window.innerHeight / 2);
                    }}
                >
                    {/* Falling Petals & Roses Animation */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.img 
                                key={`petal-${i}`}
                                src={petalsImg} 
                                className="absolute w-8 h-8 md:w-12 md:h-12 opacity-70 blur-[0.5px]"
                                initial={{ top: -50, left: `${Math.random() * 100}%`, rotate: 0 }}
                                animate={{ top: "110%", rotate: 360, x: Math.sin(i) * 60 }}
                                transition={{ duration: 6 + Math.random() * 5, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
                            />
                        ))}
                         {[...Array(10)].map((_, i) => (
                            <motion.img 
                                key={`rose-${i}`}
                                src={roseHeadImg} 
                                className="absolute w-12 h-12 md:w-20 md:h-20 opacity-90 shadow-sm"
                                initial={{ top: -80, left: `${Math.random() * 100}%`, rotate: Math.random() * 360 }}
                                animate={{ top: "110%", rotate: Math.random() * 360 + 360, x: Math.cos(i) * 40 }}
                                transition={{ duration: 8 + Math.random() * 6, repeat: Infinity, ease: "linear", delay: Math.random() * 5 }}
                            />
                        ))}
                    </div>

                    <h2 className="font-serif text-4xl md:text-6xl text-[#5C2B2B] mb-12 z-10 drop-shadow-sm text-center px-4 w-full leading-normal py-2 mix-blend-multiply">
                        Here is your gift
                    </h2>
                    
                    <motion.div 
                        style={{ rotateX, rotateY, z: 100 }}
                        initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} 
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="relative z-10 p-8 cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                    >
                        <img src={bouquetImg} alt="Bouquet" className="w-[300px] md:w-[500px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)]" />
                    </motion.div>
                </div>
            )}

            {/* Gift 2: Song */}
            {selectedGift === "song" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-cover bg-center z-0 scale-110 animate-pulse-slow" 
                        style={{ backgroundImage: `url(${weddingBg})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 backdrop-blur-[2px] z-0" />

                    <div className="relative z-10 text-center p-8 md:p-12 bg-white/10 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-2xl max-w-2xl mx-4 overflow-hidden group">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

                        <h2 className="font-serif text-2xl md:text-3xl text-white/90 mb-2 tracking-wide drop-shadow-md">
                            Our Wedding Song As Promised
                        </h2>
                        <div className="w-20 h-1 bg-white/50 mx-auto rounded-full mb-10"></div>

                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow backdrop-blur-sm border border-white/30">
                             <Music className="w-10 h-10 text-white" />
                        </div>

                        <h3 className="font-serif text-4xl md:text-6xl text-white mb-2 tracking-tight">A Thousand Years</h3>
                        <p className="text-white/70 font-sans mb-12 text-xl tracking-widest uppercase">James Arthur</p>
                        
                        <div className="flex flex-col gap-6 items-center">
                            {/* Visualizer */}
                            <div className="flex gap-2 h-20 items-end mb-4">
                                {[...Array(12)].map((_, i) => (
                                    <motion.div 
                                        key={i} 
                                        className="w-2 bg-gradient-to-t from-white to-transparent rounded-t-full"
                                        animate={{ height: [10, 60 + Math.random() * 40, 10] }}
                                        transition={{ duration: 0.8 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                                    />
                                ))}
                            </div>

                            <a href={audioFile} download="A_Thousand_Years_James_Arthur.mp3">
                                <Button className="bg-white text-[#5C2B2B] hover:bg-white/90 font-bold rounded-full px-10 py-8 text-lg shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-all hover:scale-105">
                                    <Download className="mr-3 h-5 w-5" /> Download Song
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Gift 3: Encouragement */}
            {selectedGift === "encouragement" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FFF5EE] p-4 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl bg-white p-10 md:p-20 rounded-[3rem] shadow-[0_20px_60px_rgba(255,182,193,0.3)] border-[6px] border-[#FFE4E1] relative mx-4"
                    >
                        <motion.span 
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 text-7xl drop-shadow-xl filter"
                        >
                            👑
                        </motion.span>
                        
                        <h2 className="font-serif text-3xl md:text-5xl text-[#5C2B2B] mb-10 mt-6">To An Amazing Person</h2>
                        
                        <p className="font-hand text-3xl md:text-5xl leading-relaxed text-[#8B4513] drop-shadow-sm">
                            "You are absolutely amazing, capable, and resilient. No matter what comes your way, I believe in you completely. You're going to make it big in life, just watch!"
                        </p>

                        <div className="mt-12 flex justify-center gap-6">
                             <Heart className="w-10 h-10 text-[#FFB6C1] fill-[#FFB6C1] animate-pulse drop-shadow-lg" />
                             <Heart className="w-12 h-12 text-[#FF69B4] fill-[#FF69B4] animate-pulse delay-100 drop-shadow-lg" />
                             <Heart className="w-10 h-10 text-[#FFB6C1] fill-[#FFB6C1] animate-pulse delay-200 drop-shadow-lg" />
                        </div>
                    </motion.div>
                </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
