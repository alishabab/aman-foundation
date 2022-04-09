import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebookSquare,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "./logo";
export const Footer = () => {
  return (
    <footer className="border-t-[0.0125rem] border-gray-300 bg-gray-100 py-8 px-4">
      <div className="flex flex-col items-center">
        <div className="mb-4 text-primary-600">
          <Logo />
        </div>
        <div className="flex items-center space-x-8">
          <FontAwesomeIcon
            icon={faFacebookSquare}
            size="2x"
            className="text-primary-700"
          />
          <FontAwesomeIcon
            icon={faTwitter}
            size="2x"
            className="text-primary-700"
          />
          <FontAwesomeIcon
            icon={faInstagram}
            size="2x"
            className="text-primary-700"
          />
        </div>
        {/* <p className="text-gray-500 text-sm mt-4">
        Built in this life, for the next.
      </p> */}
        <p className="text-gray-500 text-sm mt-8">
          Made with{" "}
          <FontAwesomeIcon icon={faHeart} className="text-primary-700" /> by
          Shabab
        </p>
        <p className="text-xs text-gray-400"></p>
      </div>
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-500">© 2022 Aman Foundation</p>
        <p className="text-xs text-gray-500 mt-2">
          Having issue? Report it{" "}
          <a
            className="hover:text-secondary-600 underline"
            href="https://github.com/alishabab/aman-foundation/issues"
            rel="noopener noreferrer"
            target="_blank">
            here <FontAwesomeIcon icon={faGithub} />
          </a>
        </p>
      </div>
    </footer>
  );
};
