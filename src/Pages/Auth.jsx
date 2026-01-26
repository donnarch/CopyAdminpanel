import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Smartphone } from "lucide-react";

const EMPTY_FORM = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
};

export default function Auth() {
  const navigate = useNavigate();

  const [authState, setAuthState] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ---------- USERS ---------- */
  const getUsers = () =>
    JSON.parse(localStorage.getItem("users")) || [
      {
        id: 1,
        email: "admin@admin.com",
        password: "admin123",
        name: "Admin",
      },
    ];

  const saveUsers = (users) =>
    localStorage.setItem("users", JSON.stringify(users));

  /* ---------- HANDLERS ---------- */
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setError("");
    setSuccess("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const users = getUsers();
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (!user) {
      setError("Email yoki parol noto'g'ri!");
      setLoading(false);
      return;
    }

    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    setSuccess("Muvaffaqiyatli kirildi!");
    resetForm();

    setTimeout(() => navigate("/"), 800);
    setLoading(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("Barcha maydonlarni to'ldiring!");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Parollar mos kelmaydi!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      setLoading(false);
      return;
    }

    const users = getUsers();
    if (users.some((u) => u.email === email)) {
      setError("Bu email allaqachon mavjud!");
      setLoading(false);
      return;
    }

    saveUsers([...users, { id: users.length + 1, name, email, password }]);

    setSuccess("Ro'yxatdan o'tildi! Endi login qiling.");
    setTimeout(() => {
      setAuthState("login");
      resetForm();
    }, 1500);

    setLoading(false);
  };

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-600 p-3 rounded-lg mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Telefon Admin</h1>
          <p className="text-slate-400 mt-2">Telefon sotish admin paneli</p>
        </div>

        {/* CARD */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          {/* TABS */}
          <div className="flex gap-4 mb-8">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setAuthState(t);
                  resetForm();
                }}
                className={`flex-1 py-2 rounded-lg font-semibold transition ${
                  authState === t
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {t === "login" ? "Kirish" : "Ro'yxat"}
              </button>
            ))}
          </div>

          {/* ALERTS */}
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-red-500/20 text-red-300 border border-red-500">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg text-sm bg-green-500/20 text-green-300 border border-green-500">
              {success}
            </div>
          )}

          {/* LOGIN */}
          {authState === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                icon={Mail}
                name="email"
                type="email"
                placeholder="admin@admin.com"
                value={formData.email}
                onChange={handleInputChange}
              />

              <PasswordInput
                value={formData.password}
                onChange={handleInputChange}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
              />

              <button
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold text-white"
              >
                {loading ? "Kuting..." : "Kirish"}
              </button>

              <p className="text-xs text-slate-400 text-center">
                admin@admin.com / admin123
              </p>
            </form>
          )}

          {/* REGISTER */}
          {authState === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                icon={User}
                name="name"
                placeholder="Ismingiz"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                icon={Mail}
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
              <PasswordInput
                value={formData.password}
                onChange={handleInputChange}
                show={showPassword}
                toggle={() => setShowPassword(!showPassword)}
              />
              <PasswordInput
                name="confirmPassword"
                placeholder="Parolni qayta kiriting"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                show={showPassword}
              />

              <button
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold text-white"
              >
                {loading ? "Kuting..." : "Ro'yxatdan o'tish"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          © 2024 Telefon Admin Panel
        </p>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */
function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
      <input
        {...props}
        className="w-full  pl-10 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 outline-none"
        required
      />
    </div>
  );
}

function PasswordInput({
  name = "password",
  value,
  onChange,
  show,
  toggle,
  placeholder = "Parol",
}) {
  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 outline-none"
        required
      />
      {toggle && (
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      )}
    </div>
  );
}
