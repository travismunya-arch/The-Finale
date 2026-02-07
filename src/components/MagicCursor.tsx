import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sparkleImg from "@/assets/sparkle.png";

export default function MagicCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add particle to trail
      const newParticle = { x: e.clientX, y: e.clientY, id: Date.now() };
      setTrail((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  // Remove old particles
  useEffect(() => {
    const interval = setInterval(() => {
        setTrail((prev) => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Hide on mobile
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Main Cursor Follower */}
      <motion.div
        className="fixed w-4 h-4 rounded-full bg-[#FF69B4] blur-[2px] opacity-50"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Trail */}
      <AnimatePresence>
        {trail.map((t, i) => (
            <motion.img
                key={t.id}
                src={sparkleImg}
                initial={{ opacity: 1, scale: 0.5, x: t.x, y: t.y }}
                animate={{ opacity: 0, scale: 0, y: t.y + 20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed w-4 h-4 object-contain"
                style={{ left: 0, top: 0 }} // Position handled by animate x/y to prevent layout thrashing
            />
        ))}
      </AnimatePresence>
    </div>
  );
}
