import { NextPage } from "next";
import { CSSProperties } from "react";

interface IProps {
  className?: string;
  style?: CSSProperties;
}
export const Heading: NextPage<IProps> = ({ children, className, style }) => {
  return (
    <h1
      className={`text-2xl font-extrabold text-secondary-600 ${className}`}
      style={style}>
      {children}
    </h1>
  );
};
