import { useRef, useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import classNames from "classnames";
import styles from "./Layout.module.scss";

const overlayAnimation = {
  enter: styles.overlayEnter,
  enterActive: styles.overlayEnterActive,
  exit: styles.overlayExit,
  exitActive: styles.overlayExitActive,
};

const contentAnimation = {
  enter: styles.contentEnter,
  enterActive: styles.contentEnterActive,
  exit: styles.contentExit,
  exitActive: styles.contentExitActive,
};

interface LayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ onClose, isOpen, children }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(isOpen);
  }, [isOpen]);

  return (
    <div
      className={styles.container}
      role="dialog"
      onClick={(evt) => evt.stopPropagation()}
    >
      <CSSTransition
        classNames={overlayAnimation}
        nodeRef={overlayRef}
        in={animationIn}
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        <div
          className={classNames(styles.overlay)}
          ref={overlayRef}
          role="button"
          tabIndex={0}
          onClick={onClose}
        />
      </CSSTransition>
      <CSSTransition
        classNames={contentAnimation}
        nodeRef={contentRef}
        in={animationIn}
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.content} ref={contentRef}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Layout;
