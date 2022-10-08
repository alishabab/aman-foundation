import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SocialMediaType } from "types";
import { SocialIcons } from "utils/socialIcons";
import { faShare, faCopy } from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";
import { CSSProperties, useState } from "react";
import { Button } from "./button";
import { useAlert } from "context/AlertContext";
import Link from "next/link";

interface Props {
  className?: string;
  style?: CSSProperties;
}

export const ShareBar: NextPage<Props> = ({ className, style }) => {
  const [isShown, setIsShown] = useState(true);
  const { setAlert } = useAlert();
  const getUrl = () => {
    const url = window.location.href;
    return url;
  };

  const getText = () =>
    `Support this cause by Aman Foundation. Visit ${getUrl()}`;

  const onClick = (type: SocialMediaType) => {
    switch (type) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${getUrl()}`,
          "_blank"
        );
        return;
      case "whatsapp":
        window.open(`whatsapp://send?text=${getText()}`, "_blank");
        return;
      case "twitter":
        window.open(
          `http://twitter.com/intent/tweet/?url=${getUrl()}`,
          "_blank"
        );
        return;
      default:
        onCopy();
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(getText());
    setAlert({
      type: "success",
      message: "Text Copied.",
    });
  };

  return (
    <div
      className={`relative h-16 bg-white border-t border-gray-100 flex items-center justify-between py-2 px-4 ${
        isShown ? "block" : "hidden"
      }  ${className}`}
      style={style}>
      {/* Commented hide button */}
      {/* <button
        className="text-primary-600 flex items-center justify-center absolute right-1 -top-8 bg-white w-6 h-6 p-4"
        onClick={() => {
          setIsShown((isShown) => !isShown);
        }}>
        <FontAwesomeIcon icon={faTimes} className="text-2xl" />
      </button> */}
      <div className="flex items-center space-x-6">
        <div className="flex flex-col justify-center items-center text-primary-600">
          <FontAwesomeIcon icon={faShare} className="text-lg" />
          <span className="text-sm font-bold">SHARE</span>
        </div>
        <div className="flex items-center space-x-3 text-secondary-600">
          <button onClick={() => onClick("whatsapp")}>
            <FontAwesomeIcon icon={SocialIcons.whatsapp} size="2x" />
          </button>
          <button onClick={() => onClick("facebook")}>
            <FontAwesomeIcon icon={SocialIcons.facebook} size="2x" />
          </button>
          {/* <button>
            <FontAwesomeIcon icon={SocialIcons.instagram} size="2x" />
          </button> */}
          <button onClick={() => onClick("twitter")}>
            <FontAwesomeIcon icon={SocialIcons.twitter} size="2x" />
          </button>
          <button onClick={() => onClick("other")}>
            <FontAwesomeIcon icon={faCopy} size="2x" />
          </button>
        </div>
      </div>
      <Link passHref href="/donate">
        <a>
          <Button rounded className="w-auto">
            Support
          </Button>
        </a>
      </Link>
    </div>
  );
};
