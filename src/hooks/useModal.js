import { useEffect } from "react";

const useModal = (isOpen, onClose, modalContent) => {
  const handleClickOutside = (event) => {
    if (isOpen && event.target.closest(modalContent) === null) {
      onClose();
    }
  };
  
  const handleKeyPress = (event) => {
    if (isOpen && event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyPress);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);
};

export default useModal;
