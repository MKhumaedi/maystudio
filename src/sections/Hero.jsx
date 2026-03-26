import { curve, heroBackground, yourlogo } from "../assets";
import Button from "../components/Button";
import Section from "../components/Section";
import { MouseParallax } from "react-just-parallax";
import { useEffect, useRef, useState } from "react";
import PlusSvg from "../assets/svg/PlusSvg";

const BackgroundCircles = ({ parallaxRef }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute -top-[42.375rem] left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem]">
      <div className="absolute top-1/2 left-1/2 w-[65.875rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />

      <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[46deg]">
          <div className={`w-2 h-2 -ml-1 -mt-36 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[56deg]">
          <div className={`w-4 h-4 -ml-1 -mt-32 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[70deg]">
          <div className={`w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`} />
        </div>
      </MouseParallax>
    </div>
  );
};

const Hero = () => {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative" ref={parallaxRef}>
        
        {/* TEXT */}
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          
          <h1 className="h1 mb-6">
            Jasa Pembuatan Website Profesional untuk{" "}
            <span className="inline-block relative">
              Bisnis Anda
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt=""
              />
            </span>
          </h1>

          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
            Kami membantu Anda membangun website modern, cepat, dan responsif
            yang siap meningkatkan kepercayaan pelanggan dan penjualan bisnis Anda.
          </p>

          <Button href="#contact" white>
            Konsultasi Gratis
          </Button>

          {/* Highlight */}
          <div className="flex justify-center gap-6 text-sm text-n-3 mt-6 flex-wrap">
            <span>✔ Responsive</span>
            <span>✔ SEO Friendly</span>
            <span>✔ Fast Loading</span>
          </div>
        </div>

        {/* BACKGROUND */}
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>

          <BackgroundCircles parallaxRef={parallaxRef} />
        </div>

        {/* LOGO */}
        <div className="hidden relative z-10 mt-20 lg:block">
          <h5 className="tagline mb-6 text-center text-white/50">
            Dipercaya oleh berbagai bisnis & UMKM di Indonesia
          </h5>
            <div className="flex justify-center gap-10 text-white/70 text-sm flex-wrap">
                <span className="opacity-60 hover:opacity-100 transition">✔ Company Profile</span>
                <span className="opacity-60 hover:opacity-100 transition">✔ Website Toko Online</span>
                <span className="opacity-60 hover:opacity-100 transition">✔ Landing Page</span>
                <span className="opacity-60 hover:opacity-100 transition">✔ Custom Web App</span>
            </div>
        </div>
      </div>

      {/* DECORATION */}
      <div className="hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-6 xl:block" />
      <PlusSvg className="hidden absolute top-[54.9375rem] left-[2.1875rem] xl:block" />
      <PlusSvg className="hidden absolute top-[54.9375rem] right-[2.1875rem] xl:block" />
    </Section>
  );
};

export default Hero;