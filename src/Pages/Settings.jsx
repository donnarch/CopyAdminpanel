import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  Save,
  User,
  Lock,
  Bell,
  Database,
} from "lucide-react";

export default function Settings() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [settings, setSettings] = useState({
    companyName: "Telefon Admin Panel",
    email: currentUser?.email || "",
    phone: "+998 90 000 00 00",
    address: "Tashkent, Uzbekistan",
    timezone: "UTC+5",
    language: "uz",
    notifications: true,
    darkMode: true,
    autoBackup: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
    setSavedMessage("Sozlamalar saqlandi!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleChangePassword = () => {
    if (password.length < 6) {
      alert("Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users"));
    users = users.map((u) =>
      u.id === currentUser.id ? { ...u, password } : u
    );
    localStorage.setItem("users", JSON.stringify(users));
    setPassword("");
    setSavedMessage("Parol o'zgartirildi!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          <SettingsIcon className="w-8 h-8" /> Sozlamalar
        </h1>
        <p className="text-slate-400">Admin panel sozlamalarini boshqaring</p>
      </div>

      {savedMessage && (
        <div className="bg-green-500/20 border border-green-500 text-green-300 p-4 rounded-lg mb-6">
          {savedMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Settings */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5" /> Kompaniya Ma'lumotlari
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  Kompaniya Nomi
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={settings.companyName}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  Manzil
                </label>
                <input
                  type="text"
                  name="address"
                  value={settings.address}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
                />
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" /> Hisob Ma'lumotlari
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  Tilni Tanlang
                </label>
                <select
                  name="language"
                  value={settings.language}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
                >
                  <option value="uz">O'zbek</option>
                  <option value="ru">Ruscha</option>
                  <option value="en">English</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  Vaqt Zone
                </label>
                <select
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white"
                >
                  <option value="UTC+5">UTC+5 (Tashkent)</option>
                  <option value="UTC+6">UTC+6</option>
                </select>
              </div>
            </div>
          </div>

          {/* Password Settings */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5" /> Parol O'zgartirish
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">
                  Yangi Parol
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Yangi parol kiriting"
                    className="w-full bg-slate-700 border border-slate-600 rounded px-4 py-2 text-white placeholder-slate-500"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? "👁" : "👁‍🗨"}
                  </button>
                </div>
              </div>
              <button
                onClick={handleChangePassword}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
              >
                Parolni O'zgartir
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Preferences */}
          <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" /> Sozlamalar
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-slate-300">Bildirishnomalar</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-slate-300">Qora rejimi</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="autoBackup"
                  checked={settings.autoBackup}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <span className="text-slate-300">Avtomatik zaxira</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            <Save className="w-5 h-5" /> Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}
