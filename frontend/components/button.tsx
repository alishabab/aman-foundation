import { NextPage } from "next";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: NextPage<IProps> = ({
  children,
  className,
  style,
  ...props
}) => {
  return (
    <button
      className={`w-full bg-primary-600 text-lg font-bold text-white px-4 py-2 rounded-md hover:bg-primary-700 ${className}`}
      style={style}
      {...props}>
      {children}
    </button>
  );
};
