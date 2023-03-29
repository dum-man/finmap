import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SidebarModule from "../../../../modules/Sidebar";
import CreateAccount from "../../../../modules/CreateAccount";
import DeleteAccount from "../../../../modules/DeleteAccount";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  return (
    <>
      <SidebarModule
        setCreateAccountOpen={setCreateAccountOpen}
        setDeleteAccountOpen={setDeleteAccountOpen}
      />
      <AnimatePresence>
        {createAccountOpen && <CreateAccount setOpen={setCreateAccountOpen} />}
        {deleteAccountOpen && <DeleteAccount setOpen={setDeleteAccountOpen} />}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
