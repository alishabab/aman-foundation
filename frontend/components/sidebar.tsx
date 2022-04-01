import { NextPage } from "next";
import Link from "next/link";
interface ISidebarLink {
  title: string;
  href: string;
}
const SidebarLink: NextPage<ISidebarLink> = ({ title, href }) => {
  return (
    <Link href={href} passHref>
      <a className="block text-center text-md font-bold border-b-2 border-gray-200 last:border-b-0 first:border-t-2 text-primary-600 hover:text-primary-800 hover:bg-gray-200 py-4">
        {title}
      </a>
    </Link>
  );
};

export const Sidebar: NextPage = () => {
  return (
    <div className="w-full h-full bg-gray-100 shadow-md">
      <SidebarLink href="/about" title="About" />
      <SidebarLink href="/donate" title="Donate" />
      <SidebarLink href="/event" title="Events" />
    </div>
  );
};
