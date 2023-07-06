import { useState } from "react";
import ResetSuccess from "../ResetSuccess/ResetSuccess";
import ResetPasswordForm from "../ResetPasswordForm/ResetPasswordForm";

const ResetPasswordWrapper: React.FC = () => {
  const [success, setSuccess] = useState(false);

  if (success) {
    return <ResetSuccess />;
  }

  return <ResetPasswordForm setSuccess={setSuccess} />;
};

export default ResetPasswordWrapper;
