import { useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  avatar: string;
  role?: string;
};

function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/users");
      const users: User[] = await res.json();

      const user = users.find((u) => u.email === email);

      if (!user) {
        setError("Email tidak ditemukan.");
        return;
      }

      sessionStorage.setItem("token", "fake-token");
      sessionStorage.setItem("role", email === "admin@mail.com" ? "admin" : "user");

      navigate(email === "admin@mail.com" ? "/dashboard" : "/home");
    } catch (err) {
      setError("Terjadi kesalahan saat login.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-[400px] bg-white p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-orange-600">
          Login Aplikasi
        </h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Belum punya akun?{" "}
          <a href="/signUp" className="underline text-blue-600">Daftar</a>
        </p>
      </div>
    </div>
  );
}

export default Index;
