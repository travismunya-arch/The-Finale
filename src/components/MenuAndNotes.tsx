import { Wine, Utensils, Moon } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function MenuAndNotes() {
  return (
    <div className="w-full max-w-5xl mx-auto my-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
      
      {/* Date Menu Section */}
      <div className="space-y-6">
        <div className="mb-6">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#E5B5A6] uppercase">Date Menu</span>
            <h3 className="font-serif text-3xl mt-2 text-foreground">Tonight's menu</h3>
        </div>

        <div className="space-y-4">
            {[
                { icon: Wine, title: "STARTERS", desc: "Snacks, playlists, and the coziest couch fort." },
                { icon: Utensils, title: "MAIN", desc: "Cute date and a photo booth moment." },
                { icon: Moon, title: "DESSERT", desc: "Sunset walk and dessert that melts our hearts." }
            ].map((item, i) => (
                <Card key={i} className="p-4 border border-[#F5E6E6] shadow-sm flex items-center gap-4 bg-white/80">
                    <div className="p-2 rounded-full bg-[#FFF5F5] text-[#D4A5A5]">
                        <item.icon size={16} />
                    </div>
                    <div>
                        <span className="text-[10px] font-bold tracking-widest text-[#D4A5A5] uppercase block mb-1">{item.title}</span>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                </Card>
            ))}
        </div>
      </div>

      {/* Promise Notes Section */}
      <div className="space-y-6">
        <div className="mb-6">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#E5B5A6] uppercase">Vows, but cute</span>
            <h3 className="font-serif text-3xl mt-2 text-foreground">Promise notes</h3>
        </div>

        <div className="space-y-3">
            {[
                "Always save you the last bite maybe a little respect and trust of you not finishing all the food (its not bout food 😝)",
                "Be your personal hype crew yeahh yeah always support you",
                "Laugh at the dumb jokes, every time. yours are really dumb especially those similes or fananidzo you do",
                "Keep the hugs on standby, not necessarily"
            ].map((note, i) => (
                <div key={i} className="bg-[#FFF0F0] p-4 rounded-xl border border-[#FDE2E2] text-sm text-[#8B4513] relative">
                    <span className="absolute -left-1 top-4 text-[#FFB6C1] text-lg">♥</span>
                    <p className="pl-4 leading-relaxed">{note}</p>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
}
