import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isBarRight, setIsBarRight] = useState("");
  const [isMassage, setIsMassage] = useState("");

  const toggleIsBarRight = (text) => setIsBarRight(text);
  const toggleIsMassage = (text) => setIsMassage(text);

  return (
    <AppContext.Provider
      value={{
        isBarRight,
        toggleIsBarRight,
        isMassage,
        toggleIsMassage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
