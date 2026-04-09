import Section from "../components/Section";
import { smallSphere, stars, lines, check } from "../assets";
import Heading from "../components/Heading";
import Button from "../components/Button";

const pricing = [
  {
    title: "Starter",
    description: "Cocok untuk UMKM & personal branding",
    price: "1.5jt",
    features: [
      "1 Halaman (Landing Page)",
      "Desain modern & responsive",
      "Optimasi kecepatan website",
      "Integrasi WhatsApp",
      "Free domain (1 tahun)",
    ],
  },
  {
    title: "Business",
    description: "Untuk bisnis yang ingin tampil profesional",
    price: "5jt",
    features: [
      "5–7 Halaman website",
      "Desain custom premium",
      "SEO basic optimization",
      "Integrasi WhatsApp & form",
      "Free domain + hosting (1 tahun)",
    ],
  },
  {
    title: "Custom",
    description: "Solusi website sesuai kebutuhan bisnis Anda",
    price: null,
    features: [
      "Custom design & fitur",
      "Dashboard / sistem khusus",
      "SEO advanced",
      "Integrasi API / payment gateway",
      "Support & maintenance",
    ],
  },
];

const Pricing = () => {
  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">

        {/* Background */}
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <img src={smallSphere} className="relative z-1" width={255} height={255} alt="" />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img src={stars} className="w-full" alt="" />
          </div>
        </div>

        {/* Heading */}
        <Heading
          tag="Harga Jasa Website"
          title="Pilih Paket Website Sesuai Kebutuhan Anda"
        />

        {/* Pricing Cards */}
        <div className="relative">
          <div className="flex gap-[1rem] max-lg:flex-wrap">

            {pricing.map((item, i) => (
              <div
                key={i}
                className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto even:py-14 odd:py-8 odd:my-4 hover:border-purple-500 transition"
              >
                <h4 className="h4 mb-4">{item.title}</h4>

                <p className="body-2 min-h-[4rem] mb-3 text-white/50">
                  {item.description}
                </p>

                {/* Price */}
                <div className="flex items-center h-[5.5rem] mb-6">
                  {item.price ? (
                    <div className="text-[3rem] font-bold text-white">
                      {item.price}
                    </div>
                  ) : (
                    <div className="text-lg text-white/70">
                      Hubungi Kami
                    </div>
                  )}
                </div>

                {/* Button */}
                <Button
                  className="w-full mb-6"
                  href={item.price ? "#contact" : "https://wa.me/6283120479594"}
                  white
                >
                  {item.price ? "Pesan Sekarang" : "Konsultasi"}
                </Button>

                {/* Features */}
                <ul>
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-start py-4 border-t border-n-6">
                      <img src={check} width={20} height={20} alt="" />
                      <p className="body-2 ml-3">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          </div>

          {/* Decorative lines */}
          <div className="hidden lg:block absolute top-1/2 right-full w-[92.5rem] -translate-y-1/2 pointer-events-none">
            <img className="w-full" src={lines} alt="" />
          </div>
          <div className="hidden lg:block absolute top-1/2 left-full w-[92.5rem] -translate-y-1/2 -scale-x-100 pointer-events-none">
            <img className="w-full" src={lines} alt="" />
          </div>
        </div>

        {/* CTA bawah */}
        <div className="flex justify-center mt-10">
          <a className="text-xs font-code font-bold tracking-wider uppercase border-b text-white/60 hover:text-white transition" href="https://wa.me/6283120479594">
            Butuh paket custom? Hubungi kami sekarang
          </a>
        </div>

      </div>
    </Section>
  );
};

export default Pricing;