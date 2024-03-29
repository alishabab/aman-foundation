import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import { User } from "types";
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

const LoggedInUserInfo = ({ image, name, email }: User) => {
  const src = image || "/assets/images/avatar.png";
  return (
    <div className="flex items-center px-8 py-4 border-b-2 border-gray-200 ">
      <Image
        loader={() => src}
        className="rounded-full"
        src={src}
        width={64}
        height={64}
        blurDataURL={src}
        alt="avatar"
      />
      <div className="pl-8">
        <h4 className="text-primary-600 text-xl">{name}</h4>
        <h5 className="text-gray-600 text-sm">{email}</h5>
      </div>
    </div>
  );
};

export const Sidebar: NextPage<{ user?: User }> = ({ user }) => {
  return (
    <div className="w-full h-full bg-gray-100 shadow-md">
      {user && <LoggedInUserInfo {...user} />}
      <SidebarLink href="/about" title="About" />
      <SidebarLink href="/donate" title="Donate" />
      <SidebarLink href="/campaigns" title="Campaigns" />
      <SidebarLink href="/stories" title="Stories" />
      <div className="p-12 text-center">
        {user ? (
          <button
            className="text-secondary-600 font-bold  hover:text-secondary-700"
            onClick={() => signOut()}>
            Log Out
          </button>
        ) : (
          <button
            className="text-secondary-600 font-bold  hover:text-secondary-700"
            onClick={() => signIn()}>
            Login/Sign Up
          </button>
        )}
      </div>
    </div>
  );
};
