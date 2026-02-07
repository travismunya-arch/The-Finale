import { motion } from "framer-motion";

const memories = [
  {
    gradient: "from-[#FFC3A0] to-[#FFAFBD]", // Peach/Pink
    caption: "I dont know you I guess but you know how I feel so lets not push its mostly cause of that"
  },
  {
    gradient: "from-[#E0C3FC] to-[#8EC5FC]", // Purple/Blue
    caption: "The way you were just free to do or say anything around me whether weird or not"
  },
  {
    gradient: "from-[#fad0c4] to-[#ffd1ff]", // Warm Pink
    caption: "Its a lot of things really and it could never fit in these 3 I could have added more but its quite labourful not sure such a word exists though",
    hasNote: true // Marker for the special note
  }
];

export default function Polaroids() {
  return (
    <div className="w-full max-w-6xl mx-auto my-20 px-4 relative">
      <div className="flex justify-between items-center mb-12">
        <h3 className="font-serif text-3xl text-foreground">Polaroids on a string</h3>
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#E5B5A6] uppercase bg-white px-3 py-1 rounded-full border border-[#F5E6E6]">
            Sweet Memories
        </span>
      </div>

      {/* String Line */}
      <div className="absolute top-[90px] left-0 right-0 h-[2px] bg-[#E5B5A6]/30 -z-10 rotate-1 hidden md:block"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {memories.map((mem, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.05, rotate: 0 }}
            initial={{ rotate: i % 2 === 0 ? -2 : 2 }}
            className="bg-white p-4 pb-8 shadow-lg transform transition-all duration-300 relative group"
          >
             {/* Pin/Clip */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#E5DFDF] rounded-full border border-white shadow-sm z-10"></div>
             
             {/* Sticky Note (conditionally rendered) */}
             {mem.hasNote && (
                <div className="absolute -top-4 -right-4 w-32 bg-[#FFF9C4] p-3 shadow-md rotate-12 z-20 border border-[#FFF59D] font-hand text-xs text-[#8B4513] leading-tight transform hover:rotate-6 transition-transform">
                    <span className="block text-center font-bold mb-1 opacity-50">NOTE</span>
                    I cant put our pics coz well u know we arent exactly together 😅
                </div>
             )}

             {/* Image Area */}
             <div className={`w-full aspect-[4/5] bg-gradient-to-b ${mem.gradient} mb-4 rounded-sm opacity-90 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="font-hand text-white text-3xl opacity-80">?</span>
                </div>
             </div>
             
             {/* Caption */}
             <p className="font-hand text-lg text-[#5C2B2B] leading-tight text-center px-2">
                {mem.caption}
             </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
