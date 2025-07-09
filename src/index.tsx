import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  access_token: string;
}

interface UserProfile {
  id: number;
  email: string;
  name: string;
  avatar: string;
  role: string;
}

function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Email atau password salah");
      const data: LoginResponse = await res.json();
      sessionStorage.setItem("token", data.access_token);

      const profileRes = await fetch(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );
      if (!profileRes.ok) throw new Error("Gagal memuat profil");
      const profile: UserProfile = await profileRes.json();

      sessionStorage.setItem("avatar", profile.avatar);
      sessionStorage.setItem("role", profile.role);

      if (profile.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-[400px] bg-white p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-orange-600">
          Login Fakestore
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Belum punya akun?{" "}
          <a href="/signUp" className="underline text-blue-600">
            Daftar
          </a>
        </p>
      </div>
    </div>
  );
}

export default Index;
