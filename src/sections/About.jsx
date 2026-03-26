import Section from "../components/Section";
import Heading from "../components/Heading";

const features = [
  {
    title: "Website Profesional",
    desc: "Desain modern dan elegan yang meningkatkan kepercayaan pelanggan.",
  },
  {
    title: "SEO Friendly",
    desc: "Website dioptimalkan agar mudah ditemukan di Google.",
  },
  {
    title: "Fast & Responsive",
    desc: "Performa cepat dan tampil sempurna di semua perangkat.",
  },
];

const About = () => {
  return (
    <Section id="about" className="relative z-2 mt-20 lg:mt-32">
      <div className="container">
        
        <Heading
          title="Solusi Website untuk Bisnis Anda"
          text="Maystudio membantu Anda membangun website profesional yang mampu meningkatkan kredibilitas dan penjualan."
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h3 className="h3 mb-4">
              Kami Bangun Website yang Siap Menghasilkan
            </h3>

            <p className="text-n-3 mb-6">
              Website bukan sekadar tampilan, tetapi alat bisnis.
              Kami fokus pada desain, performa, dan strategi agar website Anda bekerja maksimal.
            </p>

            <ul className="space-y-4">
              {features.map((item, index) => (
                <li
                  key={index}
                  className="p-4 rounded-xl bg-n-7 border border-n-6 hover:border-purple-500 transition"
                >
                  <h4 className="font-semibold text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-n-3 text-sm">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-n-7 to-n-8 border border-n-6">
              
              <h4 className="text-white text-lg mb-4">
                Kenapa Pilih Maystudio?
              </h4>

              <ul className="space-y-3 text-n-3 text-sm">
                <li>✔ Desain Modern & Profesional</li>
                <li>✔ SEO & Performance Optimized</li>
                <li>✔ Support & Maintenance</li>
                <li>✔ Konsultasi Gratis</li>
              </ul>

              <div className="mt-6 p-4 bg-n-6 rounded-lg text-center">
                <p className="text-white text-sm">
                  Siap membantu bisnis Anda naik level 🚀
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default About;