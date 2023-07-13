import { AuthLayout } from "layouts";
import { SetLanguageDropdown } from "components";
import SignupForm from "../SignupForm/SignupForm";

const Signup: React.FC = () => {
  return (
    <AuthLayout>
      <SetLanguageDropdown />
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
