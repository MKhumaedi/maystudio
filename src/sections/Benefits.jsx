import Heading from "../components/Heading";
import Section from "../components/Section";
import Arrow from "../assets/svg/Arrow";
import ClipPath from "../assets/svg/ClipPath";
import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
} from "../assets";

const benefits = [
  {
    title: "Website Company Profile",
    text: "Tampilkan bisnis Anda secara profesional dengan website company profile yang modern dan terpercaya.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    title: "Landing Page Conversion",
    text: "Landing page yang dirancang khusus untuk meningkatkan penjualan dan menghasilkan leads.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    title: "Website Toko Online",
    text: "Bangun toko online dengan sistem yang mudah digunakan dan siap meningkatkan penjualan Anda.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    title: "Custom Web App",
    text: "Solusi website custom sesuai kebutuhan bisnis Anda, dari dashboard hingga sistem kompleks.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    title: "SEO & Optimasi",
    text: "Website Anda dioptimalkan agar mudah ditemukan di Google dan meningkatkan traffic organik.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    title: "Maintenance & Support",
    text: "Kami siap membantu maintenance dan update website agar selalu optimal dan aman.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

const Benefits = () => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        
        {/* Heading */}
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title="Layanan Website yang Kami Tawarkan"
          text="Kami menyediakan berbagai layanan pembuatan website yang dirancang untuk membantu bisnis Anda berkembang dan tampil profesional di dunia digital."
        />

        {/* Cards */}
        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] group"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
                
                <h5 className="h5 mb-5">{item.title}</h5>
                
                <p className="body-2 mb-6 text-n-3">{item.text}</p>

                <div className="flex items-center mt-auto">
                  <img src={item.iconUrl} width={48} height={48} alt={item.title} />
                  
                  <p className="ml-auto font-code text-xs font-bold text-white uppercase tracking-wider">
                    Detail
                  </p>
                  
                  <Arrow />
                </div>
              </div>

              {/* Glow effect */}
              {item.light && (
                <div className="absolute top-0 left-1/4 w-full aspect-square bg-radial-gradient from-[#7c3aed] to-transparent opacity-30 pointer-events-none" />
              )}

              {/* Hover image */}
              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;