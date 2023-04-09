import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ContextProvider from "../../context/AppContext";
import { store } from "../store";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Provider store={store}>{children}</Provider>
      </ContextProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
