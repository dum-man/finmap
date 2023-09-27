import { AuthLayout } from "layouts";
import { SetLanguageDropdown } from "components";
import SignUpForm from "../SignUpForm/SignUpForm";

const SignUp: React.FC = () => {
  return (
    <AuthLayout>
      <SetLanguageDropdown />
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUp;
