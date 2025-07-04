import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login gagal");

      const data = await res.json();
      setToken(data.access_token);
      sessionStorage.setItem("token", data.access_token);

      navigate("/Home");
    } catch (err) {
      setError("Login gagal. Email atau password salah.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-[400px] bg-white p-6 rounded-xl shadow-md space-y-4 shadow-orange-600">
        <h1 className="text-2xl font-bold text-center text-orange-600">
          FakeStore
        </h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {token && <p className="text-green-600 text-sm">Login berhasil!</p>}

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
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

export default Index;