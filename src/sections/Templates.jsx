import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Backendless from "../lib/backendless";
import UploadTemplate from "../components/UploadTemplateModal";
import TemplateActions from "../components/TemplateActions";

// fallback image
const localImages = Object.values(
  import.meta.glob("../assets/templates/*.jpg", {
    eager: true,
    import: "default",
  })
);

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  // 🔥 EDIT STATE
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    category: "",
  });

  // 🔥 CATEGORY STATE
  const [selectedCategory, setSelectedCategory] = useState("All");

  // 🔥 LOAD USER
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await Backendless.UserService.getCurrentUser();
        setUser(currentUser || null);
      } catch {
        setUser(null);
      } finally {
        setAuthReady(true);
      }
    };

    loadUser();

    const handleStorage = () => loadUser();
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // 🔥 LOAD TEMPLATE
  const loadTemplates = useCallback(async () => {
    try {
      const data = await Backendless.Data.of("templates").find();

      if (data && data.length > 0) {
        setTemplates(data.reverse());
      } else {
        const fallback = localImages.slice(0, 8).map((img, index) => ({
          objectId: `fallback-${index}`,
          title: `Template ${index + 1}`,
          category: "HTML5 Templates",
          image: img,
        }));

        setTemplates(fallback);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  // 🔥 CATEGORY LIST
  const categories = [
    "All",
    ...Array.from(
      new Set(templates.map((t) => t.category || "Other"))
    ).sort(),
  ];

  // 🔥 FILTER
  const filteredTemplates =
    selectedCategory === "All"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    if (!confirm("Yakin mau delete template ini?")) return;

    try {
      await Backendless.Data.of("templates").remove(id);
      alert("Deleted ✅");
      loadTemplates();
    } catch (err) {
      console.error(err);
      alert("Delete gagal ❌");
    }
  };

  // 🔥 EDIT
  const handleEdit = (item) => {
    setEditingId(item.objectId);
    setEditData({
      title: item.title || "",
      category: item.category || "",
    });
  };

  // 🔥 UPDATE
  const handleUpdate = async (item) => {
    try {
      await Backendless.Data.of("templates").save({
        objectId: item.objectId,
        title: editData.title,
        category: editData.category,
      });

      alert("Update berhasil ✅");

      setEditingId(null);
      loadTemplates();
    } catch (err) {
      console.error(err);
      alert("Update gagal ❌");
    }
  };

  // 🔥 DOWNLOAD IMAGE
  const handleDownload = async (item) => {
    try {
      const response = await fetch(item.image);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${item.title?.replace(/\s+/g, "-") || "template"}.jpg`;

      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Gagal download gambar ❌");
    }
  };

  if (!authReady) return null;

  return (
    <section className="relative min-h-screen px-6 lg:px-16 py-24 text-white">

      {/* HEADER */}
      <div className="mb-14 text-center">
        <h1 className="text-3xl lg:text-5xl font-semibold mb-3">
          Template Collection
        </h1>
        <p className="text-white/50">
          Template premium siap pakai 🚀
        </p>
      </div>

      {/* 🔥 CATEGORY FILTER */}
      <div className="flex justify-center mb-10 flex-wrap gap-3">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ADMIN */}
      {user && user.role?.toLowerCase() === "admin" && (
        <UploadTemplate onSuccess={loadTemplates} />
      )}

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {filteredTemplates.map((item, index) => (
          <motion.div
            key={item.objectId || index}
            whileHover={{ scale: 1.03 }}
            className="group relative bg-[#0f0f1a] border border-white/10 rounded-xl overflow-hidden hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition"
          >

            {/* IMAGE */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={item.image || localImages[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* CONTENT */}
            <div className="p-4 flex justify-between items-center">
              
              {/* EDIT MODE */}
              {editingId === item.objectId ? (
                <div className="flex flex-col gap-2 w-full">
                  <input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                    className="text-sm bg-white/10 px-2 py-1 rounded"
                  />
                  <input
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                    className="text-xs bg-white/10 px-2 py-1 rounded"
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-sm font-medium">
                    {item.title || "Untitled"}
                  </h3>
                  <p className="text-xs text-white/40">
                    {item.category || "-"}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2">

                {/* DOWNLOAD */}
                <button
                  onClick={() => handleDownload(item)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-purple-500 transition"
                >
                  ⬇
                </button>

                {/* ADMIN ACTION */}
                {user && user.role?.toLowerCase() === "admin" && (
                  <TemplateActions
                    isEditing={editingId === item.objectId}
                    onEdit={() => handleEdit(item)}
                    onUpdate={() => handleUpdate(item)}
                    onDelete={() => handleDelete(item.objectId)}
                  />
                )}

              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}