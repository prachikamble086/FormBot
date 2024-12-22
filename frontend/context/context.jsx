import { createContext, useContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const data = {
    theme,
    setTheme,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export function useAppContext() {
  return useContext(Context);
}
