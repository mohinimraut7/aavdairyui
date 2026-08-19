import { useState, useEffect } from "react";
import { Milk, Beef, Wheat } from "lucide-react";
import hero4 from "../assets/images/hero4.png";
import hero5 from "../assets/images/hero5.png";
import hero6 from "../assets/images/hero6.png";

const heroImages = [hero4, hero5, hero6];

// Reads its 3 stats from props so it always matches the StatCards below it
// on Dashboard.jsx (previously these were hardcoded separately and showed
// two different "Today's Milk" numbers on the same page).
export default function HeroBanner({ todaysMilk = "0 L", activeAnimals = "0", feedStockPct = "0%" }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5007);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl h-[250px] shadow-lg">
      {heroImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
      <div className="relative h-full flex flex-col p-8">
        <div>
          <h1 className="text-4xl font-bold text-white mb-3">Welcome!!</h1>
          <p className="text-white/90 text-base max-w-lg">
            Let's make today productive and healthy for your dairy farm.
          </p>
        </div>
        <div className="flex-1" />
        <div className="flex gap-5 flex-wrap">
          <Stat icon={<Milk size={20} />} title="Today's Milk" value={todaysMilk} />
          <Stat icon={<Beef size={20} />} title="Active Animals" value={activeAnimals} />
          <Stat icon={<Wheat size={20} />} title="Feed Stock" value={feedStockPct} />
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, title, value }) {
  return (
    <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3">
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/80">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
    </div>
  );
}
