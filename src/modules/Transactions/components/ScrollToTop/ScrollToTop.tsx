import { MutableRefObject, createContext, useRef } from "react";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import classNames from "classnames";
import { FaArrowUp } from "react-icons/fa";
import styles from "./ScrollToTop.module.css";

export const Context = createContext<MutableRefObject<HTMLLIElement | null> | null>(null);

interface ScrollToTopProps {
  children: React.ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  const firstTransactionRef = useRef<HTMLLIElement | null>(null);
  const entry = useIntersectionObserver(firstTransactionRef, {});
  const isVisible = !!entry?.isIntersecting;

  const handleScrollToTop = () => {
    firstTransactionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Context.Provider value={firstTransactionRef}>
      {!!entry && (
        <button
          className={classNames("icon-button", styles["icon-button"], {
            [styles["hidden"]]: isVisible,
          })}
          onClick={handleScrollToTop}
        >
          <FaArrowUp />
        </button>
      )}
      {children}
    </Context.Provider>
  );
};

export default ScrollToTop;
