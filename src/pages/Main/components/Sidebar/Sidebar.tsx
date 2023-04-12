import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SidebarModule from "../../../../modules/Sidebar";
import CreateAccount from "../../../../modules/CreateAccount";
import DeleteAccount from "../../../../modules/DeleteAccount";

const Sidebar: React.FC = () => {
  const [createAccountOpen, setCreateAccountOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

  return (
    <>
      <SidebarModule
        setCreateAccountOpen={setCreateAccountOpen}
        setDeleteAccountOpen={setDeleteAccountOpen}
      />
      <AnimatePresence>
        {createAccountOpen && (
          <CreateAccount onClose={() => setCreateAccountOpen(false)} />
        )}
        {deleteAccountOpen && (
          <DeleteAccount onClose={() => setDeleteAccountOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
