import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CreateAccountForm from "../CreateAccountForm/CreateAccountForm";
import AddButton from "../AddButton/AddButton";

const Container: React.FC = () => {
  const [formVisible, setFormVisible] = useState(false);

  return (
    <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
      {formVisible ? (
        <CreateAccountForm onClose={() => setFormVisible(false)} />
      ) : (
        <AddButton onFormOpen={() => setFormVisible(true)} />
      )}
    </AnimatePresence>
  );
};

export default Container;
