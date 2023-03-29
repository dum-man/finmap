import AuthLayout from "../../../../layouts/AuthLayout/AuthLayout";
import SetLanguageDropdown from "../../../../components/SetLanguageDropdown/SetLanguageDropdown";
import LoginForm from "../LoginForm/LoginForm";

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <SetLanguageDropdown />
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
