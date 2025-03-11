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

  if (!authType) return null;

  return (
    <div
      className="fixed z-50 inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <button
        className="absolute top-2 md:top-4 right-3 md:right-6 text-white hover:opacity-50"
        onClick={closeModal}
      >
        ✖
      </button>
      <div
        className="relative bg-white p-6 pb-10 sm:px-6 rounded-lg shadow-lg w-full max-w-[957px] mx-4 max-h-[86vh] md:max-h-[93vh] overflow-y-auto hide-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {authType === "signup" ? <SignUp /> : <Login />}
      </div>
    </div>
  );
}
