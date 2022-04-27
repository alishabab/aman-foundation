import { createContext, ReactNode, useState, useContext } from "react";
import { TAlert } from "types";

interface IState {
  type: TAlert;
  message: string;
}

interface IContextProps {
  alert: IState;
  setAlert: ({ type, message }: IState) => void;
}

interface AlerProviderProps {
  children: ReactNode;
}

const AlertContext = createContext<IContextProps>({} as IContextProps);

const initialState: IState = {
  type: "none",
  message: "",
};

export const AlertProvider = ({ children }: AlerProviderProps) => {
  const [alert, setAlert] = useState(initialState);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  const { alert, setAlert } = context;
  const { type, message } = alert;
  return { type, message, setAlert };
};
