import { useEffect } from "react";

export default function useScrollToAnchor() {
  useEffect(() => {
    const scrollToAnchor = () => {
      const hash = window.location.hash;
      if (hash) {
        const decodedHash = decodeURIComponent(hash);
        const element = document.querySelector(decodedHash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("hashchange", scrollToAnchor);
    scrollToAnchor();

    return () => window.removeEventListener("hashchange", scrollToAnchor);
  }, []);
}
