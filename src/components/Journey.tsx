import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Star, MapPin, ArrowRight } from "lucide-react";
import coupleDoodle from "@/assets/couple_doodle.png";

const steps = [
  {
    id: 1,
    icon: MessageCircle,
    title: "The Beginning",
    desc: "It started with just words, but somehow, they meant everything. Every notification from you became the highlight of my day.",
    color: "bg-[#FFE4E1]"
  },
  {
    id: 2,
    icon: Heart,
    title: "The Connection",
    desc: "We may not be 'together' together yet, but my heart doesn't seem to know the difference. It beats for you anyway.",
    color: "bg-[#FFF0F5]"
  },
  {
    id: 3,
    icon: Star,
    title: "The Little Things",
    desc: "Your laugh, your weird jokes, the way you make me feel—it's all these little things that make me obsessed with you.",
    color: "bg-[#FFF5EE]"
  },
  {
    id: 4,
    icon: MapPin,
    title: "The Future?",
    desc: "I don't know exactly where this road leads, but I know I want to walk it with you. Hopefully, towards something beautiful.",
    color: "bg-[#F0FFF0]"
  }
];

export default function Journey() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-32 px-4">
      <div className="text-center mb-16">
         <span className="text-[10px] font-bold tracking-[0.2em] text-[#E5B5A6] uppercase bg-white px-3 py-1 rounded-full border border-[#F5E6E6]">
            Our Story So Far
         </span>
         <h3 className="font-serif text-3xl md:text-4xl text-foreground mt-4">A Little Journey</h3>
      </div>

      <div className="relative h-[400px] md:h-[500px] bg-white rounded-[3rem] shadow-xl overflow-hidden border-4 border-white">
        {/* Progress Bar */}
        <div className="absolute top-8 left-8 right-8 h-2 bg-gray-100 rounded-full z-20 overflow-hidden">
            <motion.div 
                className="h-full bg-[#FFB6C1]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
            />
        </div>

        <AnimatePresence mode="wait">
            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 text-center ${steps[currentStep].color}`}
            >
                <div className="bg-white p-6 rounded-full shadow-sm mb-8 text-[#FFB6C1]">
                    {(() => {
                        const Icon = steps[currentStep].icon;
                        return <Icon size={40} />;
                    })()}
                </div>

                <h4 className="font-serif text-3xl md:text-4xl text-[#5C2B2B] mb-6">
                    {steps[currentStep].title}
                </h4>
                
                <p className="font-sans text-lg text-[#8B4513] leading-relaxed max-w-lg mx-auto">
                    {steps[currentStep].desc}
                </p>

                {/* Decorative Doodle for the last step */}
                {currentStep === steps.length - 1 && (
                    <motion.img 
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        src={coupleDoodle} 
                        className="absolute bottom-4 right-4 w-32 opacity-20" 
                        alt="Doodle" 
                    />
                )}
            </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute bottom-8 right-8 z-20">
            {currentStep < steps.length - 1 ? (
                <Button 
                    onClick={nextStep}
                    className="rounded-full w-12 h-12 p-0 bg-[#FFB6C1] hover:bg-[#FF69B4] shadow-lg"
                >
                    <ArrowRight className="text-white" />
                </Button>
            ) : (
                <div className="text-xs font-bold uppercase tracking-widest text-[#D4A5A5] animate-pulse">
                    Keep scrolling down 👇
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
