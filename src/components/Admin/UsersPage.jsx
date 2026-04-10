export default function UsersPage({ users, changeRole, deleteUser }) {
  return (
    <>
      <h2 className="text-xl mb-4">Users</h2>

      <div className="bg-[#111122] rounded-xl overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="p-3 text-left">Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.objectId} className="border-t border-white/10">
                <td className="p-3">{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    onClick={() => changeRole(u)}
                    className="text-yellow-400 mr-3"
                  >
                    Toggle Role
                  </button>

                  <button
                    onClick={() => deleteUser(u.objectId)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}