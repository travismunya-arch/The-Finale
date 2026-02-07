import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface IntroSlideProps {
  onYes: () => void;
}

export default function IntroSlide({ onYes }: IntroSlideProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  // Function to move the "No" button randomly
  const moveNoButton = () => {
    // Increase range for mobile to ensure it moves away enough but stays roughly visible/annoying
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    setNoPosition({ x, y });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF0F5] p-6 text-center overflow-hidden"
    >
      <div className="max-w-md w-full relative flex flex-col items-center">
        <span className="inline-block text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#5C2B2B] uppercase bg-white/50 px-4 py-2 rounded-full border border-[#F5E6E6] mb-6 md:mb-8 whitespace-normal">
            Cute, Goofy, Totally Smitten.
        </span>

        {/* Responsive Title: Smaller on mobile, larger on tablet/desktop */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#5C2B2B] mb-6 md:mb-8 leading-tight px-2">
            Will u be my Valentine?
        </h1>

        <p className="text-[#8B4513]/80 text-sm md:text-base leading-relaxed font-medium mb-10 max-w-sm mx-auto">
            This probably sounds goofy and weird and rushed cause of our current situation but why does it matter since u were skipping it either way this year lemme intrigue you with what Im good at since I cant come and give you flowers there in Harare myself this is my gift to you and what I made for you
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center h-32 sm:h-20 w-full">
            <Button 
                onClick={onYes}
                className="bg-[#FFB6C1] hover:bg-[#FF69B4] text-white px-8 py-6 rounded-full text-lg sm:text-xl font-serif tracking-wide shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 w-full sm:w-auto"
            >
                YES <Heart className="ml-2 fill-white" />
            </Button>

            <motion.div
                animate={noPosition}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                className="w-full sm:w-auto"
            >
                <Button 
                    variant="outline"
                    className="border-[#D4A5A5] text-[#D4A5A5] px-8 py-6 rounded-full text-lg sm:text-xl font-serif tracking-wide cursor-not-allowed opacity-60 w-full sm:w-auto"
                >
                    NO
                </Button>
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
