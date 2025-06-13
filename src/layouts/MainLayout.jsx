import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";



export default function MainLayout() {
  return (
    <div id="app-container" className="h-screen w-screen flex overflow-hidden">
      <Sidebar />
      <div id="main-content" className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-gray-100">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

