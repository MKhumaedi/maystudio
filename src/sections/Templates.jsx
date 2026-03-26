import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Backendless from "../lib/backendless";
import UploadTemplate from "../components/UploadTemplateModal";

// 🔥 AUTO IMPORT LOCAL IMAGE (fallback)
const localImages = Object.values(
  import.meta.glob("../assets/templates/*.jpg", {
    eager: true,
    import: "default",
  })
);

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [user, setUser] = useState(null);

  // 🔥 LOAD USER
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, []);

  // 🔥 LOAD DATA BACKENDLESS
  const loadTemplates = async () => {
    try {
      const data = await Backendless.Data.of("templates").find();

      // 🔥 kalau kosong → pakai local image
      if (!data.length) {
        const fallback = localImages.slice(0, 8).map((img, index) => ({
          objectId: index,
          title: `Template ${index + 1}`,
          category: "HTML5 Templates",
          image: img,
          fileUrl: "#",
        }));

        setTemplates(fallback);
      } else {
        setTemplates(data);
      }

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  return (
    <section className="relative min-h-screen px-6 lg:px-16 py-24 text-white">
      
      {/* HEADER */}
      <div className="mb-14">
        <h1 className="text-3xl lg:text-5xl font-semibold mb-3">
          Template Collection
        </h1>
        <p className="text-white/50">
          Template premium siap pakai 🚀
        </p>
      </div>

      {/* 🔥 ADMIN UPLOAD */}
      {user?.role === "Admin" && (
        <UploadTemplate onSuccess={loadTemplates} />
      )}

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {templates.map((item, index) => (
          <motion.div
            key={item.objectId || index}
            whileHover={{ scale: 1.03 }}
            className="group relative bg-[#0f0f1a] border border-white/10 rounded-xl overflow-hidden"
          >

            {/* IMAGE */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium">{item.title}</h3>
                <p className="text-xs text-white/40">{item.category}</p>
              </div>

              <a
                href={item.fileUrl || "#"}
                target="_blank"
                className="p-2 rounded-lg bg-white/5 hover:bg-purple-500 transition"
              >
                ⬇
              </a>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}