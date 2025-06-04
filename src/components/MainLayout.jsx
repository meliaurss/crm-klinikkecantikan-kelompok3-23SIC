import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  if (isLandingPage) {
    // Langsung render Outlet (tanpa Sidebar/Header, tanpa container yang mengubah ukuran)
    return <Outlet />;
  }

  // Halaman admin: layout tetap seperti semula
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex w-full">
      <Sidebar /> {/* Sidebar width tetap */}
      <div id="main-content" className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-7">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}