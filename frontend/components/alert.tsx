import { useAlert } from "context/AlertContext";
import { useEffect } from "react";
import { TAlert } from "types";

export const Alert = () => {
  const { type, message, setAlert } = useAlert();

  useEffect(() => {
    setTimeout(() => {
      setAlert({ type: "none", message: "" });
    }, 3000);
  }, [type, setAlert]);

  const Success = () => (
    <div className={`flex p-4 bg-primary-100 rounded-lg`} role="alert">
      <svg
        className={`flex-shrink-0 w-5 h-5 text-primary-700`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"></path>
      </svg>
      <div className={`ml-3 text-sm font-medium text-primary-700`}>
        {message}
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 bg-primary-100 text-primary-500 rounded-lg focus:ring-2 focus:ring-primary-400 p-1.5 hover:bg-primary-200 inline-flex h-8 w-8`}
        data-dismiss-target="#alert-1"
        aria-label="Close"
        onClick={() => {
          setAlert({
            type: "none",
            message: "",
          });
        }}>
        <span className="sr-only">Close</span>
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
    </div>
  );

  const Danger = () => (
    <div className={`flex p-4 bg-secondary-100 rounded-lg`} role="alert">
      <svg
        className={`flex-shrink-0 w-5 h-5 text-secondary-700`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"></path>
      </svg>
      <div className={`ml-3 text-sm font-medium text-secondary-700`}>
        {message}
      </div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 bg-secondary-100 text-secondary-500 rounded-lg focus:ring-2 focus:ring-secondary-400 p-1.5 hover:bg-secondary-200 inline-flex h-8 w-8`}
        data-dismiss-target="#alert-1"
        aria-label="Close"
        onClick={() => {
          setAlert({
            type: "none",
            message: "",
          });
        }}>
        <span className="sr-only">Close</span>
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
    </div>
  );

  const Info = () => (
    <div className={`flex p-4 bg-blue-100 rounded-lg`} role="alert">
      <svg
        className={`flex-shrink-0 w-5 h-5 text-blue-700`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"></path>
      </svg>
      <div className={`ml-3 text-sm font-medium text-blue-700`}>{message}</div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 bg-blue-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8`}
        data-dismiss-target="#alert-1"
        aria-label="Close"
        onClick={() => {
          setAlert({
            type: "none",
            message: "",
          });
        }}>
        <span className="sr-only">Close</span>
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
    </div>
  );
  const getAlert = (type: TAlert) => {
    switch (type) {
      case "danger":
        return <Danger />;
      case "success":
        return <Success />;
      case "info":
        return <Info />;
      default:
        return <Info />;
    }
  };

  return getAlert(type);
};
