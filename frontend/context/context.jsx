import { createContext, useContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [homePageData, setHomePageData] = useState(null);

  const data = {
    theme,
    setTheme,
    user,
    setUser,
    homePageData,
    setHomePageData,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export function useAppContext() {
  return useContext(Context);
}
