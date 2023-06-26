import { useState } from "react";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";
import AddButton from "../AddButton/AddButton";

const Container: React.FC = () => {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <>
      {formVisible ? (
        <CreateAccountForm onClose={() => setFormVisible(false)} />
      ) : (
        <AddButton onFormOpen={() => setFormVisible(true)} />
      )}
    </>
  );
};

export default Container;
