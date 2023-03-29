import SetLanguageDropdown from "../../../../components/SetLanguageDropdown/SetLanguageDropdown";
import AuthLayout from "../../../../layouts/AuthLayout/AuthLayout";
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
