import React, { createContext, useState } from "react";

export const AppContext = createContext();
export default function AppProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <AppContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AppContext.Provider>
  );
}
