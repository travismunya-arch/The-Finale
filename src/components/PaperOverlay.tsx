import paperTexture from "@/assets/paper_texture.jpg";

export default function PaperOverlay() {
  return (
    <div 
        className="fixed inset-0 pointer-events-none z-[5] opacity-20 mix-blend-multiply"
        style={{ backgroundImage: `url(${paperTexture})`, backgroundSize: "200px" }}
    />
  );
}
