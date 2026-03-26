import { useState } from "react";
import Backendless from "../lib/backendless";
import toast from "react-hot-toast";

export default function UploadTemplate({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    try {
      if (!title || !category || !image) {
        return toast.error("Lengkapi semua data!");
      }

      // upload image
      const img = await Backendless.Files.upload(image, "templates", true);

      let fileUrl = "";

      // upload file optional
      if (file) {
        const f = await Backendless.Files.upload(file, "templates", true);
        fileUrl = f.fileURL;
      }

      await Backendless.Data.of("templates").save({
        title,
        category,
        image: img.fileURL,
        fileUrl,
      });

      toast.success("Template berhasil upload 🚀");

      setTitle("");
      setCategory("");
      setImage(null);
      setFile(null);

      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
      <h2 className="text-lg font-semibold mb-4">Upload Template</h2>

      <div className="space-y-3">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-black/30 text-white"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded bg-black/30 text-white"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="text-sm"
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-sm"
        />

        <button
          onClick={handleUpload}
          className="w-full py-2 bg-purple-500 hover:bg-purple-600 rounded"
        >
          Upload
        </button>
      </div>
    </div>
  );
}