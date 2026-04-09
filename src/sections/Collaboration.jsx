import Section from "../components/Section";
import Button from "../components/Button";
import { check, curve1, curve2 } from "../assets";

// IMPORT TECH ICONS
import html from "../assets/tech/html.png";
import css from "../assets/tech/css.png";
import javascript from "../assets/tech/js.png";
import react from "../assets/tech/react.png";
import nextjs from "../assets/tech/nextjs.png";
import nodejs from "../assets/tech/node.png";
import tailwind from "../assets/tech/tailwind.png";
import figma from "../assets/tech/figma.png";

const collabContent = [
  {
    title: "Teknologi Modern",
    text: "Kami menggunakan teknologi terbaru untuk memastikan website cepat, aman, dan scalable.",
  },
  { title: "Desain UI/UX Profesional" },
  { title: "Optimasi SEO & Performance" },
];

const techStack = [
  { title: "HTML", icon: html },
  { title: "CSS", icon: css },
  { title: "JavaScript", icon: javascript },
  { title: "React", icon: react },
  { title: "Next.js", icon: nextjs },
  { title: "Node.js", icon: nodejs },
  { title: "Tailwind", icon: tailwind },
  { title: "Figma", icon: figma },
];

const Collaboration = () => {
  return (
    <Section crosses>
      <div className="container lg:flex">

        {/* LEFT */}
        <div className="max-w-[25rem]">
          <h2 className="h2 mb-4 md:mb-8">
            Teknologi yang Kami Gunakan
          </h2>

          <ul className="max-w-[22rem] mb-10 md:mb-14">
            {collabContent.map((item, i) => (
              <li className="mb-3 py-3" key={i}>
                <div className="flex items-center">
                  <img src={check} width={24} height={24} alt="" />
                  <h6 className="body-2 ml-5">{item.title}</h6>
                </div>
                {item.text && (
                  <p className="body-2 mt-3 text-n-4">{item.text}</p>
                )}
              </li>
            ))}
          </ul>

          <Button href="https://wa.me/6283120479594">
            Konsultasi Sekarang
          </Button>
        </div>

        {/* RIGHT */}
        <div className="lg:ml-auto xl:w-[38rem] mt-4">
          <p className="body-2 mb-8 text-n-4 md:mb-16 lg:mb-32 lg:w-[22rem] lg:mx-auto text-center">
            Kami menggunakan stack teknologi modern untuk membangun website yang cepat, scalable, dan siap berkembang.
          </p>

          <div className="relative left-1/2 flex w-[22rem] aspect-square border border-n-6 rounded-full -translate-x-1/2">

            {/* CENTER LOGO */}
            <div className="flex w-60 aspect-square m-auto border border-n-6 rounded-full">
              <div className="w-[6rem] aspect-square m-auto flex items-center justify-center bg-n-8 rounded-full border border-white/10">
                <span className="text-white font-bold text-sm tracking-wide">
                  
                </span>
              </div>
            </div>

            {/* ORBIT ICON */}
            <ul>
              {techStack.map((app, index) => (
                <li
                  key={index}
                  className={`absolute top-0 left-1/2 h-1/2 -ml-[1.6rem] origin-bottom`}
                  style={{
                    transform: `rotate(${index * 45}deg)`
                  }}
                >
                  <div
                    className="relative -top-[1.6rem] flex w-[3.2rem] h-[3.2rem] bg-[#15131D] border border-white/15 rounded-xl"
                    style={{
                      transform: `rotate(-${index * 45}deg)`
                    }}
                  >
                    <img
                      className="m-auto opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300"
                      width={28}
                      height={28}
                      alt={app.title}
                      src={app.icon}
                    />
                  </div>
                </li>
              ))}
            </ul>

            {/* DECORATION */}
            <div className="hidden absolute top-1/2 right-full w-[32.625rem] -mt-1 mr-10 xl:block">
              <img src={curve1} alt="" />
            </div>

            <div className="hidden absolute top-1/2 left-full w-[10.125rem] -mt-1 ml-10 xl:block">
              <img src={curve2} alt="" />
            </div>

          </div>
        </div>
      </div>
    </Section>
  );
};

export default Collaboration;