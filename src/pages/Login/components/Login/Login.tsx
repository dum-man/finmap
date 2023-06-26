import { AuthLayout } from "../../../../layouts";
import SetLanguageDropdown from "../../../../components/SetLanguageDropdown/SetLanguageDropdown";
import LoginForm from "../LoginForm/LoginForm";
import ResetPasswordContainer from "../ResetPasswordContainer/ResetPasswordContainer";

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <SetLanguageDropdown />
      <LoginForm />
      <ResetPasswordContainer />
    </AuthLayout>
  );
};

export default Login;
