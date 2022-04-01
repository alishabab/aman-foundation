import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Sidebar } from "./sidebar";
import { useState } from "react";
export const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <nav className="w-full h-16 flex items-center justify-between px-4 fixed top-0 right-0 left-0 bg-gray-100 shadow-md">
      <div className="flex items-center">
        <Image
          className="border border-indigo-600"
          src="/assets/images/hands.svg"
          width={64}
          height={64}
          alt="logo"
        />
        <h4 className="text-primary-600 text-xl font-bold">Aman Foundation</h4>
      </div>
      <button onClick={() => setShowSidebar((sideBar) => !sideBar)}>
        <FontAwesomeIcon
          icon={showSidebar ? faTimes : faBars}
          size="2x"
          className="text-primary-600"
        />
      </button>

      <div
        className={`fixed w-11/12 h-full left-0 top-16 ${
          showSidebar ? "translate-x-0" : "translate-x-[-100%]"
        } ease-in-out duration-300`}>
        <Sidebar />
      </div>
    </nav>
  );
};
