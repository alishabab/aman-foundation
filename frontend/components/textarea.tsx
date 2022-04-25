import { NextPage } from "next";
interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const Textarea: NextPage<Props> = ({ className, style, ...props }) => {
  return (
    <textarea
      style={style}
      className={`block w-full px-2 py-2 border-2 border-gray-300 focus:border-primary-600 focus:outline-none ${className}`}
      {...props}
    />
  );
};
