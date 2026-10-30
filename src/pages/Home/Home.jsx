// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import logo from "../../assets/images/logo.png";
// import hero4 from "../../assets/images/hero4.png";
// import hero5 from "../../assets/images/hero5.png";
// import hero6 from "../../assets/images/hero6.png";

// export default function Home() {
//   const navigate = useNavigate();

//   const slides = [
//     {
//       image: hero4,
//       title: "AAV DAIRY FARM",
//       subtitle: "Pure Milk. Healthy Life. Better Tomorrow.",
//       description: "Track your herd, monitor health and vaccinations, log milk production, and manage breeding — built for modern dairy farms.",
//     },
//     {
//       image: hero5,
//       title: "Smart Dairy Management",
//       subtitle: "Technology Meets Agriculture",
//       description: "Manage livestock, breeding records, milk collection, nutrition and farm operations from one intelligent platform.",
//     },
//     {
//       image: hero6,
//       title: "Healthy Cows, Premium Milk",
//       subtitle: "Modern Farming for Better Productivity",
//       description: "Digital animal records, vaccination schedules, AI insights and real-time monitoring to improve your dairy business.",
//     },
//   ];

//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5007);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-cream">
//       <section className="relative h-screen overflow-hidden">
//         {slides.map((slide, index) => (
//           <img
//             key={index}
//             src={slide.image}
//             alt={slide.title}
//             className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
//               currentSlide === index ? "opacity-100" : "opacity-0"
//             }`}
//           />
//         ))}

//         <div className="absolute inset-0 bg-linear-to-t from-forest/80 via-forest/20 to-transparent" />
//         <div className="absolute inset-0 bg-linear-to-r from-white/40 via-white/10 to-transparent" />

//         <div className="relative z-20 flex items-center h-full">
//           <div className="max-w-2xl px-6 lg:px-14">
//             <div className="mb-6">
//               <img src={logo} alt="AAV Dairy Farm" className="w-28 lg:w-36 drop-shadow-2xl" />
//             </div>

//             <p className="text-primary text-2xl italic mb-2" style={{ fontFamily: "Georgia, serif" }}>
//               🌿 Welcome to
//             </p>

//             <h1 className="font-display font-extrabold text-forest text-5xl lg:text-6xl leading-tight mb-4">
//               {slides[currentSlide].title}
//             </h1>

//             <p className="text-forest text-xl font-semibold mb-4">{slides[currentSlide].subtitle}</p>
//             <p className="text-forest/80 max-w-xl mb-8">{slides[currentSlide].description}</p>

//             <div className="flex gap-4">
//               <button
//                 onClick={() => navigate("/register")}
//                 className="px-8 py-3 rounded-xl bg-primary text font-semibold hover:bg-primary-dark transition"
//               >
//                 Get Started
//               </button>
//               <button
//                 onClick={() => navigate("/login")}
//                 className="px-8 py-3 rounded-xl bg-white/90 backdrop-blur-sm border border-white text-forest font-semibold hover:bg-white transition"
//               >
//                 Login
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`h-3 rounded-full transition-all ${
//                 currentSlide === index ? "w-10 bg-white" : "w-3 bg-white/50"
//               }`}
//             />
//           ))}
//         </div>

//         <svg className="absolute bottom-0 left-0 w-full z-20" viewBox="0 0 1440 110" preserveAspectRatio="none">
//           <path d="M0 60 Q180 100 360 55 T720 60 T1080 50 T1440 65 L1440 110 L0 110 Z" fill="#FFFDF6" />
//         </svg>
//       </section>
//     </div>
//   );
// }









import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import hero4 from "../../assets/images/hero4.png";
import hero5 from "../../assets/images/hero5.png";
import hero6 from "../../assets/images/hero6.png";

export default function Home() {
  const navigate = useNavigate();

  const slides = [
    {
      image: hero4,
      title: "AAV DAIRY FARM",
      subtitle: "Pure Milk. Healthy Life. Better Tomorrow.",
      description:
        "Track your herd, monitor health and vaccinations, log milk production, and manage breeding — built for modern dairy farms.",
    },
    {
      image: hero5,
      title: "Smart Dairy Management",
      subtitle: "Technology Meets Agriculture",
      description:
        "Manage livestock, breeding records, milk collection, nutrition and farm operations from one intelligent platform.",
    },
    {
      image: hero6,
      title: "Healthy Cows, Premium Milk",
      subtitle: "Modern Farming for Better Productivity",
      description:
        "Digital animal records, vaccination schedules, AI insights and real-time monitoring to improve your dairy business.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5007);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={slide.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-linear-to-r from-white/60 via-white/10 to-transparent" />
        <div className="relative z-20 flex items-center h-full">
          <div className="max-w-2xl px-6 lg:px-14">
            <div className="mb-6">
              <img src={logo} alt="AAV Dairy Farm" className="w-28 lg:w-36 drop-shadow-2xl" />
            </div>

            <p className="text-primary text-2xl italic mb-2" style={{ fontFamily: "Georgia, serif" }}>
              🌿 Welcome to
            </p>

            <h1 className="font-display font-extrabold text-black text-3xl lg:text-4xl leading-tight lg:leading-10 mb-4">
              {slides[currentSlide].title}
            </h1>

            <p className="text-black text-xl font-semibold mb-4">{slides[currentSlide].subtitle}</p>
            <p className="text-black/80 max-w-xl mb-8">{slides[currentSlide].description}</p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/register")}
                className="text-black font-semibold text-base hover:underline underline-offset-4 transition"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-7 py-2.5 rounded-full bg-white text-black font-semibold shadow-md hover:shadow-lg hover:bg-white/95 transition"
              >
                Login
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                currentSlide === index ? "w-10 bg-white" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>

        <svg className="absolute bottom-0 left-0 w-full z-20" viewBox="0 0 1440 110" preserveAspectRatio="none">
          <path d="M0 60 Q180 100 360 55 T720 60 T1080 50 T1440 65 L1440 110 L0 110 Z" fill="#FFFDF6" />
        </svg>
      </section>
    </div>
  );
}