export default function Dashboard({ users, templates }) {
  return (
    <>
      <h1 className="text-3xl mb-6">Admin Dashboard 🔥</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111122] p-4 rounded-xl">
          <p className="text-white/50">Users</p>
          <h2 className="text-2xl">{users.length}</h2>
        </div>

        <div className="bg-[#111122] p-4 rounded-xl">
          <p className="text-white/50">Templates</p>
          <h2 className="text-2xl">{templates.length}</h2>
        </div>

        <div className="bg-[#111122] p-4 rounded-xl">
          <p className="text-white/50">Published</p>
          <h2 className="text-2xl">
            {templates.filter(t => t.status === "Published").length}
          </h2>
        </div>
      </div>
    </>
  );
}