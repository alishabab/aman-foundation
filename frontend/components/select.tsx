import { CSSProperties, ChangeEvent } from "react";

interface Props extends React.HTMLAttributes<HTMLSelectElement> {
  options: Array<{ label: string; value: string }>;
  className?: string;
  style?: CSSProperties;
  value: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}
export const Select = ({
  options,
  className,
  style,
  value,
  onChange,
  ...props
}: Props) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full p-2 border-2 border-gray-300 focus:border-primary-600 focus:outline-none ${className}`}
      style={style}
      {...props}>
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
