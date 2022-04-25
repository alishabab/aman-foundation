import { NextPage } from "next";
import { Spinner } from "./spinner";
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean;
  secondary?: boolean;
  loading?: boolean;
}

export const Button: NextPage<IProps> = ({
  children,
  className,
  style,
  rounded = false,
  secondary = false,
  loading = false,
  ...props
}) => {
  return (
    <button
      className={`w-full ${
        secondary
          ? "bg-secondary-600 hover:bg-secondary-700"
          : "bg-primary-600 hover:bg-primary-700"
      }  text-lg font-bold text-white px-4 py-2 ${
        rounded ? "rounded-md" : ""
      } ${
        loading ? "opacity-75 cursor-not-allowed" : ""
      } disabled:opacity-75 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      style={style}
      {...props}>
      {loading ? <Spinner /> : children}
    </button>
  );
};
