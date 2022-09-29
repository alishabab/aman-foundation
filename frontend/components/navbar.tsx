import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Sidebar } from "./sidebar";
import { Logo } from "./logo";
import { useEffect, useState } from "react";
import Link from "next/link";
export const Navbar = () => {
  const { data: session } = useSession();

  const pathname: string =
    typeof window !== "undefined" ? window.location.pathname : "";

  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (pathname && showSidebar) {
      setShowSidebar(false);
    }
  }, [pathname]);

  useEffect(() => {});
  return (
    <nav className="w-full h-16 flex items-center justify-between px-4 fixed top-0 right-0 left-0 z-10 bg-gray-100 shadow-md">
      <Link passHref href="/">
        <a className="text-primary-600 hover:text-secondary-600">
          <Logo />
        </a>
      </Link>

      <button onClick={() => setShowSidebar((sideBar) => !sideBar)}>
        <FontAwesomeIcon
          icon={showSidebar ? faTimes : faBars}
          size="2x"
          className="text-primary-600 hover:text-secondary-600"
        />
      </button>

      <div
        className={`fixed w-full h-full left-0 top-16 ${
          showSidebar ? "translate-x-0" : "translate-x-[-100%]"
        } ease-in-out duration-300`}>
        <Sidebar user={session?.user} />
      </div>
    </nav>
  );
};
