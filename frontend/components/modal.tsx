import { NextPage } from "next";
import { useEffect, useState } from "react";

interface IProps {
  onClick: () => void;
  isOpen: boolean;
}

export const Modal: NextPage<IProps> = ({ children, isOpen, onClick }) => {
  const [hideScrollbar, setHideScrollbar] = useState(isOpen);
  useEffect(() => {
    // TODO: NEED TO IMPROVE THIS
    // if (hideScrollbar && typeof window !== "undefined") {
    //   document.body.style.overflow = "hidden";
    // } else if (typeof window !== "undefined") {
    //   document.body.style.overflow = "unset";
    // }
  }, [hideScrollbar]);

  return (
    <div
      id="modal"
      aria-hidden="true"
      className="flex items-center justify-center bg-gray-600/75 overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-20">
      <div className="relative p-2 bg-white rounded-lg shadow dark:bg-gray-700 overflow-y-auto w-[90vw] max-h-[85vh] h-auto">
        <button
          onClick={() => {
            setHideScrollbar(false);
            setTimeout(onClick, 0);
          }}
          type="button"
          className="absolute right-2 text-primary-600 bg-transparent hover:bg-gray-200 hover:text-primary-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-toggle="authentication-modal">
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"></path>
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
};
