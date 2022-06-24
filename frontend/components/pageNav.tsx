import { useState, useEffect, CSSProperties } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { hideStr } from "utils/hideStr";
import Link from "next/link";

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
      className={`text-gray-600 flex items-center ${className}`}
      style={style}>
      <Link href="/" passHref>
        <a className="hover:text-secondary-600">
          <FontAwesomeIcon icon={faHome} />
        </a>
      </Link>
      {pathnames.map((pathname, index) => (
        <Link
          key={pathname}
          passHref
          href={`/${pathnames.slice(0, index + 1).join("/")}`}>
          <a className="hover:text-secondary-600">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faAngleRight} className="text-sm ml-2" />
              <span className="text-sm ml-2 font-bold">
                {hideStr(pathname)}
              </span>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};
