import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/SideBar";

export default function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#050C1B] text-white">

      <Sidebar />
      
      <div className="min-h-screen pl-[84px]">
        <Outlet />
      </div>

    </div>
  );
}