import { useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import ResetPassword from "modules/ResetPassword";
import { RootState } from "app/store";

const ResetPasswordContainer: React.FC = () => {
  const resetPasswordOpen = useSelector(
    (state: RootState) => state.app.resetPasswordOpen
  );

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {resetPasswordOpen && <ResetPassword />}
    </AnimatePresence>
  );
};

export default ResetPasswordContainer;
