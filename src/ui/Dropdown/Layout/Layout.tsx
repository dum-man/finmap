import { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import styles from "./Layout.module.css";

interface LayoutProps {
  isOpen: boolean;
  className: string;
  animation: Record<string, string>;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ isOpen, className, animation, children }) => {
  const contentRef = useRef(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(isOpen);
  }, [isOpen]);

  return (
    <CSSTransition
      classNames={animation}
      nodeRef={contentRef}
      in={animationIn}
      timeout={200}
      mountOnEnter
      unmountOnExit
    >
      <div className={classNames(styles["content"], className)} ref={contentRef}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default Layout;
