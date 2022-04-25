import { NextPage } from "next";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input: NextPage<Props> = ({ className, style, ...props }) => {
  return (
    <input
      style={style}
      className={`block w-full px-2 py-2 border-2 border-gray-300 focus:border-primary-600 focus:outline-none ${className}`}
      {...props}
    />
  );
};
