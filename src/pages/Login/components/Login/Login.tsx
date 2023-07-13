import { AuthLayout } from "layouts";
import { SetLanguageDropdown } from "components";
import LoginForm from "../LoginForm/LoginForm";
import ResetPassword from "modules/ResetPassword";

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <SetLanguageDropdown />
      <LoginForm />
      <ResetPassword />
    </AuthLayout>
  );
};

export default Login;
