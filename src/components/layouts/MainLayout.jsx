import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import Sidebar from "../shared/sidebar/Sidebar";
import { useState } from "react";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen">
      <Navbar setIsOpen={setIsOpen} />
      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="p-4 mt-[48px] w-full bg-[#fcfcfe]">
          <div
            className="flex justify-center mx-auto min-h-screen md:pl-[256px] side-bar max-w-[1800px]"
            // max-w-[1400px]
          >
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
