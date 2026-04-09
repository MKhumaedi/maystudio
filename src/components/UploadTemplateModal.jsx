import { useState, useEffect, useCallback } from "react";
import Backendless from "../lib/backendless";
import Cropper from "react-easy-crop";

export default function UploadTemplate({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // 🔥 AUTH STATE (FIX)
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // 🔥 CEK USER REALTIME
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await Backendless.UserService.getCurrentUser();

        if (currentUser && currentUser.role?.toLowerCase() === "admin") {
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setReady(true);
      }
    };

    checkUser();

    const handleStorage = () => {
      checkUser();
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // 🔥 SELECT IMAGE
  const onSelectImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  // 🔥 SAVE CROP AREA
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // 🔥 CROP IMAGE
  const getCroppedImg = async () => {
    const img = new Image();
    img.src = image;

    await new Promise((resolve) => (img.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  };

  // 🔥 VALIDASI
  const validate = () => {
    if (!title || !category) {
      alert("Isi semua field");
      return false;
    }

    if (!imageFile) {
      alert("Upload gambar dulu");
      return false;
    }

    return true;
  };

  // 🔥 UPLOAD
  const handleUpload = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      const croppedBlob = await getCroppedImg();

      const file = new File([croppedBlob], `template-${Date.now()}.jpg`, {
        type: "image/jpeg",
      });

      const imageRes = await Backendless.Files.upload(
        file,
        "templates/images/"
      );

      await Backendless.Data.of("templates").save({
        title,
        category,
        image: imageRes.fileURL,
      });

      alert("Upload berhasil 🚀");

      setTitle("");
      setCategory("");
      setImage(null);
      setImageFile(null);

      onSuccess && onSuccess();

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert(err.message || "Upload gagal ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 GUARD (PALING PENTING)
  if (!ready || !user) return null;

  return (
    <div className="mb-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)]">

      <h2 className="text-2xl font-semibold mb-8">
        Upload Template 🚀
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="space-y-5">

          <input
            placeholder="Template Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#1a1a2e]/80 border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#1a1a2e]/80 border border-white/10 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition"
          />

          <div>
            <p className="text-sm text-white/50 mb-2">Thumbnail</p>
            <input
              type="file"
              accept="image/*"
              onChange={onSelectImage}
              className="w-full text-sm file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-purple-500/20 file:text-purple-400 hover:file:bg-purple-500/30 transition"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition shadow-lg shadow-purple-500/20"
          >
            {loading ? "Uploading..." : "Upload Template"}
          </button>
        </div>

        {/* RIGHT */}
        <div className="bg-[#090912]/80 border border-white/10 rounded-2xl p-5">

          <p className="text-sm text-white/50 mb-3">Preview</p>

          <div className="relative h-[220px] bg-black/40 rounded-xl overflow-hidden border border-white/10">
            {image ? (
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={16 / 10}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
                Upload image to preview
              </div>
            )}
          </div>

          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full mt-4 accent-purple-500"
          />

          <div className="mt-5">
            <h3 className="text-sm font-medium">
              {title || "Template Title"}
            </h3>
            <p className="text-xs text-white/40">
              {category || "Category"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}