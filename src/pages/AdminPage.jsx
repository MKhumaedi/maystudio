import { useEffect, useState } from "react";
import Backendless from "../lib/backendless";

import Sidebar from "../components/Admin/Sidebar";
import AdminHeader from "../components/Admin/AdminHeader";
import Dashboard from "../components/Admin/Dashboard";
import TemplatesPage from "../components/Admin/TemplatesPage";
import UsersPage from "../components/Admin/UsersPage";

export default function AdminPage() {
  const [active, setActive] = useState("templates");

  const [users, setUsers] = useState([]);
  const [templates, setTemplates] = useState([]);

  // 🔥 LOAD TEMPLATE (FIX)
  const loadTemplates = async () => {
    try {
      const data = await Backendless.Data.of("Templates").find();

      console.log("Templates:", data); // DEBUG

      setTemplates(data || []);
    } catch (err) {
      console.error("Load template error:", err);
    }
  };

  // 🔥 LOAD USERS
  const loadUsers = async () => {
    try {
      const data = await Backendless.Data.of("Users").find();
      setUsers(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTemplates();
    loadUsers();
  }, []);

  // 🔥 DELETE TEMPLATE
  const deleteTemplate = async (id) => {
    try {
      await Backendless.Data.of("Templates").remove({ objectId: id });

      loadTemplates(); // reload data

      window.dispatchEvent(new Event("templateUpdated"));
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 DELETE USER
  const deleteUser = async (id) => {
    await Backendless.Data.of("Users").remove({ objectId: id });
    loadUsers();
  };

  // 🔥 CHANGE ROLE
  const changeRole = async (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";

    await Backendless.Data.of("Users").save({
      ...user,
      role: newRole,
    });

    loadUsers();
  };

  return (
    <div className="flex bg-[#0b0b15] min-h-screen text-white">
      <Sidebar active={active} setActive={setActive} />

      <main className="flex-1 p-6">
        <AdminHeader />

        {active === "dashboard" && (
          <Dashboard users={users} templates={templates} />
        )}

        {active === "templates" && (
          <TemplatesPage
            templates={templates}
            deleteTemplate={deleteTemplate}
            reloadTemplates={loadTemplates}
          />
        )}

        {active === "users" && (
          <UsersPage
            users={users}
            deleteUser={deleteUser}
            changeRole={changeRole}
          />
        )}
      </main>
    </div>
  );
}