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
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-800 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        {/* HEADER */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Telefon Admin
          </h1>
        </div>

        {/* CARD */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 sm:p-6 md:p-8">
          {/* TABS */}
          <div className="flex gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
            {["login", "register"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setAuthState(t);
                  resetForm();
                }}
                className={`flex-1 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                  authState === t
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {t === "login" ? "Kirish" : "Ro'yxat"}
              </button>
            ))}
          </div>

          {/* ALERTS */}
          {error && (
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg text-xs sm:text-sm bg-red-500/20 text-red-300 border border-red-500">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg text-xs sm:text-sm bg-green-500/20 text-green-300 border border-green-500">
              {success}
            </div>
          )}

          {/* LOGIN FORM */}
          {authState === "login" && (
            <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
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
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 sm:py-3 rounded-lg font-semibold text-white text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Kuting...
                  </span>
                ) : (
                  "Kirish"
                )}
              </button>

              <p className="text-xs text-slate-400 text-center mt-3 sm:mt-4">
                Test uchun: admin@admin.com / admin123
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {authState === "register" && (
            <form onSubmit={handleRegister} className="space-y-3 sm:space-y-4">
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
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 py-2 sm:py-3 rounded-lg font-semibold text-white text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Kuting...
                  </span>
                ) : (
                  "Ro'yxatdan o'tish"
                )}
              </button>
            </form>
          )}
        </div>

        {/* FOOTER */}
        <p className="text-center text-slate-500 text-xs sm:text-sm mt-4 sm:mt-6">
          © {new Date().getFullYear()} Telefon Admin Panel
        </p>
      </div>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */
function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" />
      <input
        {...props}
        className="w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-500"
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
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" />
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-9 sm:pl-10 pr-10 py-2 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder:text-slate-500"
        required
      />
      {toggle && (
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          aria-label={show ? "Parolni yashirish" : "Parolni ko'rsatish"}
        >
          {show ? (
            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      )}
    </div>
  );
}
