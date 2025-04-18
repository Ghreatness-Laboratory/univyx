import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Login from "../../pages/auth/Login";
import SignUp from "../../pages/auth/SignUp";

export default function AuthModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const authType = searchParams.get("auth");

  const closeModal = () => {
    searchParams.delete("auth");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (authType) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [authType]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.98,
      transition: { duration: 0.2 },
    },
  };

  const closeButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.4, duration: 0.2 },
    },
    hover: { scale: 1.1, rotate: 90, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {authType && (
        <motion.div
          className="fixed z-50 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleOverlayClick}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            className="absolute top-2 md:top-4 right-3 md:right-6 text-white hover:opacity-50  flex items-center justify-center rounded-full"
            onClick={closeModal}
            variants={closeButtonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <XMarkIcon className="w-8 h-8" />
          </motion.button>

          <motion.div
            className="relative bg-white p-6 pb-10 sm:px-6 rounded-lg shadow-lg w-full max-w-[787px] mx-4 max-h-[82vh] md:max-h-[90vh] overflow-y-auto hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <AnimatePresence mode="wait">
              {authType === "signup" ? (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <SignUp />
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Login />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
