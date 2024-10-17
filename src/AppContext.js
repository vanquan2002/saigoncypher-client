import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isMassage, setIsMassage] = useState("");
  const [isCartModal, setIsCartModal] = useState(false);
  const [isSmallModal, setIsSmallModal] = useState("");
  const [numberColList, setNumberColList] = useState(1);

  const toggleIsMassage = (text) => setIsMassage(text);
  const toggleIsCartModal = () => setIsCartModal((prev) => !prev);
  const toggleIsSmallModal = (text) => setIsSmallModal(text);
  const toggleNumberColList = (num) => setNumberColList(num);

  return (
    <AppContext.Provider
      value={{
        isMassage,
        toggleIsMassage,
        isCartModal,
        toggleIsCartModal,
        numberColList,
        toggleNumberColList,
        isSmallModal,
        toggleIsSmallModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
