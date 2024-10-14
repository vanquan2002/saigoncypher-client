import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isBarRight, setIsBarRight] = useState("");
  const [isMassage, setIsMassage] = useState("");
  const [isCartModal, setIsCartModal] = useState(false);
  const [numberColList, setNumberColList] = useState(1);

  const toggleIsBarRight = (text) => setIsBarRight(text);
  const toggleIsMassage = (text) => setIsMassage(text);
  const toggleIsCartModal = () => setIsCartModal((prev) => !prev);
  const toggleNumberColList = (num) => setNumberColList(num);

  return (
    <AppContext.Provider
      value={{
        isBarRight,
        toggleIsBarRight,
        isMassage,
        toggleIsMassage,
        isCartModal,
        toggleIsCartModal,
        numberColList,
        toggleNumberColList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
