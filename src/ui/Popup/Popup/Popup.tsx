import useMount from "hooks/useMount";
import Portal from "ui/Portal/Portal";
import Layout from "../Layout/Layout";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const { isMounted } = useMount(isOpen);

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <Layout isOpen={isOpen} onClose={onClose}>
        {children}
      </Layout>
    </Portal>
  );
};

export default Popup;
