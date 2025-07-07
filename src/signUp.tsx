import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar: "https://i.pravatar.cc/150?u=" + email
        })
      });

      if (!res.ok) throw new Error("Gagal mendaftar.");

      setMessage("✅ Pendaftaran berhasil! Silakan login.");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage("❌ Gagal mendaftar.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-orange-600 text-center">
          Buat Akun Baru
        </h2>

        {message && <p className="text-sm text-blue-600">{message}</p>}

        <input
          type="text"
          placeholder="Nama Lengkap"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Kata Sandi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Daftar
        </button>
      </div>
    </div>
  );
}

export default SignUp;
