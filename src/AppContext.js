import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isMassage, setIsMassage] = useState("");
  const [isSmallModal, setIsSmallModal] = useState("");
  const [isCartModal, setIsCartModal] = useState(false);
  const [numberColList, setNumberColList] = useState(1);

  const toggleIsMassage = (text) => setIsMassage(text);
  const toggleIsCartModal = (bol) => setIsCartModal(bol);
  const toggleIsSmallModal = (text) => setIsSmallModal(text);
  const toggleNumberColList = (num) => setNumberColList(num);

  useEffect(() => {
    if (isSmallModal) {
      let timeoutId;
      timeoutId = setTimeout(
        () => {
          toggleIsSmallModal("");
        },
        window.innerWidth < 768 ? 2000 : 4000
      );
      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }
  }, [isSmallModal]);

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
