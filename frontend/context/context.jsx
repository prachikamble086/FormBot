import { createContext, useContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [folder, setFolder] = useState(null); // Keep only one folder-related state
  const [forms, setForms] = useState(null);

  const data = {
    theme,
    setTheme,
    user,
    setUser,
    folder,
    setFolder,
    forms,
    setForms,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export function useAppContext() {
  return useContext(Context);
}
