import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isMassage, setIsMassage] = useState("");
  const [isSmallModal, setIsSmallModal] = useState("");
  const [isCartModal, setIsCartModal] = useState(false);
  const [numberColList, setNumberColList] = useState(1);
  const [numberTabNumber, setNumberTabNumber] = useState(1);
  const [isReviewModal, setIsReviewModal] = useState(false);
  const [isUpAvatarModal, setIsUpAvatarModal] = useState(false);
  const [isSizeGuideModal, setIsSizeGuideModal] = useState(false);

  const toggleIsMassage = (text) => setIsMassage(text);
  const toggleIsSmallModal = (text) => setIsSmallModal(text);
  const toggleIsCartModal = (bol) => setIsCartModal(bol);
  const toggleNumberColList = (num) => setNumberColList(num);
  const toggleNumberTabNumber = (num) => setNumberTabNumber(num);
  const toggleIsReviewModal = (bol) => setIsReviewModal(bol);
  const toggleIsUpAvatarModal = (bol) => setIsUpAvatarModal(bol);
  const toggleIsSizeGuideModal = (bol) => setIsSizeGuideModal(bol);

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
        numberTabNumber,
        toggleNumberTabNumber,
        isReviewModal,
        toggleIsReviewModal,
        isUpAvatarModal,
        toggleIsUpAvatarModal,
        isSizeGuideModal,
        toggleIsSizeGuideModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
