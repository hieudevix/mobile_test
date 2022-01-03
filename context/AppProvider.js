import React, { createContext, useState } from "react";

export const AppContext = createContext();
export default function AppProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <AppContext.Provider
      value={{ isLogged, setIsLogged, isOpenAlert, setIsOpenAlert, username, setUsername }}
    >
      {children}
    </AppContext.Provider>
  );
}
