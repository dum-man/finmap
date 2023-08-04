import { useCallback, useRef } from "react";
import Portal from "ui/Portal/Portal";
import useMount from "hooks/useMount";
import useClickOutside from "hooks/useClickOutside";
import Layout from "../Layout/Layout";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  className: string;
  animation: Record<string, string>;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  className,
  animation,
  children,
}) => {
  const { isMounted } = useMount(isOpen);

  const ref = useRef(null);

  const handleClose = useCallback(() => onClose(), []);

  useClickOutside(ref, handleClose);

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <Layout isOpen={isOpen} className={className} animation={animation}>
        <div ref={ref}>{children}</div>
      </Layout>
    </Portal>
  );
};

export default Dropdown;
