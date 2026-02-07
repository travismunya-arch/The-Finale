import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioControlProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export default function AudioControl({ audioRef }: AudioControlProps) {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
        audioRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
        <Button 
            onClick={toggleMute}
            size="icon"
            className="rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/40 shadow-lg text-[#5C2B2B] w-10 h-10"
        >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </Button>
    </div>
  );
}
