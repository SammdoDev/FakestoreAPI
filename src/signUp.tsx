import  { useState } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
};

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u: User) => u.email === email)) {
      setMessage("Email sudah terdaftar.");
      return;
    }

    const newUser: User = {
      name,
      email,
      password,
      role: email === "admin@mail.com" ? "admin" : "user"
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Pendaftaran berhasil! Silakan login.");
    setTimeout(() => navigate("/"), 1500);
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
