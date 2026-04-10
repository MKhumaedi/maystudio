import { useState, useCallback } from "react";
import Backendless from "../../lib/backendless";
import Cropper from "react-easy-crop";

export default function EditTemplateModal({ data, onClose, onSuccess }) {
  const [name, setName] = useState(data.name || "");
  const [category, setCategory] = useState(data.category || "");
  const [status, setStatus] = useState(data.status || "Draft");

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(data.image);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.4);
  const [rotation, setRotation] = useState(0);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  // 📥 FILE
  const handleFile = (file) => {
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 📐 CROP
  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // ✂️ GET CROPPED IMAGE
  const getCroppedImage = async () => {
    if (!image) return null;

    const img = new Image();
    img.src = preview;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const radians = (rotation * Math.PI) / 180;

    const width = croppedAreaPixels.width;
    const height = croppedAreaPixels.height;

    canvas.width = width;
    canvas.height = height;

    ctx.translate(width / 2, height / 2);
    ctx.rotate(radians);
    ctx.translate(-width / 2, -height / 2);

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      width,
      height,
      0,
      0,
      width,
      height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        const file = new File([blob], image.name, { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg");
    });
  };

  // 🚀 UPDATE
  const handleUpdate = async () => {
    setLoading(true);

    try {
      let imageUrl = data.image;

      if (image && croppedAreaPixels) {
        const croppedFile = await getCroppedImage();

        const fileName = Date.now() + "-" + croppedFile.name;

        const uploaded = await Backendless.Files.upload(
          croppedFile,
          "templates",
          true,
          fileName
        );

        imageUrl = uploaded.fileURL;
      }

      await Backendless.Data.of("Templates").save({
        objectId: data.objectId,
        name,
        category,
        status,
        image: imageUrl,
      });

      onSuccess();
      onClose();

      window.dispatchEvent(new Event("templateUpdated"));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-md bg-[#0f0f1a] rounded-2xl p-6 border border-white/10">

        <h2 className="text-xl mb-6">Edit Template</h2>

        <div className="space-y-4">

          {/* NAME */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10"
          />

          {/* CATEGORY */}
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 rounded-lg border border-white/10"
          />

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg"
          >
            <option>Draft</option>
            <option>Published</option>
          </select>

          {/* FILE */}
          <label className="flex items-center justify-between px-4 py-3 bg-white/5 border border-dashed border-white/10 rounded-lg cursor-pointer">
            <span className="text-sm text-white/60 truncate">
              {image ? image.name : "Change image"}
            </span>

            <span className="text-xs bg-purple-500 px-3 py-1 rounded-md">
              Browse
            </span>

            <input
              type="file"
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          {/* 🔥 CROP AREA */}
          {preview && (
            <>
              <div className="relative w-full h-56 bg-black rounded-lg overflow-hidden">
                <Cropper
                  image={preview}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={16 / 9}
                  objectFit="cover"
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                />
              </div>

              {/* CONTROLS */}
              <div className="space-y-3">

                {/* ZOOM */}
                <div>
                  <label className="text-xs text-white/50">Zoom</label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* ROTATE */}
                <div>
                  <label className="text-xs text-white/50">Rotate</label>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={1}
                    value={rotation}
                    onChange={(e) => setRotation(e.target.value)}
                    className="w-full"
                  />
                </div>

              </div>
            </>
          )}

        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="text-white/60">
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="bg-purple-500 px-4 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Update"}
          </button>
        </div>

      </div>
    </div>
  );
}