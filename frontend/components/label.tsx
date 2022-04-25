import { NextPage } from "next";
interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}
export const Label: NextPage<Props> = ({
  className,
  style,
  children,
  ...props
}) => {
  return (
    <label
      style={style}
      className={`text-secondary-600 font-bold text-lg ${className}`}
      {...props}>
      {children}
    </label>
  );
};
