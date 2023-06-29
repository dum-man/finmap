import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import ResetPassword from "modules/ResetPassword";
import { RootState } from "app/store";
import { toggleResetPasswordOpen } from "app/slices/appSlice";

const ResetPasswordContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { resetPasswordOpen } = useSelector((state: RootState) => state.app);

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {resetPasswordOpen && (
        <ResetPassword onClose={() => dispatch(toggleResetPasswordOpen())} />
      )}
    </AnimatePresence>
  );
};

export default ResetPasswordContainer;
