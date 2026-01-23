import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, Smartphone } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ localStorage'dan users olish
  const getUsers = () => {
    const stored = localStorage.getItem("users");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            email: "admin@admin.com",
            password: "admin123",
            name: "Admin",
          },
        ];
  };

  // ✅ localStorage'ga users saqlash
  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const users = getUsers();
      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("currentUser", JSON.stringify(user));

        setSuccess("Muvaffaqiyatli kirildi!");
        setFormData({ email: "", password: "", name: "", confirmPassword: "" });

        setTimeout(() => navigate("/"), 1000);
      } else {
        setError("Email yoki parol noto'g'ri!");
      }
    } catch (err) {
      setError("Xatolik yuz berdi!");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Barcha maydonlarni to'ldiring!");
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Parollar mos kelmaydi!");
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Parol kamita 6 ta belgidan iborat bo'lishi kerak!");
        setLoading(false);
        return;
      }

      const users = getUsers();
      if (users.find((u) => u.email === formData.email)) {
        setError("Bu email allaqachon ro'yxatdan o'tgan!");
        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 800));

      const newUser = {
        id: users.length + 1,
        email: formData.email,
        password: formData.password,
        name: formData.name,
      };

      saveUsers([...users, newUser]);

      setSuccess("Ro'yxatdan o'tish muvaffaqiyatli! Endi login qiling.");
      setTimeout(() => {
        setAuthState("login");
        setFormData({ email: "", password: "", name: "", confirmPassword: "" });
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError("Ro'yxatdan o'tishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-600 p-3 rounded-lg mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Telefon Admin</h1>
          <p className="text-slate-400 mt-2">
            Telefon sotish uchun admin panel
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg border border-slate-700 p-8">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => {
                setAuthState("login");
                setFormData({
                  email: "",
                  password: "",
                  name: "",
                  confirmPassword: "",
                });
                setError("");
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                authState === "login"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Kirish
            </button>
            <button
              onClick={() => {
                setAuthState("register");
                setFormData({
                  email: "",
                  password: "",
                  name: "",
                  confirmPassword: "",
                });
                setError("");
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                authState === "register"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              Ro'yxat
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4 text-sm">
              {success}
            </div>
          )}

          {authState === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="admin@admin.com"
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Parol
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="admin123"
                    className="w-full pl-10 pr-10 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition mt-6"
              >
                {loading ? "Kuting..." : "Kirish"}
              </button>

              <p className="text-sm text-slate-400 text-center mt-4">
                Test uchun: admin@admin.com / admin123
              </p>
            </form>
          )}

          {authState === "register" && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Ism
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ismingiz"
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@example.com"
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Parol
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Parolingiz"
                    className="w-full pl-10 pr-10 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Parolni qayta kiriting
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Parolingiz"
                    className="w-full pl-10 pr-10 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition mt-6"
              >
                {loading ? "Kuting..." : "Ro'yxatdan o'tish"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          © 2024 Telefon Admin Panel. Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
}
