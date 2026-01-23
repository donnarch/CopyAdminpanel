import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
      <div className="flex">
        <Sidebar />
        <div className="flex min-h-screen w-full flex-col">
          <Navbar />
          <main className="flex-1 p-5 sm:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
