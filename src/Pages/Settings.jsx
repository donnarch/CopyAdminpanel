import React, { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  Save,
  User,
  Lock,
  Bell,
  Database,
  Eye,
  EyeOff,
  Globe,
  Clock,
  Building,
  Phone,
  MapPin,
  Check,
} from "lucide-react";

export default function Settings() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [settings, setSettings] = useState({
    companyName: "Telefon Admin Panel",
    email: currentUser?.email || "admin@admin.com",
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode tekshirish
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveSettings = () => {
    localStorage.setItem("appSettings", JSON.stringify(settings));
    setSavedMessage("✅ Sozlamalar saqlandi!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const handleChangePassword = () => {
    if (password.length < 6) {
      setSavedMessage("❌ Parol kamida 6 ta belgidan iborat bo'lishi kerak!");
      setTimeout(() => setSavedMessage(""), 3000);
      return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map((u) =>
      u.id === currentUser?.id ? { ...u, password } : u
    );
    localStorage.setItem("users", JSON.stringify(users));
    setPassword("");
    setSavedMessage("✅ Parol muvaffaqiyatli o'zgartirildi!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  // Border va background ranglari
  const borderColor = isDarkMode ? "border-zinc-800" : "border-zinc-300";
  const bgColor = isDarkMode ? "bg-zinc-900" : "bg-white";
  const textColor = isDarkMode ? "text-white" : "text-zinc-900";
  const secondaryText = isDarkMode ? "text-zinc-400" : "text-zinc-600";
  const inputBg = isDarkMode ? "bg-zinc-800" : "bg-white";
  const inputBorder = isDarkMode ? "border-zinc-700" : "border-zinc-300";
  const cardBg = isDarkMode ? "bg-zinc-800/50" : "bg-zinc-50";

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${bgColor} ${textColor}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600 text-white">
                <SettingsIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Sozlamalar</h1>
                <p className={`text-sm ${secondaryText}`}>
                  Platforma va hisob sozlamalari
                </p>
              </div>
            </div>
          </div>
          {/* Success Message */}
          {savedMessage && (
            <div
              className={`mb-4 p-3 sm:p-4 rounded-lg ${
                savedMessage.includes("✅")
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-red-500/10 border border-red-500/30 text-red-400"
              }`}
            >
              <div className="flex items-center gap-2">
                {savedMessage.includes("✅") ? "✓" : "✗"}
                <span className="text-sm">
                  {savedMessage.replace("✅", "").replace("❌", "")}
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column - Main Settings */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Company Settings */}
            <div
              className={`rounded-xl ${borderColor} border p-4 sm:p-6 ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold">
                  Kompaniya Ma'lumotlari
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${secondaryText}`}
                  >
                    Kompaniya Nomi
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg px-4 py-2.5 text-sm border ${inputBorder} ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${secondaryText}`}
                  >
                    Telefon Raqami
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={settings.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border ${inputBorder} ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${secondaryText}`}
                  >
                    Manzil
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      name="address"
                      value={settings.address}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border ${inputBorder} ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div
              className={`rounded-xl ${borderColor} border p-4 sm:p-6 ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold">
                  Hisob Ma'lumotlari
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${secondaryText}`}
                  >
                    Email Manzili
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg px-4 py-2.5 text-sm border ${inputBorder} ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${secondaryText}`}
                    >
                      Tizim Tili
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <select
                        name="language"
                        value={settings.language}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-8 py-2.5 rounded-lg text-sm border ${inputBorder} ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none`}
                      >
                        <option value="uz">🇺🇿 O'zbek</option>
                        <option value="ru">🇷🇺 Русский</option>
                        <option value="en">🇺🇸 English</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${secondaryText}`}
                    >
                      Vaqt Zonasi
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <select
                        name="timezone"
                        value={settings.timezone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-8 py-2.5 rounded-lg text-sm border ${inputBorder} ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none`}
                      >
                        <option value="UTC+5">UTC+5 (Tashkent)</option>
                        <option value="UTC+6">UTC+6</option>
                        <option value="UTC+3">UTC+3</option>
                        <option value="UTC+0">UTC+0</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Settings */}
            <div
              className={`rounded-xl ${borderColor} border p-4 sm:p-6 ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-2 rounded-lg bg-red-500/20 text-red-400">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold">
                  Parol O'zgartirish
                </h2>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${secondaryText}`}
                  >
                    Yangi Parol
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Kamida 6 ta belgi kiriting"
                      className={`w-full pl-10 pr-10 py-2.5 rounded-lg text-sm border ${inputBorder} ${inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-zinc-500`}
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                      type="button"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleChangePassword}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-2.5 rounded-lg transition-all text-sm sm:text-base"
                >
                  Parolni Yangilash
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Preferences */}
          <div className="space-y-4 sm:space-y-6">
            {/* Preferences Card */}
            <div
              className={`rounded-xl ${borderColor} border p-4 sm:p-6 ${cardBg}`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold">Imtiyozlar</h2>
              </div>

              <div className="space-y-4">
                {/* Notification Toggle */}
                <div
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode
                      ? "bg-zinc-800"
                      : "bg-white border border-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Bell className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Bildirishnomalar</p>
                      <p className={`text-xs ${secondaryText}`}>
                        Xabarlarni yoqish/o'chirish
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={settings.notifications}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 rounded-full peer ${
                        settings.notifications
                          ? "bg-blue-600"
                          : isDarkMode
                          ? "bg-zinc-700"
                          : "bg-zinc-300"
                      } peer-focus:ring-2 peer-focus:ring-blue-300 transition-colors`}
                    ></div>
                    <div
                      className={`absolute left-0.5 top-0.5 bg-white border border-zinc-300 rounded-full h-5 w-5 transition-transform ${
                        settings.notifications ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </label>
                </div>

                {/* Dark Mode Toggle */}
                <div
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode
                      ? "bg-zinc-800"
                      : "bg-white border border-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-500/10">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            isDarkMode ? "bg-yellow-400" : "bg-gray-400"
                          }`}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Qora Rejim</p>
                      <p className={`text-xs ${secondaryText}`}>
                        Temani o'zgartirish
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="darkMode"
                      checked={settings.darkMode}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 rounded-full peer ${
                        settings.darkMode
                          ? "bg-gray-800"
                          : isDarkMode
                          ? "bg-zinc-700"
                          : "bg-zinc-300"
                      } peer-focus:ring-2 peer-focus:ring-gray-300 transition-colors`}
                    ></div>
                    <div
                      className={`absolute left-0.5 top-0.5 bg-white border border-zinc-300 rounded-full h-5 w-5 transition-transform ${
                        settings.darkMode ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </label>
                </div>

                {/* Auto Backup Toggle */}
                <div
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode
                      ? "bg-zinc-800"
                      : "bg-white border border-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Database className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Avtomatik Zaxira</p>
                      <p className={`text-xs ${secondaryText}`}>
                        Ma'lumotlarni avto-saqlash
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="autoBackup"
                      checked={settings.autoBackup}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 rounded-full peer ${
                        settings.autoBackup
                          ? "bg-green-600"
                          : isDarkMode
                          ? "bg-zinc-700"
                          : "bg-zinc-300"
                      } peer-focus:ring-2 peer-focus:ring-green-300 transition-colors`}
                    ></div>
                    <div
                      className={`absolute left-0.5 top-0.5 bg-white border border-zinc-300 rounded-full h-5 w-5 transition-transform ${
                        settings.autoBackup ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button Card */}
            <div
              className={`rounded-xl ${borderColor} border p-4 sm:p-6 ${cardBg}`}
            >
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">
                    Sozlamalarni Saqlash
                  </h3>
                </div>
                <button
                  onClick={handleSaveSettings}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-sm sm:text-base shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  <span>Barcha Sozlamalarni Saqlash</span>
                </button>
                <p className={`text-xs text-center ${secondaryText}`}>
                  ⚠️ Sozlamalar avtomatik saqlanmaydi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
