import { useState, useEffect, CSSProperties } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { hideStr } from "utils/hideStr";

interface Props {
  className?: string;
  style?: CSSProperties;
}
export const PageNav = ({ className, style }: Props) => {
  const router = useRouter();
  const [pathnames, setPathnames] = useState<string[]>([]);

  useEffect(() => {
    const pathnames = router.asPath.split("/");
    const filteredPathnames = pathnames.filter((pathname) => pathname !== "");
    setPathnames(filteredPathnames);
  }, [router.asPath]);

  if (pathnames.length < 1) return null;

  return (
    <div
      className={`text-secondary-600 flex items-center ${className}`}
      style={style}>
      <FontAwesomeIcon icon={faHome} />
      {pathnames.map((pathname) => (
        <div key={pathname} className="flex items-center">
          <FontAwesomeIcon icon={faAngleRight} className="text-sm ml-2" />
          <span className="text-sm ml-2 font-bold">{hideStr(pathname)}</span>
        </div>
      ))}
    </div>
  );
};
