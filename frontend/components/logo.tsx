import { NextPage } from "next";
import Image from "next/image";
import { CSSProperties } from "react";
interface IProps {
  className?: string;
  style?: CSSProperties;
}
export const Logo: NextPage<IProps> = ({ className, style }) => {
  return (
    <div className={`flex items-center ${className}`} style={style}>
      <Image
        className="border border-indigo-600"
        src="/assets/images/hands.svg"
        width={64}
        height={64}
        alt="logo"
      />
      <h4 className="text-inherit text-xl font-bold">Aman Foundation</h4>
    </div>
  );
};
