import { Card } from "@/components/ui/card";

const reasons = [
  "I dont know you I guess but you know how I feel so lets not push its mostly cause of that",
  "The way you were just free to do or say anything around me whether weird or not",
  "Its a lot of things really and it could never fit in these 3 I could have added more but its quite labourful not sure such a word exists though"
];

export default function Reasons() {
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-4">
      <Card className="p-12 border-none shadow-xl bg-white rounded-[3rem] text-center">
        <h3 className="font-serif text-2xl text-foreground mb-8">
            Reasons I am obsessed with me and you
        </h3>
        
        <div className="space-y-4">
            {reasons.map((reason, i) => (
                <div key={i} className="border border-[#F5E6E6] rounded-full py-3 px-6 text-sm text-muted-foreground hover:bg-[#FFF5F5] transition-colors flex items-center justify-start gap-3">
                    <span className="text-[#FFB6C1] text-xs">●</span>
                    <span className="text-left">{reason}</span>
                </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
