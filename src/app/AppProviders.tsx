import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import ContextProvider from "../context/AppContext";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <RecoilRoot>{children}</RecoilRoot>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
