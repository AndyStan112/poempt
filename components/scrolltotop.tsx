import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const buttonStyle =
    "bg-green-700 hover:bg-green-800 text-white p-3 rounded-full shadow-md opacity-100";

  return (
    <div className="fixed bottom-0 right-0 px-9 py-8">
      <button
        onClick={scrollToTop}
        className={isVisible ? buttonStyle : "opacity-0"}
      >
        <Icon icon="fluent:arrow-export-up-24-regular" width="24" />
      </button>
    </div>
  );
}

export default ScrollToTop;
