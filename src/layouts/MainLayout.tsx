import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = () => (
  <div className="flex flex-col h-screen">
    <Header />
    <div className="flex flex-1 min-h-0">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default MainLayout;