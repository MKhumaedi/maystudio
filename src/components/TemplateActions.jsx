import { Pencil, Trash2, Save } from "lucide-react";

export default function TemplateActions({
  isEditing,
  onEdit,
  onDelete,
  onUpdate,
}) {
  return (
    <div className="flex items-center gap-2">

      {/* 🔥 CONDITIONAL: EDIT / SAVE */}
      {isEditing ? (
        <button
          onClick={onUpdate}
          className="p-2 rounded-lg bg-white/5 hover:bg-green-500/20 transition group"
        >
          <Save
            size={16}
            className="text-white/70 group-hover:text-green-400"
          />
        </button>
      ) : (
        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-white/5 hover:bg-blue-500/20 transition group"
        >
          <Pencil
            size={16}
            className="text-white/70 group-hover:text-blue-400"
          />
        </button>
      )}

      {/* DELETE */}
      <button
        onClick={onDelete}
        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 transition group"
      >
        <Trash2
          size={16}
          className="text-white/70 group-hover:text-red-400"
        />
      </button>

    </div>
  );
}