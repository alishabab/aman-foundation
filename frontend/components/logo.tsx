import { NextPage } from "next";
import Image from "next/image";
import { CSSProperties } from "react";
import { useGetOrganizationQuery } from "services/queries";
interface IProps {
  className?: string;
  style?: CSSProperties;
}
export const Logo: NextPage<IProps> = ({ className, style }) => {
  const { data: organization } = useGetOrganizationQuery();

  return (
    <div className={`flex items-center ${className}`} style={style}>
      <Image
        className="border border-indigo-600"
        src={
          organization?.logo?.url
            ? organization.logo.url
            : "/assets/images/hands.svg"
        }
        width={56}
        height={56}
        alt="logo"
      />
      <h4 className="text-inherit text-xl font-bold ml-2">
        {organization?.name || "Aman Foundation"}
      </h4>
    </div>
  );
};
