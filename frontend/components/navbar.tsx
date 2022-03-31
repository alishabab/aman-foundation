import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="w-100 h-16 flex items-center px-4 fixed top-0 right-0 left-0 bg-gray-100 shadow-md">
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
    </nav>
  );
};
