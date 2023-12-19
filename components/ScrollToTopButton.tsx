"use client";
import React, { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa6";

const ScrollToTopButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [showScrollButton, setShowScrollButton] = useState(false);

  const checkScrollTop = () => {
    if (!showScrollButton && window.scrollY > 200) {
      setShowScrollButton(true);
    } else if (showScrollButton && window.scrollY <= 200) {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScrollButton]);

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`${
          showScrollButton
            ? "translate-x-0 rotate-0"
            : "translate-x-40 rotate-180"
        } fixed  bottom-8 right-8 z-[100] block rounded bg-primary bg-opacity-20 p-3 shadow-lg duration-700 hover:bg-primary lg:hidden`}
      >
        <FaAngleUp className="text-primary hover:text-white" />
      </button>
    </>
  );
};

export default ScrollToTopButton;
