import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { CSSProperties } from "react";

interface IProps {
  icon: IconDefinition;
  title: string;
  description?: string;
  className?: string;
  style?: CSSProperties;
}

export const AchievementCard: NextPage<IProps> = ({
  icon,
  title,
  description,
  className,
  style,
}) => {
  return (
    <span
      className={`inline-flex flex-col items-center ${className}`}
      style={style}>
      <span className="inline-flex items-center justify-center w-32 h-32 rounded-full text-primary-600 bg-gray-900/70 mb-4 border-2 border-primary-600">
        <FontAwesomeIcon icon={icon} size="5x" />
      </span>
      <h2 className="text-gray-600 text-3xl font-extrabold">{title}</h2>
      <h3 className="text-primary-900 font-bold text-2xl">
        {description || ""}
      </h3>
    </span>
  );
};
