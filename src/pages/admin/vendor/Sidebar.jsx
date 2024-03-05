import React, { useState } from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";

const Sidebar = ({ togglePanel }) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const handlePanelClick = (panel) => {
    togglePanel(panel);
    closeSidebar();
  };

  return (
    <>
      {/* Mobile toggle button (hidden on desktop) */}
      <button
        className="md:hidden fixed top-2 left-4 p-2 z-50 bg-white text-black rounded-md"
        onClick={toggleMobileSidebar}
      >
        {isMobileSidebarOpen ? (
          <RiCloseLine size={20} />
        ) : (
          <RiMenuLine size={20} />
        )}
      </button>

      {/* Sidebar visible on desktop */}
      <div
        className={`
        hidden md:flex flex-col fixed left-0 top-0 w-60 h-full bg-gray-900 p-3 z-50 sidebar-menu
      `}
      >
        {/* <div className="fixed  w-64 h-full bg-sky-800 z-50 sidebar-menu transition-transform"> */}
        <div className="sidebar-log bg-white top-0 w-52 p-4 rounded-b-2xl">
          <a
            href="/"
            className="flex items-center pb-4 border-b bg-white border-1 "
          >
            <img
              src="https://maharashtrarentagreement.com/assets/images/land-logo.png"
              alt=""
              className="inline-block w-60 h-15"
            />
          </a>
        </div>

        <ul className="mt-3">
          <li className="mb-1 group">
            <div
              className="flex items-center px-4 text-xl text-white hover:text-white rounded-md group-[.active]:bg-white group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
              onClick={() => handlePanelClick("dashboard")}
            >
              <FaTachometerAlt className="mr-3 " />
              <span className="text-sm"> Dashboard</span>
            </div>
          </li>

          <li className="mb-1 group">
            <div
              className="flex items-center py-3 px-4 text-xl text-gray-300 hover:text-white rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
              onClick={() => handlePanelClick("Agreements")}
            >
              <IoNewspaperOutline className="mr-3" />
              <span className="text-sm">Agreements</span>
              <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
            </div>
          </li>
        </ul>
      </div>

      {/* Mobile sidebar (hidden on desktop) */}
      <div
        className={` fixed left-0 top-0 w-full h-full bg-slate-900 p-4 z-50 sidebar-menu transition-transform
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex justify-between">
          <div className="sidebar-log bg-white w-25 p-4 rounded-b-2xl hidden md:block ">
            <a
              href="/"
              className="flex items-center pb-4 border-b bg-white border-1 "
            >
              <img
                src="https://maharashtrarentagreement.com/assets/images/land-logo.png"
                alt=""
                className="inline-block w-60 h-15 "
              />
            </a>
          </div>
          <button
            className="text-gray-300 hover:text-white mb-10"
            onClick={closeSidebar}
          >
            <RiCloseLine size={20} />
          </button>
        </div>

        <ul className="mt-3">
          <li className="mb-1 group">
            <div
              className="flex items-center px-4 text-xl text-white hover:text-white rounded-md group-[.active]:bg-white group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
              onClick={() => handlePanelClick("dashboard")}
            >
              <FaTachometerAlt className="mr-3 " />
              <span className="text-sm"> Dashboard</span>
            </div>
          </li>

          <li className="mb-1 group">
            <div
              className="flex items-center py-3 px-4 text-xl text-gray-300 hover:text-white rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100 sidebar-dropdown-toggle"
              onClick={() => handlePanelClick("Agreements")}
            >
              <IoNewspaperOutline className="mr-3" />
              <span className="text-sm">Agreements</span>
              <i className="ri-arrow-right-s-line ml-auto group-[.selected]:rotate-90" />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
