import { useEffect, useState } from "react";
import { Menu, Pencil, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
};

const ListUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Gagal memuat user:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    try {
      const token = sessionStorage.getItem("token");
      await fetch(`https://api.escuelajs.co/api/v1/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Gagal menghapus user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();

    const role = sessionStorage.getItem("role");
    if (role !== "admin") navigate("/");
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        handleNavigate={handleNavigate}
        handleLogout={handleLogout}
      />

      <div className="flex-1 w-full lg:ml-0">
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800">List Users</h2>
          <div className="w-10" />
        </div>

        <main className="flex-1 p-4 max-h-screen sm:p-6 lg:p-10 overflow-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Daftar Users
            </h2>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-700">
                    <th className="p-4">Avatar</th>
                    <th className="p-4">Nama</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                      </td>
                      <td className="p-4">{user.name}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4 capitalize">{user.role}</td>
                      <td className="p-4 flex space-x-2 justify-center">
                        <button
                          onClick={() => alert("Edit belum diimplementasikan")}
                          className="bg-blue-600 text-white px-3 py-2 rounded"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {users.length === 0 && (
                <p className="text-center py-8 text-gray-500">
                  Belum ada user.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ListUsers;
