import Section from "../components/Section";
import Heading from "../components/Heading";
import {
  service1,
  service2,
  service3,
  check,
  gradient,
} from "../assets";
import ChatBubbleWing from "../assets/svg/ChatBubbleWing";

const Services = () => {
  return (
    <Section id="how-to-use">
      <div className="container">

        {/* HEADING */}
        <Heading
          title="Layanan Pembuatan Website Profesional"
          text="Kami membantu bisnis Anda tampil lebih profesional dengan website modern, cepat, dan siap menghasilkan."
        />

        <div className="relative">

          {/* 🔥 MAIN SERVICE */}
          <div className="relative z-1 flex items-center h-[39rem] mb-5 p-8 border border-white/10 rounded-3xl overflow-hidden lg:p-20 xl:h-[46rem]">
            
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none md:w-3/5">
              <img className="w-full h-full object-cover md:object-right" src={service1} />
            </div>

            <div className="relative z-1 max-w-[17rem] ml-auto">
              <h4 className="h4 mb-4">Website Company Profile</h4>

              <p className="body-2 mb-[3rem] text-n-3">
                Bangun kepercayaan bisnis Anda dengan website profesional yang modern dan elegan.
              </p>

              <ul className="body-2">
                <li className="flex items-start py-4 border-t border-n-6">
                  <img width={24} height={24} src={check} />
                  <p className="ml-4">Desain premium & modern</p>
                </li>
                <li className="flex items-start py-4 border-t border-n-6">
                  <img width={24} height={24} src={check} />
                  <p className="ml-4">Responsive semua device</p>
                </li>
                <li className="flex items-start py-4 border-t border-n-6">
                  <img width={24} height={24} src={check} />
                  <p className="ml-4">Optimasi kecepatan</p>
                </li>
              </ul>
            </div>

            {/* FLOATING TEXT */}
            <div className="flex items-center px-6 py-3 bg-n-8/80 rounded-xl absolute bottom-6 left-6 border border-white/10 text-sm">
              Website siap online 🚀
            </div>
          </div>

          {/* 🔥 GRID SERVICES */}
          <div className="relative z-1 grid gap-5 lg:grid-cols-2">

            {/* LEFT */}
            <div className="relative min-h-[39rem] border border-white/10 rounded-3xl overflow-hidden">
              
              <img src={service2} className="h-full w-full object-cover" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-b from-transparent to-n-8/90">
                <h4 className="h4 mb-4">Landing Page Conversion</h4>
                <p className="body-2 text-n-3">
                  Landing page yang dirancang untuk meningkatkan penjualan dan menghasilkan leads.
                </p>
              </div>

              {/* CHAT STYLE */}
              <div className="absolute top-8 right-8 px-6 py-4 bg-black rounded-xl font-code text-sm">
                "Website saya bisa closing?"
                <ChatBubbleWing className="absolute left-full bottom-0" />
              </div>
            </div>

            {/* RIGHT */}
            <div className="p-6 bg-[#15131D] rounded-3xl overflow-hidden lg:min-h-[46rem]">

              <div className="mb-8">
                <h4 className="h4 mb-4">Website Custom & Web App</h4>
                <p className="body-2 text-n-3">
                  Kami membangun sistem website sesuai kebutuhan bisnis Anda, dari dashboard hingga sistem kompleks.
                </p>
              </div>

              {/* FEATURES */}
              <ul className="space-y-4 mb-10">
                <li className="flex items-center">
                  <img src={check} width={20} />
                  <span className="ml-3">Dashboard Admin</span>
                </li>
                <li className="flex items-center">
                  <img src={check} width={20} />
                  <span className="ml-3">Integrasi API</span>
                </li>
                <li className="flex items-center">
                  <img src={check} width={20} />
                  <span className="ml-3">Payment Gateway</span>
                </li>
              </ul>

              {/* VISUAL */}
              <div className="relative h-[20rem] rounded-xl overflow-hidden">
                <img src={service3} className="w-full h-full object-cover" />

                <div className="absolute bottom-6 left-6 px-5 py-3 bg-n-6 rounded-xl text-sm">
                  Sistem siap digunakan ✔
                </div>
              </div>

            </div>

          </div>

          {/* BACKGROUND EFFECT */}
          <div className="absolute top-0 -left-[10rem] w-[56rem] opacity-40 pointer-events-none">
            <img src={gradient} />
          </div>

        </div>
      </div>
    </Section>
  );
};

export default Services;