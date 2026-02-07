import { Card } from "@/components/ui/card";

export default function LoveNote() {
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-4 space-y-8">
      
      {/* Love Note */}
      <div className="text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E5B5A6] to-transparent opacity-50"></div>
        <Card className="py-12 px-8 border-2 border-dashed border-[#F5E6E6] bg-white/50 backdrop-blur-sm mt-8">
            <h3 className="font-serif text-2xl text-foreground mb-6">Love note</h3>
            <p className="text-muted-foreground font-sans text-sm md:text-base italic">
                its quite a shame we cant celebrate our love directly due to certain reasons......
            </p>
        </Card>
      </div>

      {/* Extra Love */}
      <div className="text-center">
        <Card className="py-12 px-8 border-2 border-dashed border-[#F5E6E6] bg-white/50 backdrop-blur-sm">
            <h3 className="font-serif text-2xl text-foreground mb-6">Extra love</h3>
            <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed">
                one of them due to me being a gentleman and respecting your feelings but well i do hope we can properly celebrate our love someday of cause not on Valentine's Day (since its such a cliche) I dont know I guess we shall see
            </p>
        </Card>
      </div>

    </div>
  );
}
