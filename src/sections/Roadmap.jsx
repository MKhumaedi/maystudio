import Button from "../components/Button";
import Heading from "../components/Heading";
import Section from "../components/Section";
import Tagline from "../components/Tagline";
import { check2, grid, loading1, gradient, roadmap1, roadmap2, roadmap3, roadmap4 } from "../assets";

const roadmap = [
  {
    id: "0",
    title: "Konsultasi & Analisa",
    text: "Kami memahami kebutuhan bisnis Anda, target market, dan tujuan website yang ingin dicapai.",
    date: "Step 1",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Design UI/UX",
    text: "Kami membuat desain website yang modern, user-friendly, dan sesuai dengan branding bisnis Anda.",
    date: "Step 2",
    status: "done",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Development",
    text: "Website mulai dikembangkan menggunakan teknologi modern dengan fokus pada performa dan keamanan.",
    date: "Step 3",
    status: "progress",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Launch & Support",
    text: "Website siap online dan kami tetap memberikan support untuk memastikan performa tetap optimal.",
    date: "Step 4",
    status: "progress",
    imageUrl: roadmap4,
  }
];

const Roadmap = () => (
  <Section className="overflow-hidden" id="roadmap">
    <div className="container md:pb-10">

      <Heading
        tag="Proses Kerja Kami"
        title="Bagaimana Kami Mengerjakan Website Anda"
      />

      <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">

        {roadmap.map((item) => {
          const status = item.status === "done" ? "Selesai" : "Berjalan";

          return (
            <div
              key={item.id}
              className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${
                item.colorful ? "bg-conic-gradient" : "bg-n-6"
              }`}
            >
              <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">

                <div className="absolute top-0 left-0 max-w-full">
                  <img className="w-full opacity-20" src={grid} alt="" />
                </div>

                <div className="relative z-1">

                  {/* TOP */}
                  <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                    <Tagline>{item.date}</Tagline>

                    <div className="flex items-center px-4 py-1 bg-white rounded text-n-8">
                      <img
                        className="mr-2.5"
                        src={item.status === "done" ? check2 : loading1}
                        width={16}
                        height={16}
                        alt={status}
                      />
                      <div className="tagline">{status}</div>
                    </div>
                  </div>

                  {/* IMAGE */}
                  <div className="mb-10 -my-10 -mx-15">
                    <img className="w-full" src={item.imageUrl} alt={item.title} />
                  </div>

                  {/* TEXT */}
                  <h4 className="h4 mb-4">{item.title}</h4>
                  <p className="body-2 text-n-4">{item.text}</p>

                </div>
              </div>
            </div>
          );
        })}

        {/* BACKGROUND EFFECT */}
        <div className="absolute top-[18rem] -left-[30rem] w-[56rem] opacity-50 pointer-events-none">
          <img className="w-full" src={gradient} alt="" />
        </div>

      </div>

      {/* CTA */}
      <div className="flex justify-center mt-12">
        <Button href="https://wa.me/6283120479594">
          Mulai Konsultasi
        </Button>
      </div>

    </div>
  </Section>
);

export default Roadmap;