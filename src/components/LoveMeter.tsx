import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function LoveMeter() {
  const [value, setValue] = useState([85]);

  const getLevel = (val: number) => {
    if (val < 25) return "Giddy";
    if (val < 50) return "Smitten";
    if (val < 75) return "Sparkly";
    return "Glowing";
  };

  return (
    <div className="w-full max-w-md mx-auto my-12 relative">
       {/* Decorative Label */}
       <div className="absolute -top-3 left-6 text-[10px] font-bold tracking-[0.2em] text-[#E5B5A6] uppercase bg-background px-2 z-10">
          Love Temperature
       </div>

      <Card className="p-8 border-none shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl relative overflow-hidden">
        <div className="absolute top-4 right-4 text-pink-300">
           ♥
        </div>

        <h3 className="font-serif text-2xl mb-2 text-foreground">
          Love level: <span className="italic text-primary">{getLevel(value[0]).toLowerCase()}</span>
        </h3>
        
        <p className="text-xs text-muted-foreground mb-8">
          Side effects include spontaneous smiling and extra cuddles (I wish yohh 🥵)
        </p>

        <div className="mb-2">
            <Slider
              defaultValue={[85]}
              max={100}
              step={1}
              value={value}
              onValueChange={setValue}
              className="[&>.relative>.bg-primary]:bg-gradient-to-r [&>.relative>.bg-primary]:from-[#FFD1DC] [&>.relative>.bg-primary]:to-[#FFB6C1]"
            />
        </div>
        
        <div className="flex justify-between text-[10px] font-bold tracking-widest text-[#D4A5A5] mt-4 uppercase">
            <span>Giddy</span>
            <span>Smitten</span>
            <span>Sparkly</span>
        </div>
        
        <div className="mt-6 text-[10px] font-bold tracking-[0.2em] text-[#E5B5A6] uppercase text-center border-t border-dashed border-primary/20 pt-4">
            Your Obsession of Me
        </div>
      </Card>
    </div>
  );
}
