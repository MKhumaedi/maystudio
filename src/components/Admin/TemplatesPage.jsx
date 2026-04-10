import { useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import UploadTemplateModal from "../UploadTemplateModal";
import EditTemplateModal from "./EditTemplateModal";

export default function TemplatesPage({
  templates,
  deleteTemplate,
  reloadTemplates,
}) {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);

  // ✅ STATE BARU
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // 🔍 FILTER
  const filtered = templates.filter((t) =>
    (t.name || t.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const sorted = [...filtered];

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Templates</h2>

        <div className="flex gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search template..."
              className="bg-[#111122] pl-9 pr-3 py-2 rounded-lg text-sm"
            />
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-purple-500 px-4 py-2 rounded-lg text-sm"
          >
            + Add Template
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#111122] rounded-xl overflow-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">Preview</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th className="text-right pr-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {sorted.length > 0 ? (
              sorted.map((t) => (
                <tr key={t.objectId} className="border-t border-white/10">
                  <td className="p-3">
                    <img
                      src={t.image || "https://via.placeholder.com/60"}
                      className="w-16 h-10 object-cover rounded"
                    />
                  </td>

                  <td>{t.name || t.title || "-"}</td>
                  <td>{t.category || "-"}</td>

                  <td>
                    <span className="text-xs px-2 py-1 bg-white/10 rounded">
                      {t.status || "Draft"}
                    </span>
                  </td>

                  <td className="text-right pr-4">

                    {/* ✅ EDIT FIX */}
                    <button
                      onClick={() => setEditData(t)}
                      className="text-blue-400 mr-3"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* ✅ DELETE FIX */}
                    <button
                      onClick={() => setDeleteId(t.objectId)}
                      className="text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>

                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-white/40">
                  No templates found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔥 ADD MODAL */}
      {openModal && (
        <UploadTemplateModal
          onClose={() => setOpenModal(false)}
          onSuccess={() => {
            reloadTemplates();
            setOpenModal(false);
          }}
        />
      )}

      {/* 🔥 EDIT MODAL (FIX) */}
      {editData && (
        <EditTemplateModal
          data={editData}
          onClose={() => setEditData(null)}
          onSuccess={() => {
            reloadTemplates();
            setEditData(null);
          }}
        />
      )}

      {/* 🔥 DELETE CONFIRM MODAL (FIX) */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#0f0f1a] p-6 rounded-xl w-full max-w-sm border border-white/10">

            <h3 className="text-lg mb-4">Delete Template</h3>

            <p className="text-sm text-white/60 mb-6">
              Are you sure you want to delete this template?
            </p>

            <div className="flex justify-end gap-3">

              {/* NO */}
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-white/60 hover:text-white"
              >
                No
              </button>

              {/* YES */}
              <button
                onClick={async () => {
                  await deleteTemplate(deleteId);
                  setDeleteId(null);
                }}
                className="px-4 py-2 bg-red-500 rounded-lg"
              >
                Yes, Delete
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}