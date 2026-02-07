import { useState } from "react";
import { ShoppingBasket, Music, Heart, Ticket, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const initialCoupons = [
  {
    id: 1,
    icon: ShoppingBasket,
    title: "Snack Mission",
    desc: "Crunchy, sweet, and extra napkins. We are prepared."
  },
  {
    id: 2,
    icon: Music,
    title: "Playlist Swap",
    desc: "You pick the mood. I queue the heart songs but not that Taylor Swift song or any feminism please."
  },
  {
    id: 3,
    icon: Heart,
    title: "Hug Voucher",
    desc: "Unlimited squeezes. Redeem any time you want."
  },
  {
    id: 4,
    icon: Ticket,
    title: "Meme Reserve",
    desc: "Curated chaos, saved just for us."
  }
];

export default function Coupons() {
  const [redeemed, setRedeemed] = useState<number[]>([]);

  const handleRedeem = (id: number, title: string) => {
    if (redeemed.includes(id)) return;
    setRedeemed([...redeemed, id]);
    toast.success(`Redeemed: ${title}! ❤️`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16 px-4">
      <h3 className="text-center text-[10px] font-bold tracking-[0.2em] text-[#E5B5A6] mb-8 uppercase">
        Valentine Coupons
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialCoupons.map((coupon) => {
            const isRedeemed = redeemed.includes(coupon.id);
            
            return (
              <Card 
                key={coupon.id} 
                onClick={() => handleRedeem(coupon.id, coupon.title)}
                className={cn(
                    "p-6 border-2 border-dashed transition-all duration-300 group cursor-pointer shadow-sm relative overflow-hidden",
                    isRedeemed 
                        ? "bg-[#FFF5F5] border-[#FFB6C1] opacity-70" 
                        : "bg-white border-[#F5E6E6] hover:border-[#FFB6C1] hover:shadow-md"
                )}
              >
                {isRedeemed && (
                    <div className="absolute top-2 right-2 bg-[#FFB6C1] text-white rounded-full p-1 shadow-sm animate-in zoom-in">
                        <Check size={14} />
                    </div>
                )}
                
                <div className="flex gap-4 items-start">
                    <div className={cn(
                        "p-3 rounded-full transition-colors",
                        isRedeemed ? "bg-[#FFE4E1] text-[#FF69B4]" : "bg-[#FFF5F5] group-hover:bg-[#FFF0F5] text-[#D4A5A5]"
                    )}>
                        <coupon.icon size={20} />
                    </div>
                    <div>
                        <h4 className={cn(
                            "font-bold text-xs tracking-widest uppercase mb-2 transition-colors",
                            isRedeemed ? "text-[#FF69B4] line-through" : "text-[#5C2B2B]"
                        )}>
                            {coupon.title}
                        </h4>
                        <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                            {coupon.desc}
                        </p>
                    </div>
                </div>
              </Card>
            );
        })}
      </div>
      
      <p className="text-center text-xs text-[#D4A5A5] mt-4 opacity-70">
        Click a coupon to redeem it!
      </p>
    </div>
  );
}
