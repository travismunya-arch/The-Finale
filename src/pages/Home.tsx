import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "@/components/Envelope";
import LoveMeter from "@/components/LoveMeter";
import Coupons from "@/components/Coupons";
import MenuAndNotes from "@/components/MenuAndNotes";
import LoveNote from "@/components/LoveNote";
import Polaroids from "@/components/Polaroids";
import Reasons from "@/components/Reasons";
import IntroSlide from "@/components/IntroSlide";
import Gifts from "@/components/Gifts";
import Journey from "@/components/Journey";
import HeartSync from "@/components/HeartSync";
import ValentineFinale from "@/components/ValentineFinale";
import { Button } from "@/components/ui/button";
import AudioControl from "@/components/AudioControl";
import PaperOverlay from "@/components/PaperOverlay";
import { Reveal } from "@/components/Reveal";

// Assets
import doodleLeaves from "@/assets/doodle_leaves.png";
import flowerPetal from "@/assets/flower_petal.png";
import bgMusic from "@/assets/background_music.mp3";
import bulbImg from "@/assets/light_bulb.png";

type ViewState = "intro" | "main" | "interlude" | "gifts" | "finale";

export default function Home() {
  const [view, setView] = useState<ViewState>("intro");
  // Dark Room Logic: Starts TRUE when entering Main, turns FALSE after plane animation
  const [isDarkRoom, setIsDarkRoom] = useState(false);
  const [bulbHit, setBulbHit] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mainSectionRef = useRef<HTMLDivElement>(null);

  // Play music when user clicks Yes
  const handleStart = () => {
    setView("main");
    setIsDarkRoom(true); // Enter Dark Room mode initially
    if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.log("Audio autoplay failed", e));
    }
  };

  const handleLightsOn = () => {
    // 1. Shake the bulb first (Simulate impact)
    setBulbHit(true);
    
    // 2. Turn on lights shortly after shake starts
    setTimeout(() => {
        setIsDarkRoom(false);
        setBulbHit(false);
    }, 500);
  };

  return (
    <div className={`min-h-screen bg-[#FFF0F5] relative overflow-hidden font-sans selection:bg-[#FFB6C1]/30 ${isDarkRoom ? "overflow-y-hidden h-screen" : ""}`}>
      
      {/* Global Atmosphere */}
      <PaperOverlay />
      <AudioControl audioRef={audioRef} />
      
      {/* Background Music */}
      <audio ref={audioRef} src={bgMusic} loop />

      {/* Dark Room Overlay (Backdrop) - Fixed to viewport */}
      <AnimatePresence>
        {isDarkRoom && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="fixed inset-0 bg-[#1A0F0F]/95 z-[50] pointer-events-none w-screen h-screen"
            >
                {/* Spotlight Hint around Envelope area */}
                <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-radial-gradient from-transparent to-[#1A0F0F] z-[51]"></div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* The Bulb (Independent Layer) - z-70 */}
      <AnimatePresence>
        {isDarkRoom && (
            <motion.img 
                src={bulbImg}
                initial={{ y: -100 }}
                animate={bulbHit ? { 
                    y: 0, 
                    rotate: [0, -20, 20, -10, 10, 0], // SHAKE animation
                    scale: [1, 1.2, 1] 
                } : { y: 0 }}
                exit={{ y: -200, opacity: 0 }}
                transition={bulbHit ? { duration: 0.5, type: "spring" } : { type: "spring", stiffness: 100 }}
                className="fixed top-0 left-1/2 -translate-x-1/2 w-24 md:w-32 z-[70] drop-shadow-[0_0_20px_rgba(255,255,0,0.3)] pointer-events-none"
            />
        )}
      </AnimatePresence>

      {/* Global Background Decorations */}
      {(view === "main" || view === "interlude" || view === "gifts") && !isDarkRoom && (
          <div className="fixed inset-0 pointer-events-none z-0">
             <img src={doodleLeaves} className="absolute top-10 -right-10 w-48 h-48 opacity-20 -rotate-12 mix-blend-multiply" alt="" />
             <img src={flowerPetal} className="absolute top-1/4 left-10 w-8 h-8 opacity-40 animate-float blur-[1px]" style={{ animationDuration: "8s" }} alt="" />
             <img src={flowerPetal} className="absolute top-1/3 right-20 w-6 h-6 opacity-30 animate-float blur-[1px]" style={{ animationDuration: "12s", animationDelay: "2s" }} alt="" />
             <img src={flowerPetal} className="absolute bottom-1/4 left-1/3 w-10 h-10 opacity-20 animate-float blur-[1px]" style={{ animationDuration: "10s", animationDelay: "1s" }} alt="" />
          </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* VIEW: INTRO */}
        {view === "intro" && (
            <IntroSlide key="intro" onYes={handleStart} />
        )}

        {/* VIEW: MAIN CONTENT */}
        {view === "main" && (
            <motion.div 
                key="main"
                ref={mainSectionRef}
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ duration: 1, ease: "circOut" }}
                className={`relative max-w-7xl mx-auto py-16 px-4 md:px-8 transition-all duration-500 ${isDarkRoom ? "z-[60]" : "z-10"}`}
            >
                {/* Recipient View Badge */}
                <div className={`absolute top-4 right-4 md:right-8 transition-opacity duration-500 ${isDarkRoom ? "opacity-0" : "opacity-100"}`}>
                    <span className="bg-white/80 backdrop-blur border border-primary/20 text-[10px] font-bold tracking-widest text-primary px-3 py-1 rounded-full uppercase shadow-sm">
                        Recipient View
                    </span>
                </div>

                <div className={`mt-8 text-center text-[#D4A5A5] text-xs font-bold tracking-widest uppercase opacity-50 mb-8 animate-bounce transition-opacity duration-500 ${isDarkRoom ? "opacity-0" : "opacity-50"}`}>
                    Scroll Down 👇
                </div>

                {/* Section 1: Envelope */}
                <section className={`mb-20 relative transition-all duration-1000 ${isDarkRoom ? "scale-110 mt-20" : ""}`}>
                    <Reveal delay={0.2}>
                        <Envelope isDarkRoom={isDarkRoom} onLightUp={handleLightsOn} />
                    </Reveal>
                </section>

                <motion.div 
                    animate={{ opacity: isDarkRoom ? 0 : 1, filter: isDarkRoom ? "blur(10px)" : "blur(0px)" }}
                    transition={{ duration: 1 }}
                    className={isDarkRoom ? "pointer-events-none" : ""}
                >
                    {/* Section 2: Love Meter & Coupons */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
                        <div className="lg:col-span-5">
                            <Reveal delay={0.1}><LoveMeter /></Reveal>
                        </div>
                        <div className="lg:col-span-7">
                            <Reveal delay={0.3}><Coupons /></Reveal>
                        </div>
                    </section>

                    {/* Divider */}
                    <Reveal>
                        <div className="flex justify-center my-12 opacity-50">
                            <div className="w-2 h-2 bg-[#D4A5A5] rounded-full mx-1"></div>
                            <div className="w-24 h-[1px] bg-[#D4A5A5] self-center"></div>
                            <div className="w-2 h-2 bg-[#D4A5A5] rounded-full mx-1"></div>
                        </div>
                    </Reveal>

                    {/* Section 3: Menu & Notes */}
                    <section className="mb-20">
                        <Reveal><MenuAndNotes /></Reveal>
                    </section>

                    {/* Section 4: Love Notes */}
                    <section className="mb-20">
                        <Reveal><LoveNote /></Reveal>
                    </section>

                    {/* Section 5: Polaroids */}
                    <section className="mb-20">
                        <Reveal><Polaroids /></Reveal>
                    </section>

                    {/* NEW Section: Journey */}
                    <section className="mb-20">
                        <Reveal><Journey /></Reveal>
                    </section>

                    {/* Section 6: Reasons */}
                    <section className="mb-20">
                        <Reveal><Reasons /></Reveal>
                    </section>

                    {/* LINK TO INTERLUDE */}
                    <section className="text-center mb-32">
                        <Reveal>
                            <Button 
                                onClick={() => setView("interlude")}
                                className="bg-gradient-to-r from-[#FFB6C1] to-[#FF69B4] text-white px-12 py-10 rounded-full text-xl font-serif tracking-widest hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(255,105,180,0.4)] animate-pulse border-4 border-white/50"
                            >
                                🎁 Choose Your Gift
                            </Button>
                        </Reveal>
                    </section>

                    <footer className="text-center text-[#D4A5A5] text-xs font-bold tracking-widest uppercase pb-8 opacity-50">
                        Made with ❤️ for my Valentine
                    </footer>
                </motion.div>
            </motion.div>
        )}

        {/* VIEW: INTERLUDE (HeartSync) */}
        {view === "interlude" && (
            <motion.div
                key="interlude"
                initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }} 
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
                exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full min-h-screen flex items-center justify-center"
            >
                <div className="absolute top-4 left-4">
                     <Button onClick={() => setView("main")} variant="ghost" className="text-[#5C2B2B] hover:bg-white/50">Back</Button>
                </div>
                <HeartSync onUnlock={() => setTimeout(() => setView("gifts"), 800)} />
            </motion.div>
        )}

        {/* VIEW: GIFTS */}
        {view === "gifts" && (
            <motion.div
                key="gifts"
                initial={{ opacity: 0, x: 50 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative z-10 w-full min-h-screen"
            >
                <Gifts 
                    onBack={() => setView("main")} 
                    onGiftSelected={(giftId) => {}}
                    onComplete={() => setView("finale")}
                />

                <footer className="absolute bottom-4 left-0 right-0 text-center text-[#5C2B2B] text-xs font-bold tracking-widest uppercase opacity-70 pointer-events-none">
                    T Made With ❤️ For His Valentine L
                </footer>
            </motion.div>
        )}

        {/* VIEW: FINALE */}
        {view === "finale" && (
            <ValentineFinale key="finale" />
        )}

      </AnimatePresence>
    </div>
  );
}
