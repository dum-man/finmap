import { useState } from "react";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import ChangeSuccess from "../ChangeSuccess/ChangeSuccess";

const ChangePasswordWrapper: React.FC = () => {
  const [success, setSuccess] = useState(false);

  if (success) {
    return <ChangeSuccess />;
  }

  return <ChangePasswordForm setSuccess={setSuccess} />;
};

export default ChangePasswordWrapper;
