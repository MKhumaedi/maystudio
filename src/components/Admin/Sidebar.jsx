export default function Sidebar({ active, setActive }) {
  const menu = [
    { id: "dashboard", label: "Dashboard" },
    { id: "templates", label: "Templates" },
    { id: "users", label: "Users" },
  ];

  return (
    <aside className="w-64 bg-[#0f0f1a] border-r border-white/10 p-6">
      <h2 className="text-xl font-bold mb-6 text-white">Admin Panel</h2>

      <nav className="flex flex-col gap-3">
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`text-left px-3 py-2 rounded-lg transition ${
              active === item.id
                ? "bg-purple-500/20 text-purple-400"
                : "text-white/70 hover:bg-white/5"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}