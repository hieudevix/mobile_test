import React, { createContext, useState } from "react";

export const AppContext = createContext();
export default function AppProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  return (
    <AppContext.Provider
      value={{ isLogged, setIsLogged, isOpenAlert, setIsOpenAlert }}
    >
      {children}
    </AppContext.Provider>
  );
}
