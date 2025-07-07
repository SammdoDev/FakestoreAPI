import { useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    const user = users.find((u: User) => u.email === email && u.password === password);

    if (!user) {
      setError("Email atau password salah.");
      return;
    }

    sessionStorage.setItem("token", "local-token");
    sessionStorage.setItem("role", user.role);

    if (user.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/home");
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

        <p>
          Belum punya akun?{" "}
          <a href="/signUp" className="underline text-blue-600">Daftar</a>
        </p>
      </div>
    </div>
  );
}

export default Login;