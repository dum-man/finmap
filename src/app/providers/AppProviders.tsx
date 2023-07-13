import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

export default AppProviders;
